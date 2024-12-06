<?php
namespace App\Services;
use App\Models\User;

class AdminService
{

    // public function approveUser(User $user): bool
    // {

    // }

    public function approveUser(string $username): bool
    {
        $user = User::where('username', $username)->first();
        if (!$user) {
            return false;
        }
        $user->status = 1;
        return $user->save();
    }

    public function deleteUser(string $username): bool
    {
        $user = User::where('username', $username)->first();
        if (!$user) {
            return false;
        }
        $user->delete();
        return true;
    }

    public function getAllUsers(): array
    {
        return User::all()->toArray();
    }

    public function getUnapprovedUsers(): array
    {
        return User::where('status', false)->get()->toArray();
    }

}