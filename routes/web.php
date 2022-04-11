<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/config', [App\Http\Controllers\HomeController::class, 'config'])->name('config');


Route::post('/getAllCitations', 'App\Http\Controllers\Business\CitationController@getAllCitations')->name('getAllCitations');
Route::post('/getCitationDetails', 'App\Http\Controllers\Business\CitationController@getCitationDetails')->name('getCitationDetails');
Route::post('/getScheduleByRangeDates', 'App\Http\Controllers\Business\CitationController@getScheduleByRangeDates')->name('getScheduleByRangeDates');
Route::post('/searchPeopleByName', 'App\Http\Controllers\Business\CitationController@searchPeopleByName')->name('searchPeopleByName');
Route::post('/getServicesAvailables', 'App\Http\Controllers\Business\CitationController@getServicesAvailables')->name('getServicesAvailables');
Route::post('/getServicesByCitationId', 'App\Http\Controllers\Business\CitationController@getServicesByCitationId')->name('getServicesByCitationId');
Route::post('/cancelCitation', 'App\Http\Controllers\Business\CitationController@cancelCitation')->name('cancelCitation');
Route::post('/saveCitation', 'App\Http\Controllers\Business\CitationController@saveCitation')->name('saveCitation');

Route::post('/getAllRole', 'App\Http\Controllers\Auth\PersonController@getAllRole')->name('getAllRole');
Route::post('/searchAddressByContent', 'App\Http\Controllers\Auth\PersonController@searchAddressByContent')->name('searchAddressByContent');

Route::post('/getAllServices', 'App\Http\Controllers\Business\ServiceController@getAllServices')->name('getAllServices');
Route::post('/saveNewService', 'App\Http\Controllers\Business\ServiceController@saveNewService')->name('saveNewService');
Route::post('/deleteService', 'App\Http\Controllers\Business\ServiceController@deleteService')->name('deleteService');
Route::post('/editService', 'App\Http\Controllers\Business\ServiceController@editService')->name('editService');
Route::post('/payService', 'App\Http\Controllers\Business\ServiceController@payService')->name('payService');

//cambiar controller
Route::post('/saveNewBoxTransaction', 'App\Http\Controllers\Business\ServiceController@saveNewBoxTransaction')->name('saveNewBoxTransaction');
Route::post('/getAllBox', 'App\Http\Controllers\Business\ServiceController@getAllBox')->name('getAllBox');
Route::post('/getCountersOfBox', 'App\Http\Controllers\Business\ServiceController@getCountersOfBox')->name('getCountersOfBox');

Route::post('/getParameterByName', 'App\Http\Controllers\HomeController@getParameterByName')->name('getParameterByName');

Route::post('/getAllParameter', 'App\Http\Controllers\HomeController@getAllParameter')->name('getAllParameter');
Route::post('/saveNewParameter', 'App\Http\Controllers\HomeController@saveNewParameter')->name('saveNewParameter');
Route::post('/deleteParameter', 'App\Http\Controllers\HomeController@deleteParameter')->name('deleteParameter');