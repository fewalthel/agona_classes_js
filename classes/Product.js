class Product {
    constructor(id, companyId, reviews, name, description) {
        this.id = id;
        this.companyId = companyId;
        this.reviews = reviews; //массив всех отзывов на товар (экземпляров класса Review)
        this.name = name;
        this.description = description;
    }
}

module.exports = { Product };