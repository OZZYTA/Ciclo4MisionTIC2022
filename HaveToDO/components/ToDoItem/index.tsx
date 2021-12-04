import React, { useState, useEffect , useRef} from "react";
import {View, TextInput} from "react-native";
import alert from "../Alert";
import Checkbox from "../Checkbox";

interface ToDoItemProps{
  todo:{
  id:string,
  content:string,
  isCompleted:boolean,
  },
  onSumbit: () => void
}

const ToDoItem = ({todo, onSumbit}:ToDoItemProps) => {
const [isChecked, setIsChecked]=useState(false)
const [content,setContent]=useState("")
const  input=useRef(null)


const onKeyPress = ({ nativeEvent })=>{
  if (nativeEvent.key == "Backspace" && content==""){
    alert(
      "Tarea Eliminada"
    );

    //Backend
  }

}

    useEffect(() => {
      if (!todo){return}
      setIsChecked(todo.isCompleted)
      setContent(todo.content)
    },[todo])


    useEffect(() => {
     if(input.current){
      (input.current as HTMLElement)?.focus();}
    },[input])


    return(
        <View style={{flexDirection:"row", alignItems:"center", marginVertical:5}}>
    
      {/*Check box*/}
      <Checkbox isChecked={isChecked} onPress={()=>{setIsChecked(!isChecked)}} />

      {/*Text Input*/}
      <TextInput
      ref={input}
      value={content}
      onChangeText={setContent}
      style={{
        height:50,
        flex:1,
        fontSize:18,
        backgroundColor:"#2B4055",
        color:"white",
        marginLeft:12,
        
      }}
        placeholder="Tarea"
        underlineColorAndroid='transparent'
        onSubmitEditing={onSumbit}
        blurOnSubmit
        onKeyPress={onKeyPress}
        numberOfLines={2}
      />
      </View>
    )
}
export default ToDoItem

function extra(arg0: string, arg1: string, extra: any, arg3: boolean) {
  throw new Error("Function not implemented.");
}
