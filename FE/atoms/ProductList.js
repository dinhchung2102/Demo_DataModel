// atoms/products.js

import { atom, selector } from 'recoil';

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
