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

  it('should return listProducts', () => {
    const result: Product[] = [
      {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      },
      {
        id: '2',
        nombre: 'Smartphone Samsung Galaxy S21',
        marca: 'Samsung',
        descripcion:
          'Smartphone con pantalla AMOLED de 6.2 pulgadas, 128GB de almacenamiento',
        precio: 999.0,
        stock: 20,
      },
      {
        id: '3',
        nombre: 'Tablet Apple iPad Pro',
        marca: 'Apple',
        descripcion:
          'Tablet con pantalla Retina de 11 pulgadas, 256GB de almacenamiento',
        precio: 1099.99,
        stock: 15,
      },
    ];
    jest.spyOn(productsService, 'findAll').mockImplementation(() => result);
    expect(productsController.findAll()).toEqual(result);
  });

  it('should return idProducts', () => {
    const result: Product = {
      id: '1',
      nombre: 'Laptop HP Pavilion',
      marca: 'HP',
      descripcion:
        'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
      precio: 899.99,
      stock: 30,
    };
    jest.spyOn(productsService, 'findById').mockImplementation((id: string) => {
      return id === '1' ? result : null;
    });
    expect(productsController.findById('1')).toEqual(result);
    expect(productsController.findById('2')).toBeNull();
    //expect(productsController.findById("2")).toEqual(result);
  });
  it('should create a new product', () => {
    const newProduct: Product = {
      id: '7',
      nombre: 'Auriculares inalámbricos Apple AirPods Pro',
      marca: 'Apple',
      descripcion: 'Auriculares con cancelación de ruido y resistencia al agua',
      precio: 249.0,
      stock: 18,
    };
    jest
      .spyOn(productsService, 'create')
      .mockImplementation((product: Product) => {
        return newProduct;
      });
    expect(productsController.create(newProduct)).toEqual(newProduct);
  });
  it('should update an existing product', () => {
    const updatedProduct: Product = {
      id: '7',
      nombre: 'Auriculares inalámbricos Apple AirPods Pro',
      marca: 'Apple',
      descripcion: 'Auriculares con cancelación de ruido y resistencia al agua',
      precio: 259.0,
      stock: 18,
    };
    jest
      .spyOn(productsService, 'update')
      .mockImplementation((id: string, product: Product) => {
        return id === '7' ? updatedProduct : null;
      });
    expect(productsController.update('7', updatedProduct)).toEqual(
      updatedProduct,
    );
    expect(productsController.update('8', updatedProduct)).toBeNull();
  });

  it('should delete an existing product', () => {
    const deletedProduct: Product = {
      id: '7',
      nombre: 'Auriculares inalámbricos Apple AirPods Pro',
      marca: 'Apple',
      descripcion: 'Auriculares con cancelación de ruido y resistencia al agua',
      precio: 259.0,
      stock: 18,
    };
    jest.spyOn(productsService, 'delete').mockImplementation((id: string) => {
      return id === '7' ? deletedProduct : null;
    });
    expect(productsController.delete('7')).toEqual(deletedProduct);
    expect(productsController.delete('9')).toBeNull();
  });
  it('should be defined', () => {
    expect(productsService.create).toBeDefined();
    expect(productsService.delete).toBeDefined();
    expect(productsService.findAll).toBeDefined();
    expect(productsService.findById).toBeDefined();
    expect(productsService.update).toBeDefined();
  });
});
