import { useState } from 'react';
import type { Order } from '../orders-api';
import Checkout from './Checkout.web';
import OrderReceipt from './OrderReceipt.web';
import type { Props } from './OrderParts.web';

export default function Booking({ ar }: Props) {
  const [saved, setSaved] = useState<Order | null>(null);
  return (
    <section className="booking-page">
      {saved ? (
        <OrderReceipt ar={ar} order={saved} onContinue={() => {}} />
      ) : (
        <Checkout
          ar={ar}
          cart={{}}
          booking
          onSaved={setSaved}
          onBack={() => {
            location.hash = 'collection';
          }}
        />
      )}
    </section>
  );
}
