<?php

namespace App\Http\Controllers;

use App\Mail\TwoFactorCodeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        $user = auth()->user();
        $token = JWTAuth::fromUser($user);
        if (!$user) {
            return response()->json(["msg" => "Usuario no encontrado"], 404);
        }

        $user->codigoVerificado = false;
        
        if ($user->codigoVerificado == false) {
            $this->sendTwoFactorCodeByEmail($user);
            return response()->json(['msg' => 'Redireccionando a la autenticación de dos factores', "token" => $token], 200);
        }
        $this->sendTwoFactorCodeByEmail($user);
        return response()->json(['msg' => 'Inicio de sesión correcto', 'data' => $user, 'token' => $token], 200);
    }

    public function me(Request $request)
    {
        return response()->json(auth()->user());
    }

    public function logout(Request $request)
    {
        $user = JWTAuth::user();
        $user->codigoVerificado = false;
        $user->save();
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }

    public function getIDbyToken($token)
    {
        $payload = JWTAuth::parseToken($token);
        return $payload->getPayload()['sub'];
    }

    public function activate($token)
    {
        $url = 'activate' . $token;
        try {
            JWTAuth::parseToken($token)->authenticate();
        } catch (JWTException $e) {
            return response()->view('ErrorEmail', ['reenviar_email' => $url]);
        }
        $user = User::find($this->getIDbyToken($token));
        if (!$user)
            return response()->view('mails.ErrorEmail', ['reenviar_email' => $url]);
        $user->activate = true;
        $user->save();
        return response()->view('mails.AcceptedEmail');
    }

    protected function sendTwoFactorCodeByEmail($user)
    {
        $code = $user->generateTwoFactorCode();
        $email = $user->email;
        Mail::to($email)->send(new TwoFactorCodeMail($code));
    }

    public function verifyTwoFactorCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'two_factor_code' => 'required|digits:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = auth()->user();
        if ($user->two_factor_secret == $request->two_factor_code) {
            $user->codigoVerificado = true;
            $user->save();
            JWTAuth::parseToken()->invalidate();
            $token = JWTAuth::fromUser($user);

            return response()->json(['message' => 'Código de autenticación válido', 'data' => $user, 'token' => $token], 200);
        }
        return response()->json(['error' => 'Código de autenticación incorrecto'], 401);
    }
}
