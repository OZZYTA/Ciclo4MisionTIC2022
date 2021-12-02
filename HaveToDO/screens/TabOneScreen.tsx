import React, {useState} from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';

export default function TabOneScreen() {
  const [todos, setTodos]=useState([{
    id: '1',
    content: "Instalar Expo",
    isCompleted: true
  },{
    id: '1',
    content: "Hacer Screens",
    isCompleted: true
  },{
    id: '1',
    content: "Consumir nuestro API",
    isCompleted: false
  },{
    id: '1',
    content: "Desplegar nuestro sitio",
    isCompleted: false
  }])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Avances</Text>

      <FlatList
      data={todos}
      renderItem={({item})=> <ToDoItem todo={item} />}
      style={{
        width:"100%"
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width:"80%",
    marginHorizontal:"10%"
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    padding: 5,
    width:"50%",
    marginHorizontal:"40%"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
