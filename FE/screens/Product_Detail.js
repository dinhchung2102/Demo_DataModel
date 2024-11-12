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
  
  export default function Product_Detail({ navigation }) {
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
                    uri: "https://salt.tikicdn.com/cache/750x750/ts/product/bc/18/91/e1e87b1caaf38e4e3e44ed448cac6305.jpg.webp",
                  }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <Text style={styles.productTitle}>
                  O DAY GHI TEN SAN PHAM, CHUA SU DUNG DATA
                </Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productPrice}>550.000 Đ</Text>
                  <Text style={styles.productSold}>Đã bán: 10</Text>
                </View>
                <View style={styles.desView}>
                  <Text style={styles.productDescriptionTitle}>Mô tả sản phẩm:</Text>
                  <Text style={styles.productDescription}>
                    KKKKKKKKKKKASDFaewfahnwfoaewijfawioawfajdfos;ịailoaewijloawhfrioaewhfriloaeqwfhlaiowf
                    alisjufailsehfailwfh alksjbf aklsbfj aliswbfhjrualwfiugalwefhiru
                    akuwhjlaiuwrhfailrwgua;rwoar;eioha;orw4a;ghio
                    KKKKKKKKKKKASDFaewfahnwfoaewijfawioawfajdfos;ịailoaewijloawhfrioaewhfriloaeqwfhlaiowf
                    alisjufailsehfailwfh alksjbf aklsbfj aliswbfhjrualwfiugalwefhiru
                   akuwhjlaiuwrhfailrwgua;rwoar;eioha;orw4a;ghio
                    end
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
          <View style={styles.buttonView}>
            <Pressable style={styles.button}>
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
      marginBottom: 120,
    },
    productImage: {
      width: "100%",
      height: 400,
    },
    productTitle: {
      fontSize: 23,
      fontWeight: "bold",
      marginTop: 20,
      textAlign: "center",
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
      paddingBottom: 20,
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
  });
  