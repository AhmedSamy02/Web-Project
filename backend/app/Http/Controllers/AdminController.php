<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminService;

class AdminController extends Controller
{
    protected $adminService = null;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    public function approveUser(Request $request)
    {
        $username = $request->username;
        $result = $this->adminService->approveUser($username);
        if ($result) {
            return response()->json(['message' => 'User approved successfully']);
        } else {
            return response()->json(['message' => 'Could not approve user'], status: 400);
        }
    }

    public function deleteUser(Request $request)
    {
        $username = $request->username;
        $result = $this->adminService->deleteUser($username);
        if ($result) {
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'Could not delete user'], status: 400);
        }
    }

    public function indexUsers()
    {
        $users = $this->adminService->getAllUsers();
        return response()->json($users);
    }

    public function getUnapprovedUsers()
    {
        $users = $this->adminService->getUnapprovedUsers();
        return response()->json($users);
    }
}
