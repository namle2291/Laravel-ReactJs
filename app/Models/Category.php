<?php

namespace App\Models;

use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getAll()
    {
        $data = Category::all();
        return response()->json($data, 200);
    }

    public function store($data)
    {
        $category = Category::create($data);
        return response()->json(['data' => $category, 'status' => 'add success'], 200);
    }

    public function updateRecord($data, $id)
    {
        $category = Category::findOrFail($id);

        $category->update($data);

        return $category;
    }
    public function deleteRecord($id)
    {
      return Category::destroy($id);
    }
}