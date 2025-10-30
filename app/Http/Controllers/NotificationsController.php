<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Notifications\DatabaseNotification;

class NotificationsController extends Controller
{
    public function index(Request $request): JsonResource
    {
        $notifications = $request->user()->unreadNotifications()->limit(20)->get();
        return JsonResource::collection($notifications);
    }

    public function markAllRead(Request $request)
    {
        /** @var DatabaseNotification $n */
        $request->user()->unreadNotifications->markAsRead();
        return response()->noContent();
    }
}
