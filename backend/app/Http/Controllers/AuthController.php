<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    //
    protected $authService = null;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'email' => ['required', 'email', 'unique:users,email'],
                'username' => ['required', 'unique:users,username'],
                // 'password' => ['required', 'min:8', 'regex:/^(?=.*[a-zA-Z])(?=.*\d).+$/'],
                'password' => ['required', 'min:8'],
                'first_name' => ['required'],
                'last_name' => ['required'],
                'date_of_birth' => ['required'],
                'gender' => ['required', Rule::in(['F', 'M'])],
                'role' => ['required', Rule::in(['F', 'M'])],
                'city' => ['required'],
                'address' => ['nullable'],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], status: 400);
        }

        $validatedData['status'] = 0;
        $user = $this->authService->register($validatedData);
        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    public function login(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], status: 400);
        }

        $response = $this->authService->login($validatedData);
        if (isset($response['error'])) {
            return response()->json(['error' => $response['error']], status: 401);
        }
        return response()->json(['token' => $response['token']]);

    }

    public function logout(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'User Not Found'], status: 404);
        }
        if (!$request->user()->currentAccessToken()) {
            return response()->json(['message' => 'Unauthorized'], status: 401);
        }
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);

    }


}
