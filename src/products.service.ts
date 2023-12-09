import { Injectable } from '@nestjs/common';
import { Product } from './Iproducts';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  findAll(): Product[] {
    return this.products;
  }
  findById(id: string): Product {
    return this.products.find((product) => product.id === id);
  }
  create(product: Product): Product {
    if (product.stock < 0 || product.precio < 0) {
      return null;
    }
   this.products.push(product);
    return product;
  }
  update(id: string, updatedProduct: Product): Product {
    const nroIndice = this.products.findIndex((p) => p.id === id);
    if (nroIndice !== -1) {
      this.products[nroIndice] = {
        ...this.products[nroIndice],
        ...updatedProduct,
      };
      return this.products[nroIndice];
    }
  }
  delete(id: string): Product {
    const nroIndice = this.products.findIndex((p) => p.id === id);
    if (nroIndice !== -1) {
      const deleteProduct = this.products[nroIndice];
      this.products.splice(nroIndice, 1);

      return deleteProduct;
    }
  }
}
