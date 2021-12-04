import React, {useEffect, useState} from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { View, Text } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';

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


export default function ToDoScreen() {
  const navegation=useNavigation();
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navegation.navigate("SignIn")
  }
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');

  const route = useRoute();
  const id = route.params.id;

  const {data, error, loading} = useQuery(GET_PROJECT, { variables: { id }})
  const idTodo =()=>data.id;
  const [
    createTodo, { data: createTodoData, error: createTodoError }
  ] = useMutation(CREATE_TODO, { refetchQueries: GET_PROJECT });

  useEffect(() => {
    if (error) {
      console.log(error);
      alert('Error fetching project');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
    }
  }, [data]);

  if (!project) {
    return null;
  }

  const NewToDo = () => {
    navegation.navigate("NewToDo", { id:project.id });
  }



  return (
    <><View style={styles.container}>
      <Pressable
      onPress={logOut} 
      style={{
        backgroundColor:'#004080',
        height:50,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:"85%",
        width:'15%',
        position:"absolute"

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
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.title}
        placeholder={"Titulo Aquí"}>
      </TextInput>

      <FlatList
      
        data={project.todos}
        renderItem={({ item, index }) => <ToDoItem todo={item}/>}
        style={{
          width: "100%"
        }} />
    </View>
    <View>
    <Pressable onPress={NewToDo}
    style={{
      marginHorizontal:"25%"
    }}><AntDesign name="addfile" size={24} color="white"/></Pressable>

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
