<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    //TODO : middleware and auth guard
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::group(['prefix' => 'admin'], function () {
    Route::post('/approve/{username}', [AdminController::class, 'approveUser']);
    Route::post('/delete/{username}', [AdminController::class, 'deleteUser']);
    Route::get('/users', [AdminController::class, 'indexUsers']);
    Route::get('/unapproved_users', [AdminController::class, 'getUnapprovedUsers']);
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/', [UserController::class, 'index']);
});
