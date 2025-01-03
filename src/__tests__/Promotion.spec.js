import PromotionService from '../services/PromotionService'
const db = require('../models')

jest.mock('../models', () => ({
  Promotion: {
    findAll: jest.fn(),
    create: jest.fn(),
  },
  Sequelize: {
    Op: {
      or: Symbol('or'),
      lte: Symbol('lte'),
      gte: Symbol('gte'),
    }
  }
}));

describe('createPromotion', () => {
  const name = 'Holiday Sale';
  const description = 'Discounts for the holiday season';
  const startDate = new Date('2023-12-01');
  const finishDate = new Date('2023-12-31');

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case 1

  it('should return error if promotion dates overlap', async () => {
    db.Promotion.findAll.mockResolvedValue([
      { id: 1,
        name: 'Existing Promotion', 
        startDate: new Date('2023-12-01'), 
        finishDate: new Date('2023-12-15') 
      },
    ])

    const result = await PromotionService.createPromotion(name, description, startDate, finishDate);

    expect(db.Promotion.findAll).toHaveBeenCalledTimes(1);
    expect(db.Promotion.findAll).toHaveBeenCalledWith({
      where: {
        [db.Sequelize.Op.or]: [
          {
            startDate: {
              [db.Sequelize.Op.lte]: finishDate,
              [db.Sequelize.Op.gte]: startDate,
            },
          },
          {
            finishDate: {
              [db.Sequelize.Op.gte]: startDate,
              [db.Sequelize.Op.lte]: finishDate,
            },
          },
        ],
      },
    });

    expect(result).toEqual({
      EM: 'Promotion date overlap with other promotions',
      EC: 1,
      DT: '',
    });

  });

  // Test case 2

  it('should create a new promotion if dates do not overlap', async () => {
    db.Promotion.findAll.mockResolvedValue([]);

    db.Promotion.create.mockResolvedValue({
      id: 2,
      name,
      description,
      startDate,
      finishDate,
    });

    const result = await PromotionService.createPromotion(name, description, startDate, finishDate);
    expect(db.Promotion.findAll).toHaveBeenCalledTimes(1);
    expect(db.Promotion.create).toHaveBeenCalledTimes(1);
    expect(db.Promotion.create).toHaveBeenCalledWith({
      name,
      description,
      startDate,
      finishDate,
    });

    expect(result).toEqual({
      EM: 'Create promotion successfully',
      EC: 0,
      DT: {
        id: 2,
        name,
        description,
        startDate,
        finishDate,
      },
    });
  });

  // Test case 3

  it('should handle database error', async () => {
    db.Promotion.findAll.mockRejectedValue(new Error('Database error'));

    const result = await PromotionService.createPromotion(name, description, startDate, finishDate);

    expect(result).toEqual({
      EM: 'Database error',
      EC: 1,
      DT: '',
    });
  })
})