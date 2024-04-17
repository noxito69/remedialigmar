<?php

namespace App\Http\Controllers;

use App\Mail\ValidatorMail;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Mail;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function index($id = null)
    {
        if ($id) {
            $query = User::where('id', $id);
            $user = $query->first();

            return response()->json(['message' => 'Usuario encontrado', 'user' => $user], 200);
        } else {
            $query = User::where('activate', true);
            $users = $query->get();

            return response()->json(['message' => 'Usuarios activos', 'users' => $users], 200);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' =>Hash::make($request->input('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        $signedroute = URL::temporarySignedRoute( 'activate', now()->addMinutes(10), ['token' => $token]);

        Mail::to($request->email)->send(new ValidatorMail($signedroute));
        return response()->json(['msg' => 'Usuario creado con exito', 'body_message' => 'Revisar tu correo electronico para activar la cuenta']);
    }

    public function update(Request $request, $user_id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'string|email|unique:users,email,' . $user_id,
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = User::findOrFail($user_id);
        if ($request->has('name')) {
            $user->name = $request->input('name');
        }
        if ($request->has('email')) {
            $user->email = $request->input('email');
        }
        if ($request->has('role_id')) {
            $user->role_id = $request->input('role_id');
        }
        $user->save();
        $this->LogsMethod($request, $user, ["modificacion" => $request->all(), "usuario" => $user_id]);
        return response()->json(['msg' => 'Usuario editado con éxito', 'data' => $user], 200);
    }
}
