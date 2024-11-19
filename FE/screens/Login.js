import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import Button_Fonawesome from "../components/Button_Fonawesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
    const [isShow, setIsShow] = useState(true);
    const [icon, setIcon] = useState('eye-slash');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleHidePassword = () => {
        setIsShow(!isShow);
        if (isShow === true)
            setIcon('eye');
        else
            setIcon('eye-slash');
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.100.70:5000/api/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: username,
                    password: password,
                }),
            });

            const result = await response.json();

            // Kiểm tra nếu đăng nhập thành công
            if (result.token) {
                // Lưu token vào AsyncStorage
                await AsyncStorage.setItem('userToken', result.token);
                // Chuyển hướng đến màn hình chính
                alert('Login successful!');
                // Bạn có thể điều hướng tới màn hình Home hoặc bất kỳ màn hình nào sau khi đăng nhập thành công
                navigation.replace('Product_ListView');  // Ví dụ: navigation.replace('Home');
            } else {
                alert(result.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>DEMO</Text>
                    <View style={{ marginBottom: 20, alignItems: "center" }}>
                        <Image
                            source={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/0/00/Mongodb.png",
                            }}
                            style={{ width: 300, height: 100 }}
                        />
                        <Text style={{ fontSize: 20, color: "green" }}>DATA MODEL</Text>
                    </View>

                    <Text style={styles.textTitle}>
                        HỆ THỐNG TÌM KIẾM VÀ ĐỀ XUẤT SẢN PHẨM
                    </Text>
                    <Text style={styles.textTitle}>DỰA TRÊN</Text>
                    <Text style={styles.textTitle}>
                        DỮ LIỆU LỊCH SỬ MUA HÀNG & HÀNH VI NGƯỜI DÙNG
                    </Text>
                </View>
                <View style={styles.loginView}>
                    <View style={styles.viewUser}>
                        <TextInput
                            placeholder="enter your username"
                            style={{ marginLeft: 10, fontSize: 20, flex: 1 }}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <FontAwesome
                            name="user"
                            color={"green"}
                            size={30}
                            style={{ marginRight: 10 }}
                        />
                    </View>
                    <View style={styles.viewUser}>
                        <TextInput
                            placeholder="enter your password"
                            style={{ marginLeft: 10, fontSize: 20, flex: 1 }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={isShow}
                        />
                        <Pressable onPress={handleHidePassword}>
                            <FontAwesome
                                name={icon}
                                color={"green"}
                                size={30}
                                style={{ marginRight: 10 }}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.viewButton}>
                    <Button_Fonawesome name="LOGIN" nameIcon="" color="green" onPress={handleLogin} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    header: {
        paddingTop: 40,
        alignItems: "center",
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    loginView: {
        width: "95%",
        marginTop: 40,
    },
    viewUser: {
        borderWidth: 1,
        flexDirection: "row",
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    viewButton: {
        width: "95%",
        borderRadius: 30,
        overflow: "hidden",
    },
});
