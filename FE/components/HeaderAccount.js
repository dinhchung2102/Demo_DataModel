import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRecoilValue } from "recoil";
import { userInfoSelector } from '../atoms/User';

const HeaderAccount = ({ onPress }) => {
  const UserInfo = useRecoilValue(userInfoSelector); // Lấy thông tin người dùng từ Recoil
  
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>

      {/* Phần nút Back */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={onPress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <AntDesign name="left" size={25} color={"grey"} />
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Back</Text>
        </Pressable>
      </View>

      {/* Phần giỏ hàng và ảnh người dùng */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: 'flex-end' }}>
        <Pressable>
          <AntDesign name="shoppingcart" color={"grey"} size={30} />
        </Pressable>

        {/* Hiển thị hình ảnh người dùng */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png", // Hình ảnh mặc định
          }}
          style={{ width: 50, height: 50 }}
        />
        
        {/* Hiển thị tên người dùng */}
        <Text>{UserInfo.name}</Text>
      </View>
      
    </View>
  );
};

export default HeaderAccount;
