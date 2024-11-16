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
export const userNameByReview = selector({
  key: 'userNameByReview',
  get: async ({ get }) => {
    const reviews = get(reviewsSelector);  

    if (!reviews || reviews.length === 0) {
      return [];
    }

    // Lấy user_id từ mỗi review và gọi API để lấy thông tin người dùng
    const userPromises = reviews.map(async (review) => {
      const response = await fetch(`http://192.168.100.70:5000/api/users/${review.user_id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user with user_id ${review.user_id}`);
      }
      const user = await response.json();
      return user ? user.name : 'Unknown User';  // Trả về tên người dùng hoặc 'Unknown User' nếu không tìm thấy
    });

    try {
      // Chờ tất cả các promise hoàn thành và trả về mảng tên người dùng
      const userNames = await Promise.all(userPromises);
      return userNames;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
});

