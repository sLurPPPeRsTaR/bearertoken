import {View, Text, TextInput, Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const base_URL = 'http://94.74.86.174:8080/api';

export const DetailPage = ({route}) => {
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [activitiesDetail, setActivitiesDetail] = useState({});
  const [edit, setEdit] = useState({});

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

  const completeHandler = item => {
    Axios.put(
      `${base_URL}/checklist/${route.params.id}/item/${item.id}`,
      activitiesDetail,
      config,
    ).then(() => {
      getAPI();
    });
  };

  const submitHandler = () => {
    if (edit.id) {
      Axios.put(
        `${base_URL}/checklist/${route.params.id}/item/${activitiesDetail.id}`,
        activitiesDetail,
        config,
      )
        .then(res => {
          console.log('success', res);
          // setActivitiesDetails([...activitiesDetails, res]);
          // getAPI();
          // setEdit('');
          // setActivitiesDetail('');
        })
        .catch(err => console.log(err));
      return;
    }

    Axios.post(
      `${base_URL}/checklist/${route.params.id}/item`,
      activitiesDetail,
      config,
    )
      .then(res => {
        setActivitiesDetails([...activitiesDetails, res]);
        getAPI();
        setActivitiesDetail('');
      })
      .catch(err => console.log(err));
  };

  const delHandler = item => {
    Axios.delete(
      `${base_URL}/checklist/${route.params.id}/item/${item.id}`,
      config,
    )
      .then(() => {
        console.log('success');
        getAPI();
      })
      .catch(err => console.log(err));
  };

  const editHandler = item => {
    setActivitiesDetail({
      itemName: item.name,
    });
    setEdit(item);
  };

  return (
    <View style={{padding: 30, flex: 1}}>
      <Text>Detail Checklist</Text>
      <TextInput
        style={{borderWidth: 1}}
        value={activitiesDetail.itemName}
        onChangeText={value => {
          onChangeHandler('itemName', value);
        }}
      />
      <View style={{height: 25}} />
      <Button title="submit" onPress={submitHandler} />
      <View style={{height: 25}} />

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={activitiesDetails}
        key={item => item.id}
        renderItem={({item}) => {
          console.log(item);
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={{flex: 1}}>
                {item.itemCompletionStatus === true ? (
                  <Text>COMPLETED</Text>
                ) : (
                  item.name
                )}
              </Text>
              <Button title="Complete" onPress={() => completeHandler(item)} />
              <View style={{marginHorizontal: 10}} />
              {!item.itemCompletionStatus && (
                <Button title="edit" onPress={() => editHandler(item)} />
              )}
              <View style={{marginHorizontal: 10}} />
              <Button title="del" onPress={() => delHandler(item)} />
            </View>
          );
        }}
      />
    </View>
  );
};
