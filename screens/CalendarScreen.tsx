import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';


export default function CalendarScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bem Vindo ao GG-DE! O gerador de grades para desempenho educacional!</Text>
      </View>
        <Text style={styles.text} onPress={() => navigation.navigate('RegisterAvailabilityScreen')}>Cadastrar novo cronograma</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
  },
  titleContainer: {
    width: '80%',
    paddingVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16
  }
});
