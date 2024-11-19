import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Product_ListView from "./screens/Product_ListView";
import Checkout_Payment_Success from "./screens/Checkout_Payment_Success";
import { RecoilRoot } from "recoil";
import Checkout_Payment_Method from "./screens/Checkout_Payment_Method";
import Checkout_Cart from "./screens/Checkout_Cart";
import CustomerList from "./screens/CustomerList";
import Login from "./screens/Login";
import Product_Detail from "./screens/Product_Detail";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <RecoilRoot>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          initialRouteName="Register"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Product_ListView" component={Product_ListView} />
          <Stack.Screen name="Checkout_Payment_Success" component={Checkout_Payment_Success}/>
          <Stack.Screen name="Checkout_Payment_Method" component={Checkout_Payment_Method}/>
          <Stack.Screen name="Checkout_Cart" component={Checkout_Cart}/>
          <Stack.Screen name="CustomerList" component={CustomerList}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Product_Detail" component={Product_Detail}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
