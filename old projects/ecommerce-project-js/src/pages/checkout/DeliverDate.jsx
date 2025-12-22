import dayjs from "dayjs";

export function DeliveryDate({ cartItem, deliveryOptions }) {
  const selectedDeliverOption = deliveryOptions
    .find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId;
    });

  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDeliverOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  );
}