<?php

namespace App\Http\Controllers;

use App\Models\FileAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'file' => ['required', 'file', 'max:10240'],
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        $attachment = FileAttachment::create([
            'user_id' => $request->user()->id,
            'disk' => 'public',
            'path' => $path,
            'size' => $request->file('file')->getSize(),
            'original_name' => $request->file('file')->getClientOriginalName(),
            'mime' => $request->file('file')->getClientMimeType(),
        ]);

        return response()->json([
            'id' => $attachment->id,
            'url' => Storage::disk('public')->url($path),
        ]);
    }
}
