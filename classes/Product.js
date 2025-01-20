class Product {
    constructor(id, companyId, name, description) {
        this.id = id;
        this.companyId = companyId;
        this.reviews = new Set(); //set всех отзывов на товар (экземпляров класса Review)
        this.name = name;
        this.description = description;
    }
}

module.exports = { Product };