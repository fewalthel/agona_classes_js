class Review {
    constructor(user, id, text) {
        this.user = user; //экземпляр класса User, который оставил отзыв
        this.id = id;
        this.text = text;
    }
}

module.exports = { Review };