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
import {
  fetchProductsSelector,
  productDetailState,
  reviewsState,
  userNameByReview,
} from "../atoms/ProductList";
import HeaderAccount from "../components/HeaderAccount";
import SearchBar from "../components/SearchBar";

export default function Product_ListView({ navigation }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const translateX = useState(new Animated.Value(0))[0]; // Điều khiển di chuyển theo trục X
  const [maxProduct, setMaxProduct] = useState(4);

  const dataProduct = useRecoilValue(fetchProductsSelector);
  const [, setProductDetail] = useRecoilState(productDetailState);
  const userName = useRecoilValue(userNameByReview);


  const handleProductDetail = (item) => {
    setProductDetail(item);
    navigation.navigate("Product_Detail");
  };

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
          duration: 0, // Không cần thời gian cho bước này, chỉ thay đổi vị trí
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

  const dataBanner = [
    "https://imgur.com/k8U7USG.png",
    "https://www.arnavsoftech.com/assets/img/android-apps.jpg",
    "https://www.mindstask.com/en/wp-content/uploads/2022/03/android-app-half-banner.jpg",
  ];

  const renderItemProduct = ({ item }) => (
    <Pressable
      onPress={() => {
        handleProductDetail(item);
      }}
      style={{
        flexDirection: "row",
        borderRadius: 15,
        borderWidth: 1,
        width: "100%",
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
      <View style={{ justifyContent: "center", flex: 0.35 }}>
        <Pressable onPress={() => navigation.navigate("Checkout_Cart")}>
          <FontAwesome name="plus-circle" size={30} color={"blue"} />
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.price}$</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{width: '100%'}}>
      <View style={styles.header}>
        <HeaderAccount
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
      <SearchBar />
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
          <View key={item.id || index}>{renderItemProduct({ item })}</View>
        ))}
      </View>

      <Pressable
        style={styles.buttonSeeAll}
        onPress={() => {
          setMaxProduct((preProduct) => preProduct + 2);
        }}
      >
        <Text style={styles.txtBtnFilter}>SEE ALL</Text>
      </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 40,
  },
  header: {
    width: "95%",
    alignItems: "center",
    marginBottom: 10,
  },
  //================================

  //============================
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

  //=============================
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  filterView: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  btnFilter: {
    height: 30,
    width: "30%",
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
    width:'95%',
    alignItems: "center",
    marginTop: 15,
  },
  buttonSeeAll: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    height: 40,
    borderRadius: 20,
    marginBottom: 15,
  },

  banner: {
    marginTop: 20,
    alignItems: "center",
  },
  bannerImage: {
    height: 200,
    borderRadius: 20,
    width: "100%",
  },
});
