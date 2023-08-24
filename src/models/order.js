export class Order {
    static REF = "orders"
    key;
    order;
    orderStatus;
    restaurantKey;
    clientKey;
    totalPaid;
    createdAt;
    updatedAt;
}

export const ORDER_STATUS = {
    "RECEIVED": "RECEIVED",
    "IN_PROGRESS": "IN_PROGRESS",
    "SENT": "SENT",
    "FINISHED": "FINISHED",
    "CANCELLED": "CANCELLED"
}