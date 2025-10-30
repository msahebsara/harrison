<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function index(Request $request): Response
    {
        // Redirect to Stripe Billing Portal (managed page)
        return redirect()->route('billing.portal');
    }

    public function checkout(Request $request): RedirectResponse
    {
        // Using Stripe hosted pricing/payment pages; prefer portal for management
        return redirect()->route('billing.portal');
    }

    public function portal(Request $request): RedirectResponse
    {
        $user = $request->user();
        return $user->redirectToBillingPortal(route('billing.index'));
    }
}


