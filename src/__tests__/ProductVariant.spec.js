const ProductVariantService = require('../services/ProductVariantService'); // Adjust path
const Controller = require('../controllers/ProductVariantController'); // Adjust path

jest.mock('../services/ProductVariantService');

describe('createProductVariant', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('should create product variant successfully with valid inputs', async () => {
    // Mock valid input
    mockReq.params = { productId: 1 };
    mockReq.body = {
      sku: 'SKU123',
      price: 100,
      color: 'Red',
      size: 'M',
      buyingPrice: 80,
    };

    const mockResponse = { EM: 'Successfully created product variant', EC: 0, DT: {} };
    ProductVariantService.createProductVariant.mockResolvedValue(mockResponse);

    await Controller.createProductVariant(mockReq, mockRes);

    // Assertions
    expect(ProductVariantService.createProductVariant).toHaveBeenCalledWith(
      1,
      'SKU123',
      100,
      'Red',
      'M',
      80
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
  });

  test('should fail when productId is missing', async () => {
    mockReq.body = {
      sku: 'SKU123',
      price: 100,
      color: 'Red',
      size: 'M',
      buyingPrice: 80,
    };

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing required fields',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when sku is missing', async () => {
    mockReq.params = { productId: 1 };
    mockReq.body = {
      price: 100,
      color: 'Red',
      size: 'M',
      buyingPrice: 80,
    };

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing required fields',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when price is missing', async () => {
    mockReq.params = { productId: 1 };
    mockReq.body = {
      sku: 'SKU123',
      color: 'Red',
      size: 'M',
      buyingPrice: 80,
    };

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing required fields',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when color is missing', async () => {
    mockReq.params = { productId: 1 };
    mockReq.body = {
      sku: 'SKU123',
      price: 100,
      size: 'M',
      buyingPrice: 80,
    };

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing required fields',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when size is missing', async () => {
    mockReq.params = { productId: 1 };
    mockReq.body = {
      sku: 'SKU123',
      price: 100,
      color: 'Red',
      buyingPrice: 80,
    };

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing required fields',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when buyingPrice is missing', async () => {
    mockReq.params = { productId: 1 };
    mockReq.body = {
      sku: 'SKU123',
      price: 100,
      color: 'Red',
      size: 'M',
    };

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing required fields',
      EC: 1,
      DT: '',
    });
  });

  test('should handle service errors gracefully', async () => {
    mockReq.params = { productId: 1 };
    mockReq.body = {
      sku: 'SKU123',
      price: 100,
      color: 'Red',
      size: 'M',
      buyingPrice: 80,
    };

    const mockError = new Error('Service failed');
    ProductVariantService.createProductVariant.mockRejectedValue(mockError);

    await Controller.createProductVariant(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Service failed',
    });
  });
});