import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { Text, View } from '../components/Themed';
import { useState } from 'react';

export default function ProjectsScreen() {
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