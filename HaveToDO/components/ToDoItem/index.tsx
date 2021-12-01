import React, { useState } from "react";
import {View, Text, TextInput} from "react-native";
import Checkbox from "../checkbox";

const ToDoItem = () => {
    const [isChecked, setIsChecked]=useState(false)
    return(
        <View style={{flexDirection:"row", alignItems:"center"}}>
    
      {/*Check box*/}
      <Checkbox isChecked={isChecked} onPress={()=>{setIsChecked(!isChecked)}} />

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
    )
}
export default ToDoItem