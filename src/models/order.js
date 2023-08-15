export class Order {
    static REF = "orders"
    key;
    orderStatus;
    restaurantKey;
    clientKey;
    totalPaid;
    createdAt;
    updatedAt;

    constructor(
        key,
        restaurantKey,
        clientKey,
        totalPaid,

    ) {
        this.key = key;
        this.orderStatus = ORDER_STATUS.RECEIVED;
        this.restaurantKey = restaurantKey;
        this.clientKey = clientKey;
        this.totalPaid = totalPaid;
        createdAt = new Date().getTime();
        updatedAt = new Date().getTime();
    }
}

export const ORDER_STATUS = {
    "RECEIVED": "RECEIVED",
    "IN_PROGRESS": "IN_PROGRESS",
    "SENT": "SENT",
    "FINISHED": "FINISHED",
    "CANCELLED": "CANCELLED"
}