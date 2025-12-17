import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { it, describe, vi, beforeEach, expect } from 'vitest';
import { PaymentSummary } from './PaymentSummary';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('Payment summary component', () => {
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    paymentSummary = {
      "totalItems": 3,
      "productCostCents": 5697,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 5697,
      "taxCents": 570,
      "totalCostCents": 5251
    }
    loadCart = vi.fn();
  })

  it('displays the correct details', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-product-cost'))
        .getByText('$56.97')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('0');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$56.97');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$5.70')

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$52.51');
  });

  it('places an order', async () => {
    function Location(){
      const location = useLocation()
      return <div data-testid={'url-path'}>{location.pathname}</div>
    }

    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart} />
      </MemoryRouter>
    );

    let user = userEvent.setup();

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);
    
    expect(axios.post).toHaveBeenCalled('/api/orders');
    expect(loadCart).toHaveBeenCalled();

  });
})