import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Picker, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation, gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alert from '../components/Alert';
import { useNavigation, useRoute } from '@react-navigation/native';

const GET_PROJECT = gql`
query getTaslist($id:ID!) {
  getTaskList(id:$id) {
    id
    title
    createdAt
    todos {
      id
      content
      isCompleted
    }
  }
}
`

const CREATE_TODO = gql`
mutation createToDo($content:String!, $taskListId: ID!) {
  createToDo(content: $content, taskListId: $taskListId) {
    id
		content
    isCompleted
    
    taskList {
      id
      progress
      todos {
        id
        content
        isCompleted
      }
    }
  }
}
`

const newToDoScreen =() => {
  const navigate=useNavigation()
  const [content, setContent]=useState("")
  const route=useRoute();
  const id = route.params.id;

  const {
    data, error, loading
  } = useQuery(GET_PROJECT, { variables: { id }})

  const [
    createTodo, { data: createTodoData, error: createTodoError }
  ] = useMutation(CREATE_TODO, { refetchQueries: GET_PROJECT });
  
  const createNewItem = () => {
    createTodo({
      variables: {
        content: content,
        taskListId: id,
      }
    })
  alert("ToDo registrado correctamente")
  navigate.navigate("ToDoScreen",{id:id})
  }

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Registro de Nuevo ToDo (Avance) HaveToDO</Text>
      
    <TextInput
    placeholder="Nombre del To Do"
    value={content}
    onChangeText={setContent}
    style={{
      color:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />



<Pressable
onPress={() => createNewItem()} 
  style={{
    backgroundColor:'#004080',
    height:50,
    borderRadius:5,
    alignItems:'center',
    justifyContent:"center",
    marginTop:30,
    width:'50%',
    marginHorizontal:"25%",
  }}
  >
    {loading && <ActivityIndicator />}
    <Text
      style={{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
      }} >
        Crear ToDo
        </Text>
  </Pressable>
    </View>
  );

  
}

export default newToDoScreen