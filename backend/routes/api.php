<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login')->middleware('throttle:10,1');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::get('/users', [UserController::class, 'index']);