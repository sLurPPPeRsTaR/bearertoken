import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import Axios from 'axios';

const base_URL = 'http://94.74.86.174:8080/api';

export const RegisterPage = ({navigation}) => {
  const [dataUser, setDataUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handlerChangeText = (key, value) => {
    setDataUser({
      ...dataUser,
      [key]: value,
    });
  };

  const registerHandler = () => {
    console.log(dataUser);
    Axios.post(`${base_URL}/register`, dataUser)
      .then(() => {
        alert('success');
        navigation.replace('Login_Screen');
      })
      .catch(() => alert('Username/Email Sudah terdaftar !'));
  };

  return (
    <View>
      <Text>UserName</Text>
      <TextInput onChangeText={value => handlerChangeText('username', value)} />
      <Text>Email</Text>
      <TextInput onChangeText={value => handlerChangeText('email', value)} />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={value => handlerChangeText('password', value)}
      />
      <Button title="register" onPress={registerHandler} />
    </View>
  );
};
