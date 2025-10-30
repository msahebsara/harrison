<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImpersonationController extends Controller
{
    public function start(Request $request, User $user): RedirectResponse
    {
        $current = $request->user();

        abort_unless($current && $current->id !== $user->id, 403);

        // Allow if current user owns the same team as target or is team admin
        $team = $current->currentTeam;
        abort_unless($team !== null, 403);

        $allowed = $current->ownsTeam($team) || $current->hasTeamRole($team, 'admin');
        abort_unless($allowed, 403);

        // Persist impersonator and switch to target
        session([
            'impersonator_id' => $current->id,
            'impersonated_id' => $user->id,
        ]);

        Auth::login($user);

        return redirect()->route('dashboard')->with('banner', 'Now impersonating '.$user->name);
    }

    public function stop(Request $request): RedirectResponse
    {
        $impersonatorId = (int) $request->session()->pull('impersonator_id', 0);
        $request->session()->forget('impersonated_id');

        abort_unless($impersonatorId > 0, 403);

        $impersonator = User::findOrFail($impersonatorId);
        Auth::login($impersonator);

        return redirect()->route('dashboard')->with('banner', 'Stopped impersonation');
    }
}


