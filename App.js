import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

export default function App() {
  const [user, setUser] = useState([]);

  const showAlert = (firstName, lastName) => {
    Alert.alert(
      'Kişi',
      `${firstName} ${lastName}`, // Mesajı birleştirerek göster
      [
        { text: 'Tamam', onPress: () => console.log('Tamam pressed') }
      ],
      { cancelable: true }
    );
  };
  

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=2").then(res => setUser(res.data.data))
  }, []);

  return (
    <View className="flex-1 items-center justify-center ">
      
      {user.map((value, index) => (
        <TouchableOpacity onPress={() => showAlert(value.first_name, value.last_name)} key={index}>
          <View className="border flex flex-row w-64 text-center items-center p-2 m-3" key={index}>
            <Image
              className="rounded-full w-8 h-8 mr-2"
              source={{ uri: value.avatar }}
            />
            <Text className="font-medium ">{value.first_name} {value.last_name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      
      <StatusBar style="auto" />
    </View>
  );
}
