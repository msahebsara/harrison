<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Models\Project;
use App\Policies\ProjectPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Project::class, ProjectPolicy::class);
        Inertia::share('app', function () {
            $user = Auth::user();
            $impersonating = session()->has('impersonator_id');

            $permissions = [];
            if ($user && method_exists($user, 'getAllPermissions')) {
                try {
                    $permissions = $user->getAllPermissions()->pluck('name');
                } catch (\Throwable $e) {
                    // Permission package may not be installed yet; ignore
                    $permissions = [];
                }
            }

            return [
                'impersonating' => $impersonating,
                'permissions' => $permissions,
            ];
        });
    }
}
