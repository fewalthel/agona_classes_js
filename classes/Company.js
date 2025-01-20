class Company {
    constructor(id, name, created, country, allProducts) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.country = country;
        this.allProducts = allProducts; //массив всех производимых продуктов (экземпляров класса Product)
    }
}

module.exports = { Company };