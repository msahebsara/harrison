<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeatureFlag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeatureFlagsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/FeatureFlags', [
            'flags' => FeatureFlag::orderBy('key')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:feature_flags,key'],
        ]);
        FeatureFlag::create(['key' => $data['key'], 'enabled' => false]);
        return back();
    }

    public function toggle(FeatureFlag $flag)
    {
        $flag->update(['enabled' => ! $flag->enabled]);
        return back();
    }
}


