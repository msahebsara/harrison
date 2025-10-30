import React from 'react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { useEffect } from 'react';

export default function MarketingPricing({ stripe_public_key, pricing_table_id }: { stripe_public_key?: string; pricing_table_id?: string }) {
  useEffect(() => {
    if (!document.getElementById('stripe-pricing-table')) {
      const script = document.createElement('script');
      script.id = 'stripe-pricing-table';
      script.src = 'https://js.stripe.com/v3/pricing-table.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <MarketingLayout title="Pricing">
      {stripe_public_key && pricing_table_id ? (
        <div className="flex justify-center">
          {/** @ts-ignore */}
          <stripe-pricing-table pricing-table-id={pricing_table_id} publishable-key={stripe_public_key} />
        </div>
      ) : (
        <p className="text-muted-foreground">Pricing will appear here once Stripe keys are configured.</p>
      )}
    </MarketingLayout>
  );
}


