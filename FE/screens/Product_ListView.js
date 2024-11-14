import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { maxProductList } from "../atoms/MaxProductList";
import { fetchProductsSelector } from "../atoms/ProductList";


export default function Product_ListView({ navigation }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const translateX = useState(new Animated.Value(0))[0]; // Điều khiển di chuyển theo trục X
  const [maxProduct, setMaxProduct] = useState(4)

  const dataProduct = useRecoilValue(fetchProductsSelector);


  useEffect(() => {
    const bannerInterval = setInterval(() => {
      // Di chuyển từ bên phải sang bên trái
      Animated.sequence([
        // Di chuyển ra ngoài màn hình
        Animated.timing(translateX, {
          toValue: -400, // Di chuyển banner ra ngoài (hoặc giá trị chiều rộng của banner)
          duration: 1000, // Thời gian di chuyển chậm lại (1 giây)
          useNativeDriver: true,
        }),
        // Reset về vị trí ban đầu và thay đổi banner
        Animated.timing(translateX, {
          toValue: 400, // Di chuyển banner ra ngoài bên phải
          duration: 0,  // Không cần thời gian cho bước này, chỉ thay đổi vị trí
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0, // Đưa banner trở lại vị trí ban đầu
          duration: 1000, // Thời gian di chuyển từ từ (1 giây)
          useNativeDriver: true,
        }),
      ]).start();

      // Cập nhật chỉ số banner sau khi hoàn thành animation
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % dataBanner.length);

    }, 3000); // Thời gian chuyển banner (3s)

    return () => clearInterval(bannerInterval); // Dọn dẹp khi component unmount
  }, [translateX]);


  const dataCate = [
    { id: 1, name: "chung", image: "link" },
    { id: 2, name: "name", image: "link" },
    { id: 3, name: "sssss", image: "link" },
  ];


  const dataBanner = [
    "https://imgur.com/k8U7USG.png",
    "https://www.arnavsoftech.com/assets/img/android-apps.jpg",
    "https://www.mindstask.com/en/wp-content/uploads/2022/03/android-app-half-banner.jpg",
  ];


  const renderItemProduct = ({ item }) => (
    <Pressable onPress={()=>{navigation.navigate("Product_Detail")}}
      style={{
        flexDirection: "row",
        borderRadius: 15,
        borderWidth: 1,
        width: 380,
        height: 100,
        marginBottom: 10,
        borderColor: "#D3D3D3",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 100,
          height: 95,
          marginRight: 10,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      />
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="star" color={"#FFD700"} size={20} />
          <FontAwesome name="star" color={"#FFD700"} size={20} />
          <FontAwesome name="star" color={"#FFD700"} size={20} />
          <FontAwesome name="star" color={"#FFD700"} size={20} />
          <FontAwesome name="star" color={"#FFD700"} size={20} />
        </View>
      </View>
      <View style={{ justifyContent: "center", flex: 0.5 }}>
        <Pressable onPress={() => navigation.navigate("Checkout_Cart")}>
          <FontAwesome name="plus-circle" size={30} color={'blue'} />
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {item.price}$
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaProvider>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable style={styles.headerButton} onPress={() =>{navigation.navigate("Login")}}>
              <AntDesign name="left" size={25} color={"grey"} />
            </Pressable>
            <Text style={styles.headerType}>Electronics</Text>
            <Pressable style={styles.headerButton}>
              <AntDesign name="shoppingcart" color={"grey"} size={30} />
            </Pressable>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
              }}
              style={{ width: 50, height: 50, flex: 1 }}
            />
          </View>

          <View style={styles.searchView}>
            <View style={styles.txtSearchView}>
              <FontAwesome
                name="search"
                size={20}
                color={"black"}
                style={{ marginLeft: 5, marginRight: 5 }}
              />
              <TextInput placeholder="Search here" style={{ flex: 1 }} />
            </View>
            <Pressable style={styles.listIcon}>
              <FontAwesome name="list-ul" size={30} />
            </Pressable>
          </View>
          <View style={styles.banner}>
            <Image
              style={styles.bannerImage}
              source={{ uri: dataBanner[currentBannerIndex] }}
   
            />
          </View>

          <View style={styles.filterView}>
            <Pressable style={styles.btnFilter}>
              <Text style={styles.txtBtnFilter}>Best Sales</Text>
            </Pressable>
            <Pressable style={styles.btnFilter}>
              <Text style={styles.txtBtnFilter}>Best Matched</Text>
            </Pressable>
            <Pressable style={styles.btnFilter}>
              <Text style={styles.txtBtnFilter}>Popular</Text>
            </Pressable>
          </View>

          <View style={styles.listProduct}>
            {dataProduct.slice(0, maxProduct).map((item, index) => (
              <View key={item.id || index}> 
                {renderItemProduct({ item })}
              </View>
            ))}
          </View>

          <Pressable style={styles.buttonSeeAll} onPress={() =>{setMaxProduct((preProduct) => preProduct+2)}}>
            <Text style={styles.txtBtnFilter}>SEE ALL</Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:'white'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "95%",
  },
  headerButton: {
    marginRight: 5,
  },
  headerType: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: "43%",
  },
  searchView: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtSearchView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#D3D3D3",
    flex: 1,
    height: 40,
  },
  listIcon: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    height: 40,
    borderColor: "#D3D3D3",
    backgroundColor: "#D3D3D3",
  },
  cateView: {
    width: "95%",
    marginTop: 15,
  },
  cateButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCate: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  filterView: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  btnFilter: {
    width: "30%",
    height: 30,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  txtBtnFilter: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  listProduct: {
    width: "95%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSeeAll: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    height: 40,
    borderRadius: 20,
    marginBottom: 15,
  },

  banner: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    alignItems:'center'
  },
  bannerImage: {
    height: 200,
    borderRadius: 20,
    width:'95%'
  },
});
