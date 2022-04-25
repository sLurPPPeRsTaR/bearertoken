import {View, Text, TextInput, Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const base_URL = 'http://94.74.86.174:8080/api';

export const DetailPage = ({route}) => {
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [activitiesDetail, setActivitiesDetail] = useState({});

  const tokenAPI = route.params.tokenAPI;
  const config = {
    headers: {Authorization: `Bearer ${tokenAPI}`},
  };

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = () => {
    Axios.get(`${base_URL}/checklist/${route.params.id}/item`, config)
      .then(res => {
        setActivitiesDetails(res.data.data);
      })
      .catch(() => {
        alert('No Internet Connection/Internet Connection Error!');
      });
  };

  const onChangeHandler = (key, value) => {
    setActivitiesDetail({
      ...activitiesDetail,
      [key]: value,
    });
  };

  const submitHandler = () => {
    console.log(activitiesDetail);
    // Axios.post(`${base_URL}/checklist`, activitiesDetail, config)
    //   .then(res => {
    //     console.log('success');
    //     setActivities([...activities, res]);
    //     getAPI();
    //     setActivity('');
    //   })
    //   .catch(err => console.log(err));
  };

  return (
    <View style={{padding: 30}}>
      <Text>Detail Checklist</Text>
      <TextInput
        style={{borderWidth: 1}}
        value={activitiesDetail.name}
        onChangeText={value => {
          onChangeHandler('itemName', value);
        }}
      />
      <View style={{height: 25}} />
      <Button title="submit" onPress={submitHandler} />
      <View style={{height: 25}} />

      <FlatList
        data={activitiesDetails}
        key={item => item.id}
        renderItem={({item}) => {
          const id = item.id;
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={{flex: 1}}>{item.name}</Text>
              <Text>{item.items}</Text>
              <Button title="edit" />
              <View style={{marginHorizontal: 10}} />
              <Button title="del" />
            </View>
          );
        }}
      />
    </View>
  );
};
