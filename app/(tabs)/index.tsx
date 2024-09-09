import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

const App = () => {
  const [isPortrait, setIsPortrait] = useState(true);

  // Hàm cập nhật hướng màn hình
  const updateLayout = () => {
    const { width, height } = Dimensions.get('window');
    setIsPortrait(height > width); // Xác định hướng màn hình
  };

  useEffect(() => {
    // Gọi updateLayout lần đầu để thiết lập trạng thái ban đầu
    updateLayout();

    // Lắng nghe sự thay đổi kích thước màn hình
    const subscription = Dimensions.addEventListener('change', updateLayout);

    // Dọn dẹp sự kiện lắng nghe khi component bị hủy
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, []);

  const screenWidth = Dimensions.get('window').width; // Lấy chiều rộng màn hình
  const imageWidth = isPortrait ? screenWidth * 0.6 : screenWidth * 0.4; // Điều chỉnh kích thước hình ảnh
  const imageHeight = isPortrait ? imageWidth * 0.75 : imageWidth * 0.5; // Điều chỉnh chiều cao hình ảnh theo hướng

  // Tùy chỉnh StatusBar dựa trên hướng màn hình và nền tảng
  const statusBarStyle = Platform.OS === 'ios'
    ? (isPortrait ? 'dark-content' : 'light-content')
    : 'light-content'; // Android luôn có kiểu chữ sáng
  const statusBarBackgroundColor = isPortrait ? '#fff' : '#000';

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Hình ảnh với kích thước động */}
        <Image
          source={{ uri: 'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/456861679_1629607530945858_5928256400793482459_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=rH-H6aPG0qUQ7kNvgGvQWwB&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=As57INfrSELc5iYN6qoJl19&oh=00_AYCjTE3ln5M_ngoxbJN2H9b8adfI8psyE5qYR41H8nqpIA&oe=66E46C7C' }}
          style={{ width: imageWidth, height: imageHeight }}
        />

        {/* Hai nút bấm với độ rộng động */}
        <View
          style={[
            styles.buttonContainer,
            { flexDirection: isPortrait ? 'column' : 'row' },
          ]}
        >
          <View style={{ ...styles.button, width: isPortrait ? screenWidth * 0.8 : screenWidth * 0.4 }}>
            <Button title="Button 1" onPress={() => {}} />
          </View>
          <View style={{ ...styles.button, width: isPortrait ? screenWidth * 0.8 : screenWidth * 0.4 }}>
            <Button title="Button 2" onPress={() => {}} />
          </View>
        </View>

        {/* Trường nhập liệu */}
        <TextInput
          style={[
            styles.input,
            { width: isPortrait ? '80%' : '60%' } // Điều chỉnh kích thước input khi ở chế độ ngang
          ]}
          placeholder="Nhập văn bản"
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({
      ios: 20,
      android: 10,
    }),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    margin: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#ffffff', // Đặt màu nền của trường nhập liệu
    color: '#000000', // Đặt màu chữ cho trường nhập liệu
  },
});

export default App;
