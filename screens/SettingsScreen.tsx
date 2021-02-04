import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";

import { Text, View } from '../components/Themed';
import { TextButton } from '../components/StyledButton';
import Colors from '../constants/Colors';


export default function SettingsScreen() {
  const navigation = useNavigation();
  const [googleAccessToken, setGoogleAccessToken] = React.useState('');

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login')
  };

  React.useEffect(() => {
    const getGoogleToken = async () => {
      const googleDataString = await AsyncStorage.getItem('googleData');
      if (googleDataString) {
        const googleData = JSON.parse(googleDataString);
        setGoogleAccessToken(googleData.accessToken)
      }
    };
    getGoogleToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Ionicons style={styles.cardIcon} size={30} name="notifications" color={Colors.primary}/>
          <Text style={styles.cardText}>Notificações</Text>
        </View>
        {
          googleAccessToken ? (
            <View style={styles.card}>
              <Ionicons style={styles.cardIcon} size={30} name="logo-google" color={Colors.primary}/>
              <Text style={styles.cardText} onPress={() => navigation.navigate('GoogleClassroomCoursesScreen')}>Google Sala de Aula</Text>
            </View>
          ) : null
        }
      </View>
      <View style={styles.logoutContainer}>
        <TextButton text="Sair" backgroundColor={Colors.danger} onPress={logOut}></TextButton>
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
