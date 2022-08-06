<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Genre;
use App\Models\Platform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    // getAll games
    public function getAll()
    {
        $games = Game::all();
        $count = Game::count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Games not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($games)) {
            $response = [
                'status' => 200,
                'message' => "Get all games done!",
                'data' => $games,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get game
    public function get($id)
    {
        $game = Game::find($id);
        if (isset($game)) {
            $game->genres;
            $game->platforms;
            $response = [
                'status' => 200,
                'message' => "Get game $id done!",
                'data' => $game
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Game $id not exist!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Add new game
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'publisher' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'description' => 'required|string',
                // 'features' => 'required|string',
                'price' => 'required|numeric',
                'release_date' => 'required|date',
                'genre_id' => 'required|integer|min:1',
                'platform_id' => 'required|integer|min:1',
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

        // if Genre not exist
        if (isset($request->genre_id)) {
            $genre = Genre::find($request->genre_id);
            if (!isset($genre)) {
                $response = [
                    'status' => 401,
                    'message' => "Genre $request->genre_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if PLatform not exist
        if (isset($request->platform_id)) {
            $platform = Platform::find($request->platform_id);
            if (!isset($platform)) {
                $response = [
                    'status' => 401,
                    'message' => "Platform $request->platform_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // upload image
        if ($files = $request->file('image')) {
            $destinationPath = 'image/'; // upload path to public folder
            $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage); // to access image from frontend http://localhost:8000/image/20220321210916.jpg
        }

        $game = Game::create([
            'name' => $request->get('name'),
            'publisher' => $request->get('publisher'),
            'description' => $request->get('description'),
            // 'features' => $request->get('features'),
            'release_date' => $request->get('release_date'),
            'price' => $request->get('price'),
            'image' =>  $profileImage
        ]);
        $game->genres()->attach($request->genre_id);
        $game->platforms()->attach($request->platform_id);
        $response = [
            'status' => 200,
            'message' => 'Game added successfully!',
            'data' => $game
        ];
        return response($response, 200);
    }

    // Update Game
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'publisher' => 'required|string',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'description' => 'required|string',
                // 'features' => 'required|string',
                'price' => 'required|numeric',
                'release_date' => 'required|date',
                'genre_id' => 'integer|min:1',
                'platform_id' => 'integer|min:1',
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

        // if Genre not exist
        if (isset($request->genre_id)) {
            $genre = Genre::find($request->genre_id);
            if (!isset($genre)) {
                $response = [
                    'status' => 401,
                    'message' => "Genre $request->genre_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if PLatform not exist
        if (isset($request->platform_id)) {
            $platform = Platform::find($request->platform_id);
            if (!isset($platform)) {
                $response = [
                    'status' => 401,
                    'message' => "Platform $request->platform_id not exist",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if genre already exist in this game
        $game = Game::find($id);
        if (isset($game)) {
            $isAvailable = Game::find($id)->genres->contains($request->genre_id); // output boolean: true or false
            if ($isAvailable) {
                $response = [
                    'status' => 401,
                    'message' => "Genre choosed already exist in this Game",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        // if platform already exist in this game
        if (isset($game)) {
            $isAvailable = Game::find($id)->platforms->contains($request->platform_id); // output boolean: true or false
            if ($isAvailable) {
                $response = [
                    'status' => 401,
                    'message' => "Platform choosed already exist in this Game",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        if ($request->file('image')) {
            $destinationPath = 'image/'; // upload path to public folder
            $profileImage = date('YmdHis') . "." . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($destinationPath, $profileImage); // to access image from frontend http://localhost:8000/image/20220321210916.jpg
            $game->image = $profileImage;
            $game->save();
        }

        if (isset($game)) {
            $game->update([
                'name' => $request->get('name'),
                'publisher' => $request->get('publisher'),
                'description' => $request->get('description'),
                // 'features' => $request->get('features'),
                'release_date' => $request->get('release_date'),
                'price' => $request->get('price'),
            ]);
            $game->genres()->attach($request->genre_id);
            $game->platforms()->attach($request->platform_id);
            $response = [
                'status' => 200,
                'message' => "Game updated successfully!",
                'data' => $game
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Game $id not exist, update failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete Game
    public function delete($id)
    {
        $game = Game::find($id);
        if (isset($game)) {
            $game->delete();
            $all_games = Game::all();
            $response = [
                'status' => 200,
                'message' => "Game deleted successfully!",
                'data' => $all_games
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Game $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }
}
