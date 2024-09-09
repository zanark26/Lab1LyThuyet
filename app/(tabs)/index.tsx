import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions(); // Sử dụng useWindowDimensions để lấy kích thước màn hình
  const isPortrait = height > width;

  const imageWidth = isPortrait ? width * 0.6 : width * 0.4; // Giảm thêm kích thước hình ảnh khi xoay ngang
  const imageHeight = isPortrait ? imageWidth * 0.75 : imageWidth * 0.5;

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
          <View style={{ ...styles.button, width: isPortrait ? width * 0.8 : width * 0.3 }}>
            <Button title="Button 1" onPress={() => {}} />
          </View>
          <View style={{ ...styles.button, width: isPortrait ? width * 0.8 : width * 0.3 }}>
            <Button title="Button 2" onPress={() => {}} />
          </View>
        </View>

        {/* Trường nhập liệu */}
        <TextInput
          style={[
            styles.input,
            { width: isPortrait ? '80%' : '60%' } // Giảm kích thước input khi ở chế độ ngang
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
