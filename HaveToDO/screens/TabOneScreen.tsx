import React, {useState} from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import Checkbox from '../components/checkbox';

export default function TabOneScreen() {
  const [value, setValue]=useState(false)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      <View style={{flexDirection:"row", alignItems:"center"}}>
    
      {/*Check box*/}
      <Checkbox isChecked={value} onPress={()=>{setValue(!value)}} />

      {/*Text Input*/}
      <TextInput
        style={{
          flex:1,
          fontSize:18,
          backgroundColor:"#282828",
          color:"white",
          marginLeft:12
        }}
        multiline
        placeholder="Tarea"
        underlineColorAndroid='transparent'
        numberOfLines={2}
      />
      
    </View>
     
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
