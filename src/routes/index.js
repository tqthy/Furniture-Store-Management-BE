// export * from './';
import catalogueRoute from './CatalogueRoute';
import productRoute from './ProductRoute'
import goodsReceiptRoute from './GoodsReceiptRoute'
import ProductVariantRoute from './ProductVariantRoute'
import invoiceRoute from './InvoiceRoute'
import providerRoute from './ProviderRoute'
import customerRoute from './CustomerRoute'
import staffRoute from './StaffRoute';
const config = { 
    catalogueRoute,
    productRoute,
    goodsReceiptRoute,
    ProductVariantRoute,
    invoiceRoute,
    providerRoute,
    customerRoute,
    staffRoute
}
export default config;