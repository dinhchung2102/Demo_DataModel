// atoms/products.js

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
      const response = await fetch('http://192.168.100.70:5000/api/products');
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

    // Kiểm tra xem productDetail có tồn tại không
    if (!productDetail) {
      return 0;  // Nếu không có sản phẩm, trả về 0 (hoặc có thể là giá trị mặc định khác)
    }

    try {
      // Gọi API để lấy tổng số lượng sản phẩm từ lịch sử mua hàng
      const response = await fetch(`http://192.168.100.70:5000/api/historyPurchases/product/quantity/${productDetail.product_id}`);

      if (!response.ok) {
        throw new Error("Failed to get quantity");
      }

      // Parse kết quả JSON và trả về total_quantity
      const historyQuantity = await response.json();

      // Kiểm tra nếu có trường total_quantity trong response
      return historyQuantity.total_quantity || 0;

    } catch (error) {
      console.log(error);
      return 0;  // Nếu có lỗi, trả về 0
    }
  },
});

