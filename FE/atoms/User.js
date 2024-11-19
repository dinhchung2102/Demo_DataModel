import { atom, selector } from 'recoil';

const userPhone = atom({
  key: "userPhone",  
  default: "",  
});

export const userInfoSelector = selector({
  key: 'userInfoSelector',  
  get: async ({ get }) => {
    const phone = get(userPhone);  
    if (!phone) {
      return null;  
    }

    try {
      const response = await fetch(`http://192.168.100.70:5000/api/users/by-phone/${phone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();  
        return data; 
      } else {
        throw new Error('User not found');  
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;  
    }
  },
});

export { userPhone };
