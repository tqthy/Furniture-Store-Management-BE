const MaintainanceService = require('../services/MaintainanceService'); // Adjust path
const MaintainanceController = require('../controllers/MaintainanceController'); // Adjust path

jest.mock('../services/MaintainanceService');

describe('createWarrantyOrder', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if required fields are missing', async () => {
    // Missing required fields
    mockReq.body = {
      warrantyId: null,
      description: null,
      details: null,
      cost: 0,
      estimateFinishDate: null,
    };

    await MaintainanceController.createWarrantyOrder(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Missing required information',
    });
  });

  test('should create a warranty order successfully', async () => {
    // Valid data
    mockReq.body = {
      warrantyId: 2,
      description: 'Broken chair legs',
      details: 'Damaged by accident, broken chair legs',
      cost: 200000,
      estimateFinishDate: '2024-01-01',
      staffId: 1,
    };

    const mockResponse = { message: 'Warranty Order has been created successfully' };
    MaintainanceService.createWarrantyOrder.mockResolvedValue(mockResponse);

    await MaintainanceController.createWarrantyOrder(mockReq, mockRes);

    expect(MaintainanceService.createWarrantyOrder).toHaveBeenCalledWith({
      warrantyId: 2,
      description: 'Broken chair legs',
      details: 'Damaged by accident, broken chair legs',
      staffId: 1,
      cost: 200000,
      estimateFinishDate: '2024-01-01',
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
  });

  test('should handle invalid cost', async () => {
    mockReq.body = {
      warrantyId: 2,
      description: 'Broken chair legs',
      details: 'Damaged by accident, broken chair legs',
      cost: -1,
      estimateFinishDate: '2024-01-01',
      staffId: 1,
    };

    const mockError = new Error('Cost can either be null or must be a numeric value greater than 0.');
    MaintainanceService.createWarrantyOrder.mockRejectedValue(mockError);

    await MaintainanceController.createWarrantyOrder(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Cost can either be null or must be a numeric value greater than 0.',
    });
  });

  test('should handle invalid EstimateFinishDate', async () => {
    mockReq.body = {
      warrantyId: 2,
      description: 'Broken chair legs',
      details: 'Damaged by accident, broken chair legs',
      cost: 200000,
      estimateFinishDate: '1/1/00', // Invalid date
      staffId: 1,
    };

    const mockError = new Error('EstimateFinishDate must be a valid date');
    MaintainanceService.createWarrantyOrder.mockRejectedValue(mockError);

    await MaintainanceController.createWarrantyOrder(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'EstimateFinishDate must be a valid date',
    });
  });

  test('should handle invalid EstimateFinishDate (past date)', async () => {
    mockReq.body = {
      warrantyId: 2,
      description: 'Broken chair legs',
      details: 'Damaged by accident, broken chair legs',
      cost: 200000,
      estimateFinishDate: '2020-01-01', // Past date
      staffId: 1,
    };

    expect(MaintainanceService.createWarrantyOrder).not.toHaveBeenCalled();

    await MaintainanceController.createWarrantyOrder(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'EstimateFinishDate must not be a past date',
    });
  });

  test('should handle exception in service call', async () => {
    mockReq.body = {
      warrantyId: 2,
      description: 'Broken chair legs',
      details: 'Damaged by accident, broken chair legs',
      cost: 200000,
      estimateFinishDate: '2024-01-01',
      staffId: 1,
    };

    const mockError = new Error('Internal Server Error');
    MaintainanceService.createWarrantyOrder.mockRejectedValue(mockError);

    await MaintainanceController.createWarrantyOrder(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});