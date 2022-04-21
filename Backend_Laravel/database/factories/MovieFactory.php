<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            
            'movie_id'=>$this->faker->numberBetween(1,200),
            'movie_rating'=>$this->faker->numberBetween(1,5),
            'user_id'=>$this->faker->numberBetween(1,200)
        ];
    }
}
