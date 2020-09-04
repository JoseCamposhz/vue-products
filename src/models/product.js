export class Product {
    constructor(product = {}) {
        this._id = product._id || 0;
        this.product_name = product.product_name || '';
        this.product_description = product.product_description || '';
        this.product_price = product.product_price || 0;
    }
}