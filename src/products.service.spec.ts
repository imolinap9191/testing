import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './Iproducts';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
    productsService = app.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(productsService.create).toBeDefined();
      expect(productsService.delete).toBeDefined();
      expect(productsService.findAll).toBeDefined();
      expect(productsService.findById).toBeDefined();
      expect(productsService.update).toBeDefined();
    });
    it('should not be empty ', () => {
      const products = productsService.findAll();
      expect(productsService).not.toEqual([]);
    });
    it('should create a new product', () => {
      const newProduct: Product = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 50,
      };
      const createdProduct = productsService.create(newProduct);
      const foundProduct = productsService.findById('1');
      expect(createdProduct).toEqual(newProduct);
      expect(foundProduct).toEqual(newProduct);
    });

    it('should not allow creation of product with negative stock', () => {
      const productWithNegativeStock: Product = {
        id: '8',
        nombre: 'Batería externa Anker PowerCore',
        marca: 'Anker',
        descripcion: 'Batería portátil de 20000mAh para cargar dispositivos móviles',
        precio: 49.99,
        stock: -22,
      };
      const result = productsService.create(productWithNegativeStock);
      expect(result).toBeNull();
    });
    it('should not allow creation of product with negative price', () => {
      const productWithNegativePrice: Product = {
        id: '9',
        nombre: 'Teclado mecánico Corsair K70 RGB',
        marca: 'Corsair',
        descripcion: 'Teclado mecánico para juegos con retroiluminación RGB',
        precio: -159.95,
        stock: 20,
      };
      const result = productsService.create(productWithNegativePrice);
      expect(result).toBeNull();
    });
  });

    it('should update an existing product', () => {
      const initialProduct: Product = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 50,
      };
      productsService.create(initialProduct);
      const updatedProductData: Product = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 51,
      };
      const updatedProduct = productsService.update('1', updatedProductData);
      expect(updatedProduct).toEqual(updatedProductData);
    });
    it('should not update a non-existing product', () => {
      const updatedProductData: Product = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 51,
      };
      const updatedProduct = productsService.update('1', updatedProductData);
      expect(updatedProduct).toBeFalsy();
    });
    it('should delete an existing product', () => {
      const productToDelete: Product = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 51,
      };
      productsService.create(productToDelete);
      const deletedProduct = productsService.delete('1');
      const foundProduct = productsService.findById('1');
      expect(deletedProduct).toEqual(productToDelete);
      expect(foundProduct).toBeFalsy();
    });
    it('should not delete a non-existing product', () => {
      const deletedProduct = productsService.delete('1');
      expect(deletedProduct).toBeFalsy();
    });
  });

