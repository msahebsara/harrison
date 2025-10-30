<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $team = $request->user()->currentTeam;
        $projects = Project::where('team_id', $team->id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $team = $request->user()->currentTeam;
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);
        Project::create($data + ['team_id' => $team->id]);
        return redirect()->route('projects.index')->with('banner', 'Project created');
    }

    public function edit(Project $project): Response
    {
        $this->authorize('view', $project);
        return Inertia::render('Projects/Edit', [ 'project' => $project ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $this->authorize('update', $project);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);
        $project->update($data);
        return redirect()->route('projects.index')->with('banner', 'Project updated');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->authorize('delete', $project);
        $project->delete();
        return redirect()->route('projects.index')->with('banner', 'Project deleted');
    }
}


