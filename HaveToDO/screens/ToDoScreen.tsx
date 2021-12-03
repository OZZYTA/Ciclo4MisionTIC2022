import React, {useState} from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { View, Text } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


let id: "4"

export default function ToDoScreen() {
  const navegation= useNavigation();
  const logOut = async () => {
    await AsyncStorage.getItem('token');
    navegation.navigate("SignIn")
  }

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
    <><View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.title}
        placeholder={"Titulo Aquí"}>
      </TextInput>

      <FlatList
        data={todos}
        renderItem={({ item, index }) => <ToDoItem todo={item} onSumbit={() => createNewItem(index + 1)} />}
        style={{
          width: "100%"
        }} />
    </View>
    <View>
    <Pressable
      onPress={logOut} 
      style={{
        backgroundColor:'#004080',
        height:50,
        borderRadius:5,
        alignItems:'center',
        justifyContent:"center",
        marginTop:30,
        width:'10%',
        marginHorizontal:"5%",
      }}>  
      <Text
        style={{
          color:"white",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Cerrar Sesión
        </Text>
      </Pressable>

      </View></>
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
