<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => 'required',
            'price' => 'required|numeric|min:1',
            'description' => 'required',
            'category_id' => 'required'
        ], [], []);

        if ($validator->fails()) {
            return response()->json($validator->errors()->all(), 400);
        }

        $product = Product::create($data);

        return response()->json(['data' => $product, 'message' => 'Create Success!'], 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::findOrFail($id);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => 'required',
            'price' => 'required|numeric|min:1',
            'description' => 'required',
            'category_id' => 'required'
        ], [], []);

        if ($validator->fails()) {
            return response()->json($validator->errors()->all(), 400);
        }

        $product = Product::find($id);
        $product->update($data);

        return response()->json(['data' => $product, 'message' => 'Update Success!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Product::destroy($id);
    }
}