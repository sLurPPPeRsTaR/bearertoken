import {View, Text, TextInput, Button, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
const base_URL = 'http://94.74.86.174:8080/api';

export const HomePage = ({route}) => {
  const [activities, setActivities] = useState([]);
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
        console.log(res.data.data);
        setActivities(res.data.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <View>
      <Text>Checklist</Text>
      <FlatList
        data={activities}
        key={items => items.id}
        render={({items}) => {
          return (
            <View>
              <Text>{items.daily}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
