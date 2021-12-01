import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

/*import {useMutation, gql} from '@apollo/cliente',
const SIGN_IN_MUTATION= gql`
mutation SignIn($email:String!, $password:String!){
  signUp(input:{email:$email, password:$password}){
    token
    user{
      id
      nombre
      email
    }
  }
}
*/

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const navegation= useNavigation();

 // const [singIn, {data, error, loading}]=useMutation(SIGN_IN_MUTATION)

  return (
    <View style={{padding:20}}>
      {/*<Text>Lista de Tareas</Text>*/}
      <TextInput
      placeholder="Email Aqui!"
      value={email}
      onChangeText={setEmail}
      style={{
        color:"black",
        fontSize:18,
        marginVertical:25,
        width:'50%',
        marginHorizontal:"25%"
      }}
    
    />

    <TextInput
    placeholder="Contraseña"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    style={{
      color:"black",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />

<Pressable
//onPress={() =>  {console.warn('navigate'); navegation.navigate('SignUp')}}
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
    <Text
      style={{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
      }} >
        Iniciar Sesión
        </Text>
  </Pressable>

  <Pressable
    style={{
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:30,
      width:'50%',
      marginHorizontal:"25%",
    }}>
        <Text
        style={{
          color:"#004080",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Nuevo? Registrese aquí!
        </Text>

    </Pressable>
    </View>
  );

  
}

//export default TabOneScreen