<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    //ユーザ名の代わりにログインIDを使用
    protected function username()
    {
        return 'login_id';
    }

    //デフォルトでemailとpasswordを参照するようになっているので、その値にlogin_id とlogin_pwをセット
    protected function credentials(Request $request)
    {
        return [
            'login_id' => $request->input('login_id'),
            'password' => $request->input('login_pw'), 
        ];
    }

    public function login(Request $request)
        {
            $credentials = $this->credentials($request);

            if (Auth::attempt($credentials)) {
                return redirect()->intended($this->redirectPath());
            }

            return back()->withErrors([
                $this->username() => [trans('auth.failed')],
            ]);
        }
}
