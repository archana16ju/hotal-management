import type { CollectionBeforeChangeHook } from 'payload';

export const generateBarcode: CollectionBeforeChangeHook = async ({
  data,
  req,
}) => {

  if (data.productBarcode) {
    return data;
  }

  const company = await req.payload.find({
    collection: 'company-profile',
    limit: 1,
  });

  if (!company.docs.length) {
    throw new Error('Company profile not found');
  }

  const companyPrefix = company.docs[0].companyPrefix;

  const products = await req.payload.find({
    collection: 'products',
    limit: 1,
    sort: '-createdAt',
  });

  const lastNumber = products.totalDocs + 1;

  const productCode = String(lastNumber).padStart(5, '0');

  data.productBarcode = `${companyPrefix}${productCode}`;

  return data;
};