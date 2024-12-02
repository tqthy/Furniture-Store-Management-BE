'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Permission', [
      //category
      {
        name: 'Create a category',
        method: 'POST',
        url: '/catalogues/create-catalogue',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update category',
        method: 'PUT',
        url: '/catalogues/update-catalogue/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list categories',
        method: 'GET',
        url: '/catalogues/get-all-catalogues',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a category',
        method: 'DELETE',
        url: '/catalogues/delete-catalogue/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //product
      {
        name: 'Creat a product',
        method: 'POST',
        url: '/products/create-product',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a Product',
        method: 'PUT',
        url: '/products/update-product/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a product',
        method: 'DELETE',
        url: '/products/delete-product/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list products',
        method: 'GET',
        url: '/products/get-all-products',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a product',
        method: 'GET',
        url: '/products/get-product/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Stop selling a product',
        method: 'PUT',
        url: '/products/stop-selling/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //variant
      {
        name: 'Creat a variant',
        method: 'POST',
        url: '/variants/create-variant/:productId',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a variant',
        method: 'PUT',
        url: '/variants/update-variant/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a variant',
        method: 'DELETE',
        url: '/variants/delete-variant/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list variants of a product',
        method: 'GET',
        url: '/variants/get-all-variants/:productId',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list variants of all products',
        method: 'GET',
        url: '/variants/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a variant',
        method: 'GET',
        url: '/variants/get-variant/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //GoodsReceipt
      {
        name: 'Creat a goods receipt',
        method: 'POST',
        url: '/goods-receipt/create-goods-receipt',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   name: 'Accept a goods receipt',
      //   method: 'PUT',
      //   url: '/goods-receipt/accept-goods-receipt/:id',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        name: 'Read list goods receipts',
        method: 'GET',
        url: '/goods-receipt/get-all-goods-receipts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a goods receipt',
        method: 'GET',
        url: '/goods-receipt/get-goods-receipt/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a goods receipt',
        method: 'PUT',
        url: '/goods-receipt/update-goods-receipt/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   name: 'Reject a goods receipt',
      //   method: 'PUT',
      //   url: '/goods-receipt/reject-goods-receipt/:id',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },

      //Invoice 
      {
        name: 'Creat a invoice',
        method: 'POST',
        url: '/invoices/create-invoice',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Accept a invoice',
        method: 'PUT',
        url: '/invoices/accept-invoice/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Reject a invoice',
        method: 'PUT',
        url: '/invoices/reject-invoice/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a invoice',
        method: 'PUT',
        url: '/invoices/update-invoice/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list invoices',
        method: 'GET',
        url: '/invoices/get-all-invoices',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a invoice',
        method: 'GET',
        url: '/invoices/get-invoice/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //customer
      {
        name: 'Creat a customer',
        method: 'POST',
        url: '/customers/create-customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a customer',
        method: 'PUT',
        url: '/customers/update-customer/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a customer',
        method: 'DELETE',
        url: '/customers/delete-customer/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list customers',
        method: 'GET',
        url: '/customers/get-all-customers',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a customer',
        method: 'GET',
        url: '/customers/get-customer/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //maintainance
      {
        name: 'Creat all maintainances',
        method: 'GET',
        url: '/maintainance/warranty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list warranty orders',
        method: 'GET',
        url: '/maintainance/warranty/order/:warrantyId',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list warranty orders by status',
        method: 'GET',
        url: '/maintainance/warranty/order/status/:status',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list warranty orders',
        method: 'GET',
        url: '/maintainance/warranty/order/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Creat a warranty order',
        method: 'POST',
        url: '/maintainance/warranty/order/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a warranty order',
        method: 'PATCH',
        url: '/maintainance/warranty/order/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a warranty order',
        method: 'DELETE',
        url: '/maintainance/warranty/order/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list repair orders by status',
        method: 'GET',
        url: '/maintainance/repair/status/:status',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list repair orders',
        method: 'GET',
        url: '/maintainance/repair/order/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Creat a repair order',
        method: 'POST',
        url: '/maintainance/repair/order/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a repair order',
        method: 'PATCH',
        url: '/maintainance/repair/order/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a repair order',
        method: 'DELETE',
        url: '/maintainance/repair/order/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //Promotion
      {
        name: 'Creat a promotion',
        method: 'POST',
        url: '/promotion/create-promotion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a promotion',
        method: 'PUT',
        url: '/promotion/update-promotion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Stop a promotion',
        method: 'PATCH',
        url: '/promotion/stop-promotion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a promotion',
        method: 'DELETE',
        url: '/promotion/delete-promotion/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list promotions',
        method: 'GET',
        url: '/promotion/get-all-promotions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a promotion',
        method: 'GET',
        url: '/promotion/get-promotion/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a current promotion',
        method: 'GET',
        url: '/promotion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      //Provider
      {
        name: 'Creat a provider',
        method: 'POST',
        url: '/providers/create-provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a provider',
        method: 'PUT',
        url: '/providers/update-provider/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a provider',
        method: 'DELETE',
        url: '/providers/delete-provider/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list providers',
        method: 'GET',
        url: '/providers/get-all-providers',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list active providers',
        method: 'GET',
        url: '/providers/get-all-active-providers',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a provider',
        method: 'GET',
        url: '/providers/get-provider/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //Staff
      {
        name: 'Creat a staff',
        method: 'POST',
        url: '/staffs/create-staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Update a staff',
        method: 'PUT',
        url: '/staffs/update-staff/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delete a staff',
        method: 'DELETE',
        url: '/staffs/delete-staff/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read list staffs',
        method: 'GET',
        url: '/staffs/get-all-staffs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Read information of a staff',
        method: 'GET',
        url: '/staffs/get-staff/:id',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Permission', null, {});
  }
};
