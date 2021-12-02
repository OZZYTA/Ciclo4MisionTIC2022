import React, { useState, useEffect } from "react";
import {View, Text, TextInput, Alert, Pressable} from "react-native";
import Checkbox from "../checkbox";

interface ToDoItemProps{
  todo:{
  id:string,
  content:string,
  isCompleted:boolean,
  }
}

const ToDoItem = ({todo}:ToDoItemProps) => {
    const [isChecked, setIsChecked]=useState(false)
    const [content,setContent]=useState("")

    useEffect(() => {
      if (!todo){return}

      setIsChecked(todo.isCompleted)
      setContent(todo.content)
    },[todo])

    return(
        <View style={{flexDirection:"row", alignItems:"center", marginVertical:5}}>
    
      {/*Check box*/}
      <Checkbox isChecked={isChecked} onPress={()=>{setIsChecked(!isChecked)}} />

      {/*Text Input*/}
      <TextInput
      value={content}
      onChangeText={setContent}
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
        //numberOfLines={2}
      />



      </View>
    )
}
export default ToDoItem