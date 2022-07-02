<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    // getAll genres
    public function getAll()
    {
        $genres = Genre::orderby('name', 'Asc')->get();
        $count = Genre::count();
        if ($count === 0) {
            $response = [
                'status' => 401,
                'message' => "Genres not found!",
                'data' => null
            ];
            return response($response, 401);
        }
        if (isset($genres)) {
            $response = [
                'status' => 200,
                'message' => "Get all genres done!",
                'data' => $genres,
                'count' => $count
            ];
            return response($response, 200);
        }
    }

    // get genre
    public function get($id)
    {
        $genre = Genre::find($id);
        if (isset($genre)) {
            $response = [
                'status' => 200,
                'message' => "Get Genre $id done!",
                'data' => $genre
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Genre $id not exist!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Add new genre
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

        // if Genre already exist
        $genre = Genre::where('name', $request->name)->first();
        if (isset($genre)) {
            $response = [
                'status' => 401,
                'message' => "Genre already exist, added failed!",
                'data' => null
            ];
            return response($response, 401);
        }

        $genre = new Genre;
        $genre->name = $request->name;
        $genre->save();
        $genre->games()->attach($request->game_id);
        $response = [
            'status' => 200,
            'message' => 'Genre added successfully!',
            'data' => $genre
        ];
        return response($response, 200);
    }

    // Update Genre
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

        // if game already exist in this genre
        $genre = Genre::find($id);
        if (isset($genre)) {
            $genre = Genre::find($id)->games->contains($request->game_id); // output boolean: true or false
            if ($genre) {
                $response = [
                    'status' => 401,
                    'message' => "This game already exist in this Genre",
                    'data' => null
                ];
                return response($response, 401);
            }
        }

        if (isset($genre)) {
            $genre->update($request->all());
            $genre->games()->attach($request->game_id);
            $response = [
                'status' => 200,
                'message' => "Genre updated successfully!",
                'data' => $genre
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Genre $id not exist, update failed!",
            'data' => null
        ];
        return response($response, 401);
    }

    // Delete genre
    public function delete($id)
    {
        $genre = Genre::find($id);
        if (isset($genre)) {
            $genre->delete();
            $all_genres = Genre::orderby('name', 'Asc')->get();
            $response = [
                'status' => 200,
                'message' => "Genre deleted successfully!",
                'data' => $all_genres
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 401,
            'message' => "Genre $id not exist, delete failed!",
            'data' => null
        ];
        return response($response, 401);
    }
}
