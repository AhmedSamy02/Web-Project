<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function getAll(): array
    {
        return User::all()->toArray();
    }
}