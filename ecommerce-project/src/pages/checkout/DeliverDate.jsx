import dayjs from "dayjs";

export function DeliveryDate({ selectedDeliverOption }) {
  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDeliverOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  );
}