<?php

namespace App\Http\Controllers;

use App\Models\movie;
use Illuminate\Http\Request;
use App\Http\Resources\MovieCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MovieResource;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // return new MovieCollection(Movie::all());
       return response()->json([
           new MovieCollection(Movie::all()),
           'Response Status'=> Response::HTTP_OK
       ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->only([
                'movie_id', 'movie_rating', 'user_id'
            ]
        ),
            [
                'movie_id' =>'required|integer|between:1,1000000',
                'movie_rating' =>'required|integer|between:1,5',
                'user_id' =>'required|integer|between:1,1000000'
            ]
            );
            
            if($validator->fails()){
                return
 response()->json(
                    $validator->errors(),
                    Response::HTTP_UNPROCESSABLE_ENTITY
                );
            }
            $movie = Movie::create(
                $request->only(
                    'movie_id', 'movie_rating', 'user_id'
                )
                );
                return response()->json([
                    new MovieResource($movie),
                    'Response Satus' =>Response::HTTP_OK
                ]);
                
                   
                   
                
                }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(movie $movie)
    {
        return response()->json([
            new MovieResource($movie),
            'Response Status'=>Response::HTTP_OK
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, movie $movie)
    {
        $movie->update($request->only([
            'movie_id','movie_rating','user_id'
        ]));
        return response()->json([
            new MovieResource($movie),
            'Response Status'=>Response::HTTP_OK
        ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(movie $movie)
    {
        $movie->delete();
        return response()->json([
            'Response Status'=>Response::HTTP_NO_CONTENT
        ]);
    }

    public function getRatingByMovieId($movie_id){
    
        return response()->json([
            'Ratings'=>new MovieCollection( Movie::where('movie_id','LIKE',$movie_id)->get()),
            'Response Status'=>Response::HTTP_OK
        ]);

    }

    public function getRatingByUserId($user_id){
    
        return response()->json([
            'Ratings'=>new MovieCollection( Movie::where('user_id','LIKE',$user_id)->get()),
            'Response Status'=>Response::HTTP_OK
        ]);

    }

    public function getRatingsByUserIdAndMovieId( $movie_id, $user_id){
    
        return response()->json([//DA MIGLIORARE
            'Ratings'=>new MovieCollection( Movie::where('movie_id','LIKE',$movie_id)->where('user_id','LIKE',$user_id)->get()),
            'Response Status'=>Response::HTTP_OK
        ]);

    }       


    public function deleteRatingsByUserIdAndMovieId( $movie_id, $user_id)
    {

        $movie = Movie::where('user_id','LIKE',$user_id)->where('movie_id','LIKE',$movie_id)->delete();  
        
        return response()->json([            
            'message'=>'Rating deleted.',
            'Response Status'=>Response::HTTP_NO_CONTENT
        ]);        
    }

    
}
