import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TextButton } from '../components/StyledButton';
import Colors from '../constants/Colors';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Ionicons style={styles.cardIcon} size={30} name="notifications" color={Colors.primary}/>
          <Text style={styles.cardText}>Notificações</Text>
        </View>
        <View style={styles.card}>
          <Ionicons style={styles.cardIcon} size={30} name="logo-google" color={Colors.primary}/>
          <Text style={styles.cardText}>Sincronizar com o Google Sala de Aula</Text>
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <TextButton text="Sair" backgroundColor={Colors.danger} onPress={() => navigation.navigate('Login')}></TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardsContainer: {
    padding: '10%',
    width: '100%'
  },
  card: {
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 10
  },
  cardIcon: {
    width: '10%',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingLeft: 15,
    width: '90%',
    textAlign: 'left'
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 40,
    width: '40%',
  },
});
