<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'thumbnail' => $this->thumbnail,
            'description' => $this->description,
            'price' => number_format($this->price),
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name
            ]
        ];
    }
}