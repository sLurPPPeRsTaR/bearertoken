import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import Axios from 'axios';
const base_URL = 'http://94.74.86.174:8080/api';

export const LoginPage = ({navigation}) => {
  const [dataLoginUser, setDataLoginUser] = useState({
    username: '',
    password: '',
  });

  const loginHandler = () => {
    console.log(dataLoginUser);
    Axios.post(`${base_URL}/login`, dataLoginUser)
      .then(res => {
        console.log('success');
        const token = res.data.data.token;
        navigation.replace('Home_Screen', token);
      })
      .catch(() => alert('Username/Password salah !'));
  };

  const handlerChangeText = (key, value) => {
    setDataLoginUser({
      ...dataLoginUser,
      [key]: value,
    });
  };

  return (
    <View>
      <Text>UserName</Text>
      <TextInput onChangeText={value => handlerChangeText('username', value)} />
      <Text>Password</Text>
      <TextInput onChangeText={value => handlerChangeText('password', value)} />
      <Button title="login" onPress={loginHandler} />
      <Button
        title="register"
        onPress={() => navigation.navigate('Register_Screen')}
      />
    </View>
  );
};
