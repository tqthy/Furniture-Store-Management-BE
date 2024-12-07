const ProductService = require('../services/ProductSerivce');
const Controller = require('../controllers/ProductController'); 

jest.mock('../services/ProductSerivce');

describe('createProduct', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('should create product successfully with valid inputs', async () => {
    // Mock valid input
    mockReq.body = {
      name: 'Ghế gỗ cao cấp',
      description: 'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      warranty: 12,
      catalogueId: 1,
      image: 'hinhanh.jpeg',
    };

    const mockResponse = { EM: 'Successfully created a new product', EC: 0, DT: {} };
    ProductService.createProduct.mockResolvedValue(mockResponse);

    await Controller.createProduct(mockReq, mockRes);

    // Assertions
    expect(ProductService.createProduct).toHaveBeenCalledWith(
      1,
      'Ghế gỗ cao cấp',
      'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      12,
      'hinhanh.jpeg'
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
  });

  test('should fail when product name is missing', async () => {
    mockReq.body = {
      description: 'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      warranty: 12,
      catalogueId: 1,
      image: 'hinhanh.jpeg',
    };

    await Controller.createProduct(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing product data',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when warranty is missing', async () => {
    mockReq.body = {
      name: 'Bàn mặt đá Ceramic',
      description: 'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      catalogueId: 1,
      image: 'hinhanh.jpeg',
    };

    await Controller.createProduct(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing product data',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when image format is invalid', async () => {
    mockReq.body = {
      name: 'Bộ bàn 6 ghế Monet',
      description: 'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      warranty: 12,
      catalogueId: 1,
      image: 'haha.cr2', // Invalid format
    };

    ProductService.createProduct.mockResolvedValue({ data: "Data" });

    await Controller.createProduct(mockReq, mockRes);

    expect(ProductService.createProduct).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Only JPEG, JPG or PNG images are allowed.',
    });
  });

  test('should fail when warranty time is negative', async () => {
    mockReq.body = {
      name: 'Ghế gỗ cao cấp',
      description: 'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      warranty: -1, // Negative warranty
      catalogueId: 1,
      image: 'hinhanh.jpeg',
    };

    ProductService.createProduct.mockResolvedValue({ data: "Data" });

    await Controller.createProduct(mockReq, mockRes);

    expect(ProductService.createProduct).not.toHaveBeenCalled();

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'WarrantyTime must be an integer >= 0',
    });
  });

  test('should fail when categoryID is missing', async () => {
    mockReq.body = {
      name: 'Ghế gỗ cao cấp',
      description: 'Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...',
      warranty: 12,
      image: 'hinhanh.jpeg',
    };

    ProductService.createProduct.mockResolvedValue({ data: "Data" });

    await Controller.createProduct(mockReq, mockRes);

    expect(ProductService.createProduct).not.toHaveBeenCalled();

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Category is required',
    });
  });

  test('should fail when description is missing', async () => {
    mockReq.body = {
      name: 'Ghế gỗ cao cấp',
      warranty: 12,
      catalogueId: 1,
      image: 'hinhanh.jpeg',
    };

    conProductService.createProduct.mockResolvedValue({ data: "Data" });

    await Controller.createProduct(mockReq, mockRes);

    expect(ProductService.createProduct).not.toHaveBeenCalled();

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Description is required',
    });
  });
});