import {View, Text, TextInput, Button, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

const base_URL = 'http://94.74.86.174:8080/api';

export const HomePage = ({route}) => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});

  const tokenAPI = route.params;
  const config = {
    headers: {Authorization: `Bearer ${tokenAPI}`},
  };
  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = () => {
    Axios.get(`${base_URL}/checklist`, config)
      .then(res => {
        // console.log(res.data.data);
        setActivities(res.data.data);
      })
      .catch(() => alert('No Internet Connection/Internet Connection Error!'));
  };

  const onChangeHandler = (key, value) => {
    setActivity({
      ...activity,
      [key]: value,
    });
  };

  const submitHandler = () => {
    Axios.post(`${base_URL}/checklist`, activity, config)
      .then(res => {
        console.log('success');
        setActivities([...activities, res]);
        getAPI();
        setActivity('');
      })
      .catch(err => console.log(err));
  };

  const delHandler = item => {
    Axios.delete(`${base_URL}/checklist/${item.id}`, config)
      .then(() => {
        console.log('success');
        getAPI();
      })
      .catch(err => console.log(err));
  };

  return (
    <View>
      <Text>Checklist</Text>
      <Text>your daily : </Text>
      <TextInput
        style={{borderWidth: 1}}
        onChangeText={value => {
          onChangeHandler('name', value);
        }}
      />
      <TextInput
        style={{borderWidth: 1}}
        onChangeText={value => {
          onChangeHandler('items', value);
        }}
      />
      <Button title="submit" onPress={submitHandler} />

      <FlatList
        data={activities}
        key={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={{flex: 1}}>{item.name}</Text>
              <Text>{item.items}</Text>
              <Button title="del" onPress={() => delHandler(item)} />
            </View>
          );
        }}
      />
    </View>
  );
};
