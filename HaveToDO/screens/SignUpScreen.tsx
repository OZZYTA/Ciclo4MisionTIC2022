import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Picker, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SIGN_UP_MUTATION= gql`
mutation singUp($mail: String!,
  $identificacion: String!,
  $nombre: String!,
  $password: String!,
  $rol: String!){
    signUp( input: {
mail:$mail,
password:$password,
nombre:$nombre,
identificacion:$identificacion,
rol:$rol
}) {
token
user {
  id
  nombre
}
}
}
`;

const SignUpScreen =() => {
  const [mail, setMail]=useState("")
  const [nombre, setNombre]=useState("")
  const [identificacion, setIdentificacion]=useState("")
  const [password, setPassword]=useState("")
  const [rol, setRol] = useState("");
  const navegation= useNavigation();

  // mutation[0] : A function to trigger the mutation
  // mutation[1] : result object 
  //    { data,error, loading }
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);
  if (error) {
    Alert.alert('Error registrandose, por favor intente de nuevo')
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

  if (data) {
    AsyncStorage.setItem('token', data.signUp.token)
      .then(() => {
        navegation.navigate("Home");
      })
  }

  const onSubmit = () =>{
    signUp({variables: {mail,identificacion, nombre,password,rol}})
  }
 

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Registro en HaveToDO</Text>
      
    <TextInput
    placeholder="Nombre Completo"
    value={nombre}
    onChangeText={setNombre}
    style={{
      color:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />

<TextInput
    placeholder="Identificacion"
    value={identificacion}
    onChangeText={setIdentificacion}
    style={{
      color:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />


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

<Picker
        selectedValue={rol}
        style={{
          color:"black",
          fontSize:18,
          marginVertical:25,
          width:'50%',
          marginHorizontal:"25%"
        }}
        onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
      >
        <Picker.Item label="Estudiante" value="Estudiante" />
        <Picker.Item label="Administrador" value="Administrador" />
        <Picker.Item label="Lider" value="Lider"/>
        
      </Picker>

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
        Registrarse
        </Text>
  </Pressable>

  <Pressable
  onPress={() => navegation.navigate("SignIn")}
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
          Ya tienes cuenta? Inicia Sesión Aquí
        </Text>

    </Pressable>

    </View>
  );

  
}

export default SignUpScreen