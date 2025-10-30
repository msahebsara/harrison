<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $plans = collect(config('plans.plans'))
        ->map(fn ($p, $key) => [
            'key' => $key,
            'name' => $p['name'],
            'features' => $p['features'],
        ])->values();
    return Inertia::render('Marketing/Home', ['plans' => $plans]);
})->name('marketing.home');
Route::get('/features', fn () => Inertia::render('Marketing/Features'))->name('marketing.features');
Route::get('/pricing', function () {
    return Inertia::render('Marketing/Pricing', [
        'stripe_public_key' => env('STRIPE_KEY'),
        'pricing_table_id' => env('STRIPE_PRICING_TABLE_ID'),
    ]);
})->name('marketing.pricing');
Route::get('/docs', fn () => Inertia::render('Docs/Index'))->name('docs.index');

// Legal
Route::get('/terms', fn () => Inertia::render('TermsOfService'))->name('terms.show');
Route::get('/privacy', fn () => Inertia::render('PrivacyPolicy'))->name('policy.show');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Impersonation
    Route::post('/impersonate/{user}', [\App\Http\Controllers\ImpersonationController::class, 'start'])
        ->name('impersonate.start');
    Route::post('/impersonate/stop', [\App\Http\Controllers\ImpersonationController::class, 'stop'])
        ->name('impersonate.stop');

    // Billing
    Route::get('/billing', [\App\Http\Controllers\BillingController::class, 'index'])->name('billing.index');
    Route::post('/billing/checkout', [\App\Http\Controllers\BillingController::class, 'checkout'])->name('billing.checkout');
    Route::post('/billing/portal', [\App\Http\Controllers\BillingController::class, 'portal'])->name('billing.portal');

    // Projects
    Route::resource('projects', \App\Http\Controllers\ProjectController::class);

    // Admin area (role gated)
    Route::middleware(['role:owner|admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [\App\Http\Controllers\AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/users', [\App\Http\Controllers\AdminController::class, 'users'])->name('users');
        Route::get('/flags', [\App\Http\Controllers\Admin\FeatureFlagsController::class, 'index'])->name('flags.index');
        Route::post('/flags', [\App\Http\Controllers\Admin\FeatureFlagsController::class, 'store'])->name('flags.store');
        Route::post('/flags/{flag}/toggle', [\App\Http\Controllers\Admin\FeatureFlagsController::class, 'toggle'])->name('flags.toggle');
    });

    // Notifications
    Route::get('/notifications', [\App\Http\Controllers\NotificationsController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationsController::class, 'markAllRead'])->name('notifications.readAll');

    // Files
    Route::post('/files', [\App\Http\Controllers\FileController::class, 'store'])->name('files.store');
});

// Stripe webhooks
Route::post('/stripe/webhook', [\Laravel\Cashier\Http\Controllers\WebhookController::class, 'handleWebhook']);
