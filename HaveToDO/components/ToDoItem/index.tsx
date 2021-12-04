import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import { useMutation, gql } from '@apollo/client';
import alert from '../Alert';

import Checkbox from '../Checkbox';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UPDATE_TODO = gql`
mutation updateToDo($id:ID!, $content: String, $isCompleted: Boolean) {
  updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
    id
		content
    isCompleted
    
    taskList {
      id
      title
      progress
      todos {
        id
        content
        isCompleted
      }
    }
  }
}
`;


const DELETE_TODO = gql`
mutation DeleteToDo($deleteToDoId: ID!) {
  deleteToDo(id: $deleteToDoId)
}
`;

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  },
}

const ToDoItem = ({ todo }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState('');
  const navigation=useNavigation();

  const [updateItem] = useMutation(UPDATE_TODO);
  const input = useRef(null);

  const [deleteToDo, {  error }] = useMutation(DELETE_TODO);
  if (error) {
    alert('Error eliminando ToDo, por favor intente de nuevo')
  }



  const removeToDo = () => {
    deleteToDo({
      variables: {
        id: todo.id,
      }
    })
  };


  const callUpdateItem = () => {
    updateItem({
      variables: {
        id: todo.id,
        content,
        isCompleted: !isChecked
      }
    })
  };



  useEffect(() => {
    if (!todo) { return }

    setIsChecked(todo.isCompleted);
    setContent(todo.content); 
  }, [todo])

  useEffect(() => {
    if (input.current) {
      (input.current as HTMLElement)?.focus();}
  }, [input])

 


  return (
    <><><View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
      {/* Checkbox */}
      <Checkbox
        isChecked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
          callUpdateItem();
        } } />

      {/* Text Input */}
      <TextInput
        ref={input}
        value={content}
        onChangeText={setContent}
        style={{
          flex: 1,
          fontSize: 18,
          color: 'white',
          marginLeft: 12,
        }}
        editable={false}
        multiline
        onEndEditing={callUpdateItem}
        blurOnSubmit />
    </View></><Pressable onPress={removeToDo}><FontAwesome name="remove" size={24} color="white" /></Pressable></>
  )
}

export default ToDoItem