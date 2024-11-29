<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserListController extends Controller {
  public function index(){
    //ユーザーのデータを取得
    $users = User::all();

     // ビューにデータを渡す
     return view('userlist',['users' => $users]);
  }
}
