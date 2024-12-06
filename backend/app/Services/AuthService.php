<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService{
    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return ['error' => 'The provided credentials are incorrect.'];
        }
        return ['token' => $user->createToken($data['email'])->plainTextToken];
    }

    public function register(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }
}
