<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    function register(SignUpRequest $request)
    {
        $data = $request->validated();

        unset($data['confirm_password']);
        $data['password'] = Hash::make($data['password']);
        $data['phone'] = 0;
        $data['address'] = 'Dong Thap';
        $data['role_id'] = 1;
        $user = User::create($data);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    function login(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ], [], [
            'email' => 'Email',
            'password' => 'Mật khẩu'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 412);
        }

        $user = User::where('email', $data['email'])->first();
        if (!Auth::attempt($data)) {
            return response()->json(['errors' => ['Tài khoản hoặc mật khẩu không đúng']]);
        }
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $request->user()->currentAccessToken()->delete();
        return response('', 204);
    }
}