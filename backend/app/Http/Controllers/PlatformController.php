<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Platform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlatformController extends Controller
{
    // getAll platforms
    public function getAll()
    {
        $platforms = Platform::orderby('name', 'Asc')->get();
        $count = Platform::count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Platforms not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($platforms)) {
            $response = [
                'status' => 200,
                'message' => "Get All Platforms done!",
                'data' => $platforms,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get platform
    public function get($id)
    {
        $platform = Platform::find($id);
        if (isset($platform)) {
            $response = [
                'status' => 200,
                'message' => "Get Platform $id done!",
                'data' => $platform
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Platform $id not exist!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Add new platform
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'game_id' => 'integer|min:1'
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

        // if Game not exist
        if (isset($request->game_id)) {
            $game = Game::find($request->game_id);
            if (!isset($game)) {
                $response = [
                    'status' => 401,
                    'message' => "Game $request->game_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if Platform already exist
        $platform = Platform::where('name', $request->name)->first();
        if (isset($platform)) {
            $response = [
                'status' => 401,
                'message' => "Platform already exist, added failed!",
                'data' => null
            ];
            return response($response, 401);
        }

        $platform = new Platform;
        $platform->name = $request->name;
        $platform->save();
        $platform->games()->attach($request->game_id);
        $response = [
            'status' => 200,
            'message' => 'Platform added successfully!',
            'data' => $platform
        ];
        return response($response, 200);
    }

    // Update Platform
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'game_id' => 'integer|min:1'
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

        // if Game not exist
        if (isset($request->game_id)) {
            $game = Game::find($request->game_id);
            if (!isset($game)) {
                $response = [
                    'status' => 401,
                    'message' => "Game $request->game_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if game already exist in this platform
        $platform = Platform::find($id);
        if (isset($platform)) {
            $platform = Platform::find($id)->games->contains($request->game_id); // output boolean: true or false
            if ($platform) {
                $response = [
                    'status' => 401,
                    'message' => "This game already exist in this Platform",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        if (isset($platform)) {
            $platform->update($request->all());
            $platform->games()->attach($request->game_id);
            $response = [
                'status' => 200,
                'message' => "Platform updated successfully!",
                'data' => $platform
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Platform $id not exist, update failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete platform
    public function delete($id)
    {
        $platform = Platform::find($id);
        if (isset($platform)) {
            $platform->delete();
            $all_platforms = Platform::orderby('name', 'Asc')->get();
            $response = [
                'status' => 200,
                'message' => "Platform deleted successfully!",
                'data' => $all_platforms
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Platform $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }
}
