<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // get All users
    public function getAllUsers()
    {
        $users = User::where('isAdmin', 'false')->get();
        $count = $users->count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Users not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($users)) {
            $response = [
                'status' => 200,
                'message' => "Get all users done!",
                'data' => $users,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get All users
    public function getAllAdmins()
    {
        $admins = User::where('isAdmin', 'true')->get();
        $count = $admins->count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Admins not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($admins)) {
            $response = [
                'status' => 200,
                'message' => "Get all admins done!",
                'data' => $admins,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get user
    public function get($id)
    {
        $user = User::find($id);
        if (isset($user)) {
            $response = [
                'status' => 200,
                'message' => "Get user $id done!",
                'data' => $user
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "User $id not exist!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete user
    public function delete($id)
    {
        $game = User::find($id);
        if (isset($game)) {
            $game->delete();
            $all_games = User::all();
            $response = [
                'status' => 200,
                'message' => "User deleted successfully!",
                'data' => $all_games
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "User $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // login
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {

            if (!$token = JWTAuth::attempt($credentials)) {

                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    // register
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'phone' => 'numeric',
                'isAdmin' => 'required|string'
            ],
            [
                'password.regex' => 'password should contain at least one uppercase, lowercase, numeric & special character(!,@,#,$,%,^,*)'
            ]
        );

        if ($validator->fails()) {
            $response = [
                'status' => 400,
                'message' => $validator->errors()->first(),
            ];
            return response($response, 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'phone' => $request->get('phone'),
            'isAdmin' => $request->get('isAdmin')
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user', 'token'), 201);
    }

    // Update User
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $user->id . ',id',
                'password' => 'string|min:8|confirmed|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
                'phone' => 'numeric',
                'isAdmin' => 'required|string'
            ]
        );

        // a message for every field required
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        if ($request)
            if ($user) {
                $user->update([
                    'name' => $request->get('name'),
                    'email' => $request->get('email'),
                    'password' => Hash::make($request->get('password')),
                    'phone' => $request->get('phone'),
                    'isAdmin' => $request->get('isAdmin')
                ]);
                $response = [
                    'status' => 200,
                    'message' => 'User Updated Successfully!',
                    'data' => $user,
                ];
                return response($response, 200);
            } else {
                $response = [
                    'status' => 404,
                    'message' => 'No user ID Found',
                ];
                return response($response, 404);
            }
    }

    // method which returns the user object based on the authorization token that is passed.
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }
}
