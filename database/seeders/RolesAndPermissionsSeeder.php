<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'users.view', 'users.manage',
            'teams.view', 'teams.manage',
            'billing.view', 'billing.manage',
        ];

        foreach ($permissions as $name) {
            Permission::firstOrCreate(['name' => $name]);
        }

        $owner = Role::firstOrCreate(['name' => 'owner']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $member = Role::firstOrCreate(['name' => 'member']);

        $owner->syncPermissions($permissions);
        $admin->syncPermissions(['users.view','teams.view','teams.manage','billing.view']);
        $member->syncPermissions(['teams.view','billing.view']);
    }
}


