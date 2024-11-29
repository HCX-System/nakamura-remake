<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    protected function username()
    {
        return 'login_id';
    }
    
protected function credentials(Request $request)
{
    
    return [
        $this->username() => $request->input($this->username()),
        'password' => $request->input('login_pw'),
    ];
}

public function login(LoginRequest $request)
{
    $credentials = $this->credentials($request);
    $loginType = $request->input('loginType');

    try {
        // まず login_id の存在を確認
        $user = User::where($this->username(), $credentials[$this->username()])->first();
        if (!$user) {
            // login_idが存在しない場合、エラーコード 411 を返す
            return response([
                'message' => 'Invalid login_id.',
                'code' => 411
            ], 411);
        }

        // 次にパスワードを照合
        if (!Hash::check($credentials['password'], $user->login_pw)) {
            // パスワードが一致しない場合、エラーコード 412 を返す
            return response([
                'message' => 'Invalid password.',
                'code' => 412
            ], 412);
        }

        // ロールの確認
        if ($loginType === 'admin' && $user->role !== 'admin') {
            return response(['message' => 'Access denied: Invalid role for this area.', 'code' => 413], 413);
        } elseif ($loginType === 'user' && $user->role !== 'user') {
            return response(['message' => 'Access denied: Invalid role for this area.', 'code' => 413], 413);
        }

        // login_id と password が正しい場合、トークンを発行して認証成功のレスポンスを返す
        if (Auth::attempt($credentials)) {
            /** @var User $user */
            $user = Auth::user();
            $token = $user->createToken('UserAccessToken')->plainTextToken;

            return response([
                'message' => 'success',
                'token' => $token,
                'user' => $user
            ]);
        }

    } catch (\Exception $e) {
        return response([
            'message' => 'Internal error, please try again later.' // $e->getMessage() で詳細を出す場合もある
        ], 400);
    }

    // 万が一、他の問題が発生した場合の処理
    return response([
        'message' => 'Login failed for unknown reasons.',
    ], 401);
}
    

    public function user()
    {
        return response()->json(Auth::user());
    }
}