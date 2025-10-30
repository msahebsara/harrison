<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecureHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        $headers = [
            'X-Frame-Options' => 'DENY',
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'no-referrer-when-downgrade',
            'Permissions-Policy' => "geolocation=(), microphone=(), camera=()",
        ];

        // Relaxed CSP to avoid breaking dev; tighten in production as needed
        $csp = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'";
        $headers['Content-Security-Policy'] = $csp;

        foreach ($headers as $k => $v) {
            $response->headers->set($k, $v, false);
        }

        return $response;
    }
}


