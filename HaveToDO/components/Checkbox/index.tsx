import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {useState} from "react";
import {View, Text, Pressable} from 'react-native';

interface CheckBoxProps{
    isChecked:boolean;
    onPress: ()=> void
}

const Checkbox = (props: CheckBoxProps)=>{
    const name=props.isChecked ? "checkbox-marked-outline" :"checkbox-blank-outline"
    const {onPress}=props;
    return(
        <Pressable onPress={onPress}>
            <MaterialCommunityIcons name={name} size={24} color="white" />
        </Pressable>
    )
}

export default Checkbox;