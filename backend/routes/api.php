<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\Controller;

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


// Genre Routes
Route::group(['prefix' => 'genre'], function () {
    Route::get('/', [GenreController::class, 'getAll']);
    Route::get('/{id}', [GenreController::class, 'get']);
    Route::post('/', [GenreController::class, 'create']);
    Route::put('/{id}', [GenreController::class, 'update']);
    Route::delete('/{id}', [GenreController::class, 'delete']);
});

// Genre Routes
Route::group(['prefix' => 'platform'], function () {
    Route::get('/', [GenreController::class, 'getAll']);
    Route::get('/{id}', [GenreController::class, 'get']);
    Route::post('/', [GenreController::class, 'create']);
    Route::put('/{id}', [GenreController::class, 'update']);
    Route::delete('/{id}', [GenreController::class, 'delete']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
