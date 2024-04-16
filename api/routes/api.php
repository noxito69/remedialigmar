<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/verify-two-factor-code', [AuthController::class, 'verifyTwoFactorCode'])->middleware(['activate']);
    Route::post('/login', [AuthController::class, 'login'])->middleware('activate2');
});
Route::get('/activate/{token}', [AuthController::class, 'activate'])->name('activate');


Route::group([
    'middleware' => ['api', 'activate', 'verificado'],
    'prefix' => 'user'
], function ($router) {

    Route::get('me', [AuthController::class, 'me']);
});