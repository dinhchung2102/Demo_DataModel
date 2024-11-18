
import { atom, selector, useRecoilValue } from 'recoil';


// Atom lưu trữ dữ liệu sản phẩm
export const productsState = atom({
  key: 'productsState',  
  default: [],           
});

// Selector để gọi API lấy sản phẩm
export const fetchProductsSelector = selector({
  key: 'fetchProductsSelector',  
  get: async ({ get }) => {
    try {
      const response = await fetch(`http://192.168.100.70:5000/api/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error(error);
      return []; 
    }
  },
});
//====================================================
export const productDetailState = atom({
    key:'productDetailState',
    default:[]
})
//============================================

export const reviewsSelector = selector({
  key: 'reviewsSelector',
  get: async ({ get }) => {
    const productDetail = get(productDetailState);  
    if (!productDetail) {
      return [];  
    }

    try {
      const response = await fetch(`http://192.168.100.70:5000/api/reviews/product/${productDetail.product_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const reviews = await response.json();
      return reviews;  
    } catch (error) {
      console.error(error);
      return [];  
    }
  },
});
//================================
export const countProductSelector = selector({
  key: "countProduct",
  get: async ({ get }) => {
    const productDetail = get(productDetailState);  

    if (!productDetail) {
      return 0;  
    }

    try {
      const response = await fetch(`http://192.168.100.70:5000/api/historyPurchases/product/quantity/${productDetail.product_id}`);

      if (!response.ok) {
        throw new Error("Failed to get quantity");
      }
      const historyQuantity = await response.json();

      return historyQuantity.total_quantity || 0;

    } catch (error) {
      console.log(error);
      return 0;  
    }
  },
});

export const filterProductsSelector = selector({
  key: 'filterProductsSelector',
  get: ({ get }) => {
    const searchQuery = get(filterProducts);
    const products = get(fetchProductsSelector); 

    if (!searchQuery) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
});
//============

export const filterProducts = atom({
  key:"filterProducts",
  default:[]
})


