const db = require('../models'); 
const service = require('../services/InvoiceService'); 

jest.mock('../models', () => ({
  sequelize: {
    transaction: jest.fn(),
  },
  Invoice: {
    create: jest.fn(),
  },
  InvoiceDetails: {
    create: jest.fn(),
  },
}));

describe('createInvoice', () => {
  let mockTransaction;

  beforeEach(() => {
    mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
      finished: false,
    };
    db.sequelize.transaction.mockResolvedValue(mockTransaction);
    jest.clearAllMocks();
  });

  test('should create an invoice and associated details successfully', async () => {
    // Mock inputs
    const totalCost = 1000;
    const InvoiceDetailsData = [
      { variantId: 1, quantity: 2, cost: 200, unitPrice: 100, discountAmount: 0 },
      { variantId: 2, quantity: 1, cost: 800, unitPrice: 800, discountAmount: 0 },
    ];
    const staffId = 1;
    const customerId = 1;
    const paymentMethod = 'credit_card';

    // Mock database responses
    const mockInvoice = { id: 10 };
    db.Invoice.create.mockResolvedValue(mockInvoice);
    db.InvoiceDetails.create.mockResolvedValue({});

    // Call the function
    const result = await service.createInvoice(
      totalCost,
      InvoiceDetailsData,
      staffId,
      customerId,
      paymentMethod
    );

    // Assertions
    expect(db.sequelize.transaction).toHaveBeenCalled();
    expect(db.Invoice.create).toHaveBeenCalledWith(
      {
        status: 'pending',
        totalCost,
        staffId,
        paymentMethod,
        customerId,
      },
      { transaction: mockTransaction }
    );
    for (const data of InvoiceDetailsData) {
      expect(db.InvoiceDetails.create).toHaveBeenCalledWith(
        {
          invoiceId: mockInvoice.id,
          variantId: data.variantId,
          quantity: data.quantity,
          cost: data.cost,
          unitPrice: data.unitPrice,
          discountAmount: data.discountAmount,
        },
        { transaction: mockTransaction }
      );
    }
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(result).toEqual({
      EM: 'Create invoice receipt successfully',
      EC: 0,
      DT: mockInvoice,
    });
  });

  test('should fail when staffId is null', async () => {
    db.Invoice.create.mockRejectedValue(new Error('StaffId is required'));
    const result = await service.createInvoice(
      100000,
      [
        { variantId: 1, quantity: 2, cost: 20000, unitPrice: 10000, discountAmount: 0 },
      ],
      null, // Missing staffId
      1,
      'cash'
    );
  
    expect(result).toEqual({
      EM: 'StaffId is required',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when totalCost is 0', async () => {
    const result = await service.createInvoice(
      0, // Invalid totalCost
      [
        { variantId: 1, quantity: 2, cost: 20000, unitPrice: 10000, discountAmount: 0 },
      ],
      1,
      1,
      'cash'
    );
  
    expect(db.Invoice.create).not.toHaveBeenCalled();

    expect(result).toEqual({
      EM: 'totalCost must be a numeric value greater than 0',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when InvoiceDetailsData is null', async () => {
    db.Invoice.create.mockRejectedValue(new Error('InvoiceDetailsData is required'));
    const result = await service.createInvoice(
      100000,
      null, // Missing InvoiceDetailsData
      1,
      1,
      'cash'
    );


    expect(result).toEqual({
      EM: 'InvoiceDetailsData is required',
      EC: 1,
      DT: '',
    });
  });

  test('should fail when paymentMethod is null', async () => {
    db.Invoice.create.mockRejectedValue(new Error('PaymentMethod is required'));
    const result = await service.createInvoice(
      100000,
      [
        { variantId: 1, quantity: 2, cost: 20000, unitPrice: 10000, discountAmount: 0 },
      ],
      1,
      1,
      null // Missing paymentMethod
    );
  
    expect(result).toEqual({
      EM: 'PaymentMethod is required',
      EC: 1,
      DT: '',
    });
  });

  test('should create an invoice successfully for boundary value of totalCost', async () => {
    const mockTransaction = { commit: jest.fn(), rollback: jest.fn(), finished: false };
    db.sequelize.transaction.mockResolvedValue(mockTransaction);
    db.Invoice.create.mockResolvedValue({ id: 11 });
    db.InvoiceDetails.create.mockResolvedValue({});
  
    const totalCost = 1; // Boundary value for totalCost
    const InvoiceDetailsData = [
      { variantId: 1, quantity: 1, cost: 1, unitPrice: 1, discountAmount: 0 },
    ];
    const staffId = 1;
    const customerId = 1;
    const paymentMethod = 'cash';
  
    const result = await service.createInvoice(totalCost, InvoiceDetailsData, staffId, customerId, paymentMethod);
  
    expect(db.Invoice.create).toHaveBeenCalledWith(
      { status: 'pending', totalCost, staffId, paymentMethod, customerId },
      { transaction: mockTransaction }
    );
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(result).toEqual({
      EM: 'Create invoice receipt successfully',
      EC: 0,
      DT: { id: 11 },
    });
  });

  test('should rollback transaction on error and return the error message', async () => {
    // Mock inputs
    const totalCost = 1000;
    const InvoiceDetailsData = [
      { variantId: 1, quantity: 2, cost: 200, unitPrice: 100, discountAmount: 0 },
    ];
    const staffId = 1;
    const customerId = 1;
    const paymentMethod = 'credit_card';

    // Mock database responses to throw an error
    db.Invoice.create.mockRejectedValue(new Error('Database error'));

    // Call the function
    const result = await service.createInvoice(
      totalCost,
      InvoiceDetailsData,
      staffId,
      customerId,
      paymentMethod
    );

    // Assertions
    expect(db.sequelize.transaction).toHaveBeenCalled();
    expect(db.Invoice.create).toHaveBeenCalled();
    expect(mockTransaction.rollback).toHaveBeenCalled();
    expect(result).toEqual({
      EM: 'Database error',
      EC: 1,
      DT: '',
    });
  });

  test('should not attempt rollback if transaction is already finished', async () => {
    // Mock inputs
    const totalCost = 1000;
    const InvoiceDetailsData = [
      { variantId: 1, quantity: 2, cost: 200, unitPrice: 100, discountAmount: 0 },
    ];
    const staffId = 1;
    const customerId = 1;
    const paymentMethod = 'credit_card';

    // Mock database responses to throw an error
    db.Invoice.create.mockImplementation(async () => {
      mockTransaction.finished = true; // Simulate transaction finished
      throw new Error('Database error');
    });

    // Call the function
    const result = await service.createInvoice(
      totalCost,
      InvoiceDetailsData,
      staffId,
      customerId,
      paymentMethod
    );

    // Assertions
    expect(mockTransaction.rollback).not.toHaveBeenCalled(); // No rollback if finished
    expect(result).toEqual({
      EM: 'Database error',
      EC: 1,
      DT: '',
    });
  });
});