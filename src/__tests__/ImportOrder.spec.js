const GoodsReceiptService = require('../services/GoodsReceiptService'); 
const Controller = require('../controllers/GoodsReceiptController'); 

jest.mock('../services/GoodsReceiptService');

describe('createGoodsReceipt', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('should create goods receipt successfully with valid inputs', async () => {
    // Mock valid input
    mockReq.body = {
      shipping: 'Shipping details',
      GoodsReceiptDetailsData: [
        { itemId: 1, quantity: 10, unitPrice: 100 },
        { itemId: 2, quantity: 5, unitPrice: 200 },
      ],
      totalCost: 2000,
      providerId: 1,
    };

    const mockResponse = { EM: 'Successfully created goods receipt', EC: 0, DT: { id: 101 } };
    GoodsReceiptService.createGoodsReceipt.mockResolvedValue(mockResponse);
    GoodsReceiptService.acceptGoodsReceipt.mockResolvedValue({});

    await Controller.createGoodsReceipt(mockReq, mockRes);

    // Assertions
    expect(GoodsReceiptService.createGoodsReceipt).toHaveBeenCalledWith(
      'Shipping details',
      mockReq.body.GoodsReceiptDetailsData,
      2000,
      1
    );
    expect(GoodsReceiptService.acceptGoodsReceipt).toHaveBeenCalledWith(101);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
  });

  test('should fail when shipping is missing', async () => {
    mockReq.body = {
      GoodsReceiptDetailsData: [{ itemId: 1, quantity: 10, unitPrice: 100 }],
      totalCost: 1000,
      providerId: 1,
    };

    await Controller.createGoodsReceipt(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing shipping or goods receipt details data',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when GoodsReceiptDetailsData is missing', async () => {
    mockReq.body = {
      shipping: 'Shipping details',
      totalCost: 1000,
      providerId: 1,
    };

    await Controller.createGoodsReceipt(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing shipping or goods receipt details data',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when totalCost is missing', async () => {
    mockReq.body = {
      shipping: 'Shipping details',
      GoodsReceiptDetailsData: [{ itemId: 1, quantity: 10, unitPrice: 100 }],
      providerId: 1,
    };

    await Controller.createGoodsReceipt(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing shipping or goods receipt details data',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when providerId is missing', async () => {
    mockReq.body = {
      shipping: 'Shipping details',
      GoodsReceiptDetailsData: [{ itemId: 1, quantity: 10, unitPrice: 100 }],
      totalCost: 1000,
    };

    await Controller.createGoodsReceipt(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      EM: 'Missing shipping or goods receipt details data',
      EC: 1,
      DT: '',
    });
  });

  test('should handle service errors gracefully', async () => {
    mockReq.body = {
      shipping: 'Shipping details',
      GoodsReceiptDetailsData: [{ itemId: 1, quantity: 10, unitPrice: 100 }],
      totalCost: 1000,
      providerId: 1,
    };

    const mockError = new Error('Service failed');
    GoodsReceiptService.createGoodsReceipt.mockRejectedValue(mockError);

    await Controller.createGoodsReceipt(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Service failed',
    });
  });

  test('should handle acceptGoodsReceipt service errors gracefully', async () => {
    mockReq.body = {
      shipping: 'Shipping details',
      GoodsReceiptDetailsData: [
        { itemId: 1, quantity: 10, unitPrice: 100 },
        { itemId: 2, quantity: 5, unitPrice: 200 },
      ],
      totalCost: 2000,
      providerId: 1,
    };

    const mockResponse = { EM: 'Successfully created goods receipt', EC: 0, DT: { id: 101 } };
    GoodsReceiptService.createGoodsReceipt.mockResolvedValue(mockResponse);
    GoodsReceiptService.acceptGoodsReceipt.mockRejectedValue(new Error('Acceptance failed'));

    await Controller.createGoodsReceipt(mockReq, mockRes);

    expect(GoodsReceiptService.createGoodsReceipt).toHaveBeenCalledWith(
      'Shipping details',
      mockReq.body.GoodsReceiptDetailsData,
      2000,
      1
    );
    expect(GoodsReceiptService.acceptGoodsReceipt).toHaveBeenCalledWith(101);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Acceptance failed',
    });
  });
});