/**
 * Заимпортите функции из файла api.js,
 * Получите данные по компаниям, товарам, пользователям и отзывам
 * Создайте классы для товаров, компаний, отзывов и пользователей (в папке classes)
 * Создайте массивы экземпляров объектов
 * Соберите 4 массива в один массив данных так:
 * Каждая компания должна содержать поле с массивом всех производимых продуктов.
 * Каждый продукт должен содждержать полную иформацию о себе, включая ревью.
 * Каждое ревью должно содержать информацию о пользователе, котороый это ревью оставил.
 **/


const { getCompanies, getProducts, getReviews, getUsers } = require("./api");
const { Company } = require("./classes/Company");
const { Product } = require("./classes/Product");
const { Review } = require("./classes/Review");
const { User } = require("./classes/User");

// Функция возвращает объект продукта по id
function getProductObject(productId, products) {
    return products.find(product => product.id === productId);
}

// Функция возвращает массив всех отзывов на продукт
function getAllReviews(productId, reviews, products, users) {
    const resultArray = [];
    for (const review of reviews) {
        if (getProductObject(productId, products).reviewIds.includes(review.id)) {
            const foundUserObject = users.find(obj => obj.id === review.userId);
            const newUser = new User(foundUserObject.id, foundUserObject.name);
            const newReview = new Review(null, review.id, review.text);
            newReview.user = newUser;
            resultArray.push(newReview);
        }
    }
    return resultArray;
}

// Функция возвращает массив всех продуктов, производимых компанией
function getAllProducts(companyId, products, reviews, users) {
    const resultArray = [];
    for (const product of products) {
        if (product.companyId === companyId) {
            const newProduct = new Product(product.id, product.companyId, product.name, product.description);
            newProduct.reviews = getAllReviews(newProduct.id, reviews, products, users);
            resultArray.push(newProduct);
        }
    }
    return resultArray;
}

(async () => {
    try {
        const [users, companies, products, reviews] = await Promise.all([getUsers(), getCompanies(), getProducts(), getReviews()]);

        //итоговый массив, состоящий из экземпляров класса Company
        const finalArray = [];
        for (const company of companies) {
            const companyList = new Company(company.id, company.name, company.created, company.country, null);
            companyList.allProducts = getAllProducts(company.id, products, reviews, users);
            finalArray.push(companyList);
        }

        console.log(finalArray);
    } catch (error) {
        console.error(error);
    }
})();