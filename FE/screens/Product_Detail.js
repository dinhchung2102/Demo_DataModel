import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextHeader from "../components/TextHeader";
import { FontAwesome } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { productDetailState } from "../atoms/ProductList";

export default function Product_Detail({ navigation }) {
  const product = useRecoilValue(productDetailState);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <SafeAreaView style={styles.contentContainer}>
            <TextHeader
              textHeader="Chi Tiet San Pham"
              onPress={() => {
                navigation.navigate("Product_ListView");
              }}
            />
            <View style={styles.product_View}>
              <Image
                source={{
                  uri: product.image,
                }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productTitle}>
                {product.name}
              </Text>
              <View style={styles.productInfo}>
                <Text style={styles.productPrice}>{product.price}$</Text>
                <Text style={styles.productSold}>Đã bán: 10</Text>
              </View>
              <View style={styles.desView}>
                <Text style={styles.productDescriptionTitle}>
                  Mô tả sản phẩm:
                </Text>
                <Text style={styles.productDescription}>
                 {product.description}
                </Text>
              </View>
            </View>
            <View style={styles.rateView}>


              <View style={{ borderTopWidth: 1, borderBottomWidth: 1 }}>

                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
                    }}
                    style={{ width: 50, height: 50 }}
                  />
                  <View style={{ marginTop: 3, marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold" }}>Username</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: 65,
                        justifyContent: "space-between",
                      }}
                    >
                      <FontAwesome name="star" color={"gold"} />
                      <FontAwesome name="star" color={"gold"} />
                      <FontAwesome name="star" color={"gold"} />
                      <FontAwesome name="star" color={"gold"} />
                      <FontAwesome name="star" color={"gold"} />
                    </View>
                  </View>
                  <View style={{marginTop: 3, flex: 1}}>
                    <Pressable
                      style={{ flexDirection: "row", alignItems: "center", flex:1, justifyContent:'flex-end', marginBottom: 20}}
                    >
                      <FontAwesome name="heart" style={{marginRight: 5}} />
                      <Text>Hữu ích (5)</Text>
                    </Pressable>
                  </View>
                </View>
                <Text>
                  Đây là một nhận xét mẫu về sản phẩm nè, không thể ngừng nói được ngày mai lên tuoioir mới tươi đẹp biết bao, nếu khkoonog nói trước làm sao biết được
                </Text>
              </View>

              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
                }}
                style={{ width: 50, height: 50 }}
              />
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
                }}
                style={{ width: 50, height: 50 }}
              />
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
                }}
                style={{ width: 50, height: 50 }}
              />
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
                }}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
        <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Checkout_Payment_Method");
            }}
          >
            <Text style={styles.textButton}>MUA NGAY</Text>
          </Pressable>
          <Pressable style={styles.addToCartButton}>
            <Text style={styles.textButton}>THÊM VÀO GIỎ</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: 0,
  },
  product_View: {
    width: "95%",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 400,
  },
  productTitle: {
    width: "100%",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 30,
    fontWeight: "bold",
  },
  productSold: {
    fontSize: 18,
  },
  desView: {
    width: "100%",
    marginTop: 20,
  },
  productDescriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderRadius: 15,
  },
  addToCartButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderRadius: 15,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  //================
  rateView: {
    width: "95%",
    marginBottom: 80,
    borderRadius: 15,
  },
});
