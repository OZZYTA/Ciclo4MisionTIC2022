import React, {useState} from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';

export default function TabOneScreen() {
  const [value, setValue]=useState(false)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      <ToDoItem/>
      <ToDoItem/>
      <ToDoItem/>
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
