import React, { useState, useEffect } from 'react';
import { View, Pressable, TextInput , Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchProductsSelector, filterProducts } from '../atoms/ProductList';

const SearchBar = () => {
  const dataProducts = useRecoilValue(fetchProductsSelector);
  const [filterProduct, setFilterProducts] = useRecoilState(filterProducts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (dataProducts.length > 0) {
      setFilterProducts(dataProducts); 
    }
  }, [dataProducts, setFilterProducts]);

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilterProducts(dataProducts); 
    } else {
      const filtered = dataProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterProducts(filtered); 
    }
  };
  return (
    <View style={{ flexDirection: 'row', width: '95%', alignItems:'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#E4E4E4', flex: 1, borderRadius: 10, marginRight: 10, height: 45 }}>
        <FontAwesome
          name="search"
          size={28}
          color={"black"}
          style={{ marginLeft: 5, marginRight: 5 }}
        />
        <TextInput
          placeholder="Search here"
          style={{ flex: 1, fontSize: 18 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} 
          returnKeyType="search" 
        />
      </View>
      <Pressable style={{alignItems:'center', justifyContent:'center', marginRight:10, backgroundColor:'black', height:45 , width:60, borderRadius: 10}}
        onPress={handleSearch}
      >
          <Text style={{fontSize: 20,color:'white', fontWeight:'bold'}}>Tìm</Text>
        </Pressable>
      <Pressable style={{ justifyContent: 'center' }}>
        <FontAwesome name="list-ul" size={30} />
      </Pressable>
    </View>
  );
};

export default SearchBar;
