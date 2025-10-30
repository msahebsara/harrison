import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { useForm } from '@inertiajs/react';

interface Plan {
  key: string;
  name: string;
  price_id: string;
  features: Record<string, unknown>;
}

export default function BillingIndex({ plans, is_subscribed, on_trial }: { plans: Plan[]; is_subscribed: boolean; on_trial: boolean }) {
  const { post, processing } = useForm();

  return (
    <SidebarLayout title="Billing">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map(plan => (
          <Card key={plan.key}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>Plan key: {plan.key}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {Object.entries(plan.features).map(([k, v]) => (
                    <li key={k}>
                      {k}: {String(v)}
                    </li>
                  ))}
                </ul>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    post(route('billing.checkout'), { data: { price_id: plan.price_id } });
                  }}
                >
                  <Button type="submit" disabled={processing || !plan.price_id} className="w-full">
                    {is_subscribed ? 'Change plan' : on_trial ? 'Activate plan' : 'Subscribe'}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <form
          onSubmit={e => {
            e.preventDefault();
            post(route('billing.portal'));
          }}
        >
          <Button variant="outline">Manage billing in portal</Button>
        </form>
      </div>
    </SidebarLayout>
  );
}


