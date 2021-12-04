import * as React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { whileStatement } from '@babel/types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; //MUY IMPORTANTE


export default function ProjectsScreen() {
  const navegation=useNavigation();
  const logOut = async () =>{
    await AsyncStorage.removeItem('token');
    navegation.navigate("SignIn");
  }

  const [project, setProject]=useState([{
    id: '1',
    title: "Instalar Expo",
    createdAt: "2021-12-01"
  },{
    id: '1',
    title: "Diseñar Screens",
    createdAt: "2021-12-01"
  },{
    id: '1',
    title: "Auth",
    createdAt: "2021-12-02"
  },{
    id: '1',
    title: "Despliegue",
    createdAt: "2021-12-02"
  }])




  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTA DE TAREAS/PROYECTOS</Text>
      <FlatList
        data={project}
        renderItem={({item}) => <ProjectItem project={item} />}
        style={{ width: '100%' }}
      />
      <Pressable
      onPress={logOut}
      style={{
        backgroundColor:"#004080",
        height:50,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        marginTop:30,
        width:"20%",
        marginHorizontal:"5%"
      }}><Text
          style={{
            color:"white",
            fontSize:18,
            fontWeight:"bold"
          }}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    width:"80%",
    marginHorizontal:"10%"
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#404040',
    marginRight: 10,
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
  time: {
    color: 'darkgrey'
  }
});