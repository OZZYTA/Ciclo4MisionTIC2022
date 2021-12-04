import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';

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

const SignInScreen =() => {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const navegation= useNavigation();

  const onSubmit = () =>{
//On submit
  }

 // const [singIn, {data, error, loading}]=useMutation(SIGN_IN_MUTATION)

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Inicio de Sesión</Text>

      <TextInput
      placeholder="Email Aqui!"
      value={email}
      onChangeText={setEmail}
      style={{
        color:"white",
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
  onPress={() => navegation.navigate("SignUp")}
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

export default SignInScreen;