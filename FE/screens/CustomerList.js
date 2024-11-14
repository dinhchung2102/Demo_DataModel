import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const CustomerList = () => {
  // State để lưu danh sách khách hàng và trạng thái loading
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm fetch dữ liệu từ API
    const fetchCustomers = async () => {
      try {
        // Gửi yêu cầu GET đến API
        const response = await fetch('http://172.20.121.230:5000/api/customers/names');
        // Kiểm tra nếu có lỗi trong phản hồi (response status khác 200)
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        // Chuyển đổi dữ liệu từ JSON
        const data = await response.json();
        // Cập nhật state với dữ liệu khách hàng
        setCustomers(data);
      } catch (err) {
        // Nếu có lỗi, cập nhật state với thông báo lỗi
        setError(err.message);
      } finally {
        // Đặt trạng thái loading là false khi hoàn thành
        setLoading(false);
      }
    };

    // Gọi hàm fetchCustomers
    fetchCustomers();
  }, []);  // [] để chỉ gọi một lần khi component được mount

  // Nếu đang tải dữ liệu, hiển thị loading spinner
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // Nếu có dữ liệu, hiển thị danh sách khách hàng
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={customers.slice(0,10)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerList;
