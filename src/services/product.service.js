import Api from './api.service';

// al extender de Api, nuestra clase Product recibe todas sus propiedades y metodos
class ProductService extends Api {
}

export default new ProductService('products');
