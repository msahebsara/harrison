<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function view(User $user, Project $project): bool
    {
        return $user->current_team_id === $project->team_id;
    }

    public function update(User $user, Project $project): bool
    {
        return $user->current_team_id === $project->team_id;
    }

    public function delete(User $user, Project $project): bool
    {
        return $user->current_team_id === $project->team_id;
    }
}


