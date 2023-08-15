export class Dish {
    static REF = "dishes"
    key;
    restaurantKey;
    name;
    description;
    price;
    photo;
    category;
    additionalIngredients;
    cookingTime;
    createdAt;
    updatedAt;

    constructor(
        key,
        restaurantKey,
        name,
        description,
        price,
        photo,
        category,
        additionalIngredients,
        cookingTime,

    ) {
        this.key = key;
        this.restaurantKey = restaurantKey;
        this.name = name;
        this.description = description;
        this.price = price;
        this.photo = photo;
        this.category = category;
        this.additionalIngredients = additionalIngredients;
        this.cookingTime = cookingTime;
        createdAt = new Date().getTime();
        updatedAt = new Date().getTime();
    }
}