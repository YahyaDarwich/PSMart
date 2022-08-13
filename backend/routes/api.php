<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\TraddedGameController;
use App\Http\Controllers\UserController;

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

// register
Route::post('register', [UserController::class, 'register']);
// login
Route::post('login', [UserController::class, 'authenticate']);
// get games
Route::group(['prefix' => 'game'], function () {
    Route::get('/', [GameController::class, 'getAll']);
    Route::get('/latest', [GameController::class, 'getLatest']);
    Route::get('/{id}', [GameController::class, 'get']);
});
// get tradded games
Route::group(['prefix' => 'traddedgame'], function () {
    Route::get('/approved', [TraddedGameController::class, 'getApproved']);
    Route::get('/{id}', [TraddedGameController::class, 'get']);
});
// get user
Route::group(['prefix' => 'user'], function () {
    Route::get('/{id}', [UserController::class, 'get']);
});


// secure routes
Route::group(['middleware' => ['jwt.verify']], function () {

    // Users Routes
    Route::group(['prefix' => 'user'], function () {
        Route::get('/{id}', [UserController::class, 'get']);
        Route::post('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'delete']);
    });

    Route::get('users', [UserController::class, 'getAllUsers']);
    Route::get('admins', [UserController::class, 'getAllAdmins']);
    // Get the authenticated user data need authorization token
    Route::get('logeduser', [UserController::class, 'getAuthenticatedUser']);

    // Genre Routes
    Route::group(['prefix' => 'genre'], function () {
        Route::get('/', [GenreController::class, 'getAll']);
        Route::get('/{id}', [GenreController::class, 'get']);
        Route::post('/', [GenreController::class, 'create']);
        Route::put('/{id}', [GenreController::class, 'update']);
        Route::delete('/{id}', [GenreController::class, 'delete']);
    });

    // Platform Routes
    Route::group(['prefix' => 'platform'], function () {
        Route::get('/', [PlatformController::class, 'getAll']);
        Route::get('/{id}', [PlatformController::class, 'get']);
        Route::post('/', [PlatformController::class, 'create']);
        Route::put('/{id}', [PlatformController::class, 'update']);
        Route::delete('/{id}', [PlatformController::class, 'delete']);
    });

    // Game Routes
    Route::group(['prefix' => 'game'], function () {
        Route::post('/', [GameController::class, 'create']);
        Route::post('/{id}', [GameController::class, 'update']);
        Route::delete('/{id}', [GameController::class, 'delete']);
    });

    // Tradded game Routes
    Route::group(['prefix' => 'traddedgame'], function () {
        Route::get('/', [TraddedGameController::class, 'getAll']);
        Route::get('/user/{id}', [TraddedGameController::class, 'getByUser']);
        Route::get('/status/{id}', [TraddedGameController::class, 'getByStatus']);
        Route::post('/', [TraddedGameController::class, 'create']);
        Route::post('/{id}', [TraddedGameController::class, 'update']);
        Route::delete('/{id}', [TraddedGameController::class, 'delete']);
    });
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
