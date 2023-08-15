export class Restaurant {
    static REF = "restaurants"
    key;
    name;
    category;
    description;
    rating;
    schedule;
    createdAt;
    updatedAt;

    constructor(
        key,
        name,
        category,
        description,
        rating,
        schedule,

    ) {
        this.key = key;
        this.name = name;
        this.category = category;
        this.description = description;
        this.rating = rating;
        this.schedule = schedule;
        createdAt = new Date().getTime();
        updatedAt = new Date().getTime();
    }
}