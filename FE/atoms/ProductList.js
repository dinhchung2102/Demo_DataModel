// atoms/products.js

import { atom, selector } from 'recoil';

// Atom lưu trữ dữ liệu sản phẩm
export const productsState = atom({
  key: 'productsState',  // unique key cho atom này
  default: [],           // giá trị mặc định là một mảng trống
});

// Selector để gọi API lấy sản phẩm
export const fetchProductsSelector = selector({
  key: 'fetchProductsSelector',  // unique key cho selector này
  get: async ({ get }) => {
    try {
      // Lấy dữ liệu sản phẩm từ API
      const response = await fetch('http://192.168.100.70:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;  // Trả về dữ liệu sản phẩm
    } catch (error) {
      console.error(error);
      return [];  // Trả về mảng trống nếu có lỗi
    }
  },
});
