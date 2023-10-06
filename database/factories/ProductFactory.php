<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Testing\Fakes\Fake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // title varchar(255)
        // price int
        // discount int
        // thumbnail varchar(255)
        // description longtext
        // category_id bigint UN
        return [
            'title'=> fake()->title,
            'price'=> fake()->randomNumber(5, true),
            'discount'=> fake()->numberBetween(10,100),
            'thumbnail'=> "default.png",
            'description'=> fake()->realText(180),
            'category_id'=> Category::all()->random()->id,
        ];
    }
}