<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/y-space')->namespace('App\Http\Controllers')->group(function () {
    Route::get('/', 'YSpaceController@index')->name('y-space-index');
    Route::post('/store', 'YSpaceController@store')->name('YSpaceController.store');
    Route::get('/get-bank-accounts', 'YSpaceController@getBankAccounts')->name('YSpaceController.getBankAccounts');
    Route::get('/get-bank-accounts-details/{id}', 'YSpaceController@getBankAccountDetails')->name('YSpaceController.getBankAccountDetails');
    Route::post('/update-bank-account', 'YSpaceController@update')->name('YSpaceController.update');
    Route::delete('/delete/{id}', 'YSpaceController@destroy')->name('YSpaceController.destroy');
    Route::post('/bank-account-approve', 'YSpaceController@approve')->name('YSpaceController.approve');
    Route::post('/bank-account-disapprove', 'YSpaceController@disapprove')->name('YSpaceController.disapprove');
})->middleware(['auth', 'verified']);

Route::prefix('/y-space-translator')->namespace('App\Http\Controllers')->group(function () {
    Route::post('/', 'YSpaceController@disapprove')->name('YSpaceController.disapprove');
})->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
