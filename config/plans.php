<?php

return [
    'trial_days' => env('TRIAL_DAYS', 14),

    'plans' => [
        'starter' => [
            'name' => 'Starter',
            'price_id' => env('STRIPE_PRICE_STARTER'),
            'features' => [
                'teams' => true,
                'projects' => 5,
                'api' => true,
            ],
        ],
        'pro' => [
            'name' => 'Pro',
            'price_id' => env('STRIPE_PRICE_PRO'),
            'features' => [
                'teams' => true,
                'projects' => 100,
                'api' => true,
            ],
        ],
    ],
];


