<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'password',
        'activate',
        'two_factor_secret',
        'codigoVerificado'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'codigoVerificado'
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'activate' => 'boolean',
        'codigoVerificado'=> 'boolean',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function twoFactorOptions()
    {
        return [
            'recovery_codes' => true,
        ];
    }

    public function generateTwoFactorCode()
    {
        $code = '5'.str_pad(rand(0, 999999), 5, '0', STR_PAD_LEFT);
        $code = substr($code, 0, 6);
        $this->two_factor_secret = $code;
        $this->save();
        return $code;
    }
}
