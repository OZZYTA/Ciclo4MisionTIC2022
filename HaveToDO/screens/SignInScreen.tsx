import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGN_IN_MUTATION = gql`
mutation singIn($mail:String!,$password:String!){
  signIn(input: {
    mail:$mail,
    password:$password,
  }) {
    token
    user {
      id
      nombre
    }
  }
  }
`;

const SignInScreen =() => {
  const [mail, setMail]=useState("")
  const [password, setPassword]=useState("")
  const navegation= useNavigation();

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if (error) {
      alert("Credeciales equivocadas, por favor intente de nuevo")
    }
  }, [error])

  if (data) {
    AsyncStorage.setItem('token', data.signIn.token)
      .then(() => {
        navegation.navigate("Home")
      })
  }

  const onSubmit = () => {
    signIn({ variables: { mail, password }})
  }

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Inicio de Sesión</Text>
      <TextInput
      placeholder="Email Aqui!"
      value={mail}
      onChangeText={setMail}
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
      {loading && <ActivityIndicator />}
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