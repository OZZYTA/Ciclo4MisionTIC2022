import React, {useState} from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { View } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';


let id: "4"

export default function ToDoScreen() {
  const [title, setTitle]=useState("")
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

  const createNewItem= (atIndex: number) =>{
    const newTodos=[...todos];
    newTodos.splice(atIndex,0,{
      id:id,
      content:"",
      isCompleted: false,
    })
    setTodos(newTodos)
  }


  return (
    <View style={styles.container}>
      <TextInput 
      value={title}
      onChangeText={setTitle} 
      style={styles.title}
      placeholder={"Titulo Aquí"}>       
      </TextInput>

      <FlatList
      data={todos}
      renderItem={({item, index})=> <ToDoItem todo={item} onSumbit={() =>createNewItem(index+1)} />}
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
    borderColor:"white",
    borderRadius:2,
    fontWeight: 'bold',
    textAlign:"center",
    padding: 5,
    color:"white",
    width:"80%",
    marginHorizontal:"10%",
    marginBottom:30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
