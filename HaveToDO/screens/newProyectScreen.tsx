import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Picker, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alert from '../components/Alert';


const NEW_TASK_CREATION= gql`
mutation  createTaskList($title:String!){
  createTaskList(title:$title){
    id,
    createdAt,
    progress
    title
    users {
      id
      nombre
    }
  }
 }
`;

const NewProyectScreen =() => {
  const [title, setTitle]=useState("")

  const navegation= useNavigation();

  // mutation[0] : A function to trigger the mutation
  // mutation[1] : result object 
  //    { data,error, loading }
  const [newTask, { data, error, loading }] = useMutation(NEW_TASK_CREATION);
  if (error) {
    Alert.alert('Error registrando tarea, por favor intente de nuevo')
  }

  {/*if (data){
    AsyncStorage.setItem("token",data.signUp.token)
    .then(()=>{
      AsyncStorage.setItem("rol",data.signUp.rol)
      if (data.signUp.rol=="Estudiante"){
        navegation.navigate("Home")
      }
    })
  }*/}
  const reload = ()=>{
    window.location.reload();
  }

  if (data) {
        alert("Tarea creada Correctamente")
        navegation.navigate("Projects");
        reload()
  }


  const onSubmit = () =>{
    newTask({variables: {title}})
  }
 

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Registro de Nueva tarea en HaveToDO</Text>
      
    <TextInput
    placeholder="Titulo de la Tarea"
    value={title}
    onChangeText={setTitle}
    style={{
      color:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />



<Pressable
onPress={onSubmit} 
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
        Crear Tarea
        </Text>
  </Pressable>
    </View>
  );

  
}

export default NewProyectScreen