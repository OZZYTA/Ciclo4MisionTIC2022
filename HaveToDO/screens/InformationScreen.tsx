import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function InformationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información</Text>
      <Text>Somos el Grupo 16,17 y 18 del Ciclo 4A</Text>
      <Text>Programación web</Text>
      <Text>MisiónTIC 2022</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
