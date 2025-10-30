<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'counts' => [
                'users' => User::count(),
            ],
        ]);
    }

    public function users(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::latest()->paginate(20)->withQueryString(),
        ]);
    }
}


