<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LearningManagementController;

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

Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('courses', [LearningManagementController::class, 'getCourses']);
    Route::get('contents',[LearningManagementController::class, 'getContents']);
    Route::get('content/{contents_id}',[LearningManagementController::class, 'getContent']);
    Route::post('writelog',[LearningManagementController::class, 'writelog']);
});