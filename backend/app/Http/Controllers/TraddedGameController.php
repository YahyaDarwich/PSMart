<?php

namespace App\Http\Controllers;

use App\Models\TradedGame;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TraddedGameController extends Controller
{
    // getAll tradded games
    public function getAll()
    {
        $games = TradedGame::all();
        $count = TradedGame::count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Tradded games not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($games)) {
            $response = [
                'status' => 200,
                'message' => "Get all tradded games done!",
                'data' => $games,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get All Tradded Games by status
    public function getByStatus($status)
    {
        $games = TradedGame::where('status', $status)->get();
        $count = $games->count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Games $status not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($games)) {
            $response = [
                'status' => 200,
                'message' => "Get all $status games done!",
                'data' => $games,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get tradded game
    public function get($id)
    {
        $game = TradedGame::find($id);
        if (isset($game)) {
            $response = [
                'status' => 200,
                'message' => "Get tradded game $id done!",
                'data' => $game
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Tradded game $id not exist!",
            'data' => null
        ];
        return response($response, 401);
    }

    // get tradded game by user
    public function getByUser($id)
    {
        $game = TradedGame::where('user_id', $id)->get();
        if (isset($game)) {
            $response = [
                'status' => 200,
                'message' => "Get tradded game for user $id done!",
                'data' => $game
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Tradded game for user $id not exist!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Add new tradded game
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'publisher' => 'required|string',
                // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'description' => 'required|string',
                'trade_to' => 'required|string',
                'status' => 'required|string',
                'price' => 'required|numeric',
                'user_id' => 'required|integer|min:1',
            ]
        );
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        // if User not exist
        if (isset($request->user_id)) {
            $user = User::find($request->user_id);
            if (!isset($user)) {
                $response = [
                    'status' => 401,
                    'message' => "Genre $request->user_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // upload image
        // if ($files = $request->file('image')) {
        //     $destinationPath = 'image/'; // upload path to public folder
        //     $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
        //     $files->move($destinationPath, $profileImage); // to access image from frontend http://localhost:8000/image/20220321210916.jpg
        // }

        $game = TradedGame::create([
            'name' => $request->get('name'),
            'publisher' => $request->get('publisher'),
            'description' => $request->get('description'),
            'trade_to' => $request->get('trade_to'),
            'status' => $request->get('status'),
            'price' => $request->get('price'),
            'user_id' => $request->get('user_id'),
            // 'image' =>  $profileImage
        ]);
        $response = [
            'status' => 200,
            'message' => 'Traded game added successfully!',
            'data' => $game
        ];
        return response($response, 200);
    }

    // Update tradded game
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'publisher' => 'required|string',
                // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'description' => 'required|string',
                'trade_to' => 'required|string',
                'status' => 'required|string',
                'price' => 'required|numeric',
                'user_id' => 'required|integer|min:1',
            ]
        );
        if ($validator->fails()) {
            $response = [
                'status' => 401,
                'message' => $validator->errors()->first(),
                'data' => null
            ];
            return response($response, 401);
        }

        // if User not exist
        if (isset($request->user_id)) {
            $user = User::find($request->user_id);
            if (!isset($user)) {
                $response = [
                    'status' => 401,
                    'message' => "Genre $request->user_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if ($request->file('image')) {
        //     $destinationPath = 'image/'; // upload path to public folder
        //     $profileImage = date('YmdHis') . "." . $request->file('image')->getClientOriginalExtension();
        //     $request->file('image')->move($destinationPath, $profileImage); // to access image from frontend http://localhost:8000/image/20220321210916.jpg
        //     $game->image = $profileImage;
        //     $game->save();
        // }

        $game = TradedGame::find($id);
        if (isset($game)) {
            $game->update($request->all());
            $response = [
                'status' => 200,
                'message' => "Tradded game updated successfully!",
                'data' => $game
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Tradded game $id not exist, update failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete tradded game
    public function delete($id)
    {
        $game = TradedGame::find($id);
        if (isset($game)) {
            $game->delete();
            $all_games = TradedGame::all();
            $response = [
                'status' => 200,
                'message' => "Traded game deleted successfully!",
                'data' => $all_games
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Traded game $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }
}
