// export * from './';
import catalogueRoute from './CatalogueRoute';
import productRoute from './ProductRoute'
import goodsReceiptRoute from './GoodsReceiptRoute'
import ProductVariantRoute from './ProductVariantRoute'
import invoiceRoute from './InvoiceRoute'
import providerRoute from './ProviderRoute'
import customerRoute from './CustomerRoute'
import staffRoute from './StaffRoute';
import fileRoute from './FileRoute'
import authRoute from './AuthRoute'
import promotionRoute from './PromotionRoute'
const config = { 
    catalogueRoute,
    productRoute,
    goodsReceiptRoute,
    ProductVariantRoute,
    invoiceRoute,
    providerRoute,
    customerRoute,
    staffRoute,
    fileRoute,
    authRoute,
    promotionRoute
}
export default config;