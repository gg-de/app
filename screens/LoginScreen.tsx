import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import Toast from 'react-native-easy-toast';
import * as Google from "expo-google-app-auth";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import GoogleScopes from "../constants/GoogleScopes";
import { Text, View } from "../components/Themed";
import { logIn, createUser } from "../services/userService";
import { User } from "../models/user.model";


const IOS_CLIENT_ID =
  "your-ios-client-id";
const ANDROID_CLIENT_ID =
  "770873265156-6u8vgas9fg13uea7upa5giac85agrrme.apps.googleusercontent.com";

export default function LoginScreen() {
  const navigation = useNavigation();
  let toast: Toast;

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  React.useEffect(() => {

  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: GoogleScopes
      });

      if (result.type === "success") {
        const googleData = {
          accessToken: result.accessToken,
          idToken: result.idToken,
          refreshToken: result.refreshToken
        }
        await AsyncStorage.setItem('googleData', JSON.stringify(googleData));
        const user: User = {
          email: result.user.email,
          password: '123456',
          fullName: result.user.name
        };

        logIn(user.email, user.password)
          .then((res) => {
            const token = res.data.token;
            AsyncStorage.setItem('token', JSON.stringify(token));
            navigation.navigate("Home");
          })
          .catch((error) => {
            createUser(user)
              .then((res) => {
                const token = res.data.token;
                AsyncStorage.setItem('token', JSON.stringify(token));
                navigation.navigate("Home");
              })
              .catch((error) => {
                toast.show('Ocorrou um erro ao cadastrar, tente novamente mais tarde.', 4000);
              })
          });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      toast.show('Erro ao conectar com o google.', 4000);
      return { error: true };
    }
  };

  const onLogin = () => {
    logIn(email, password)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem('token', JSON.stringify(token));
        navigation.navigate("Home");
      })
      .catch((error) => {
        toast.show('Usuário ou senha inválidos.', 4000);
      });
  };

  return (
    <View style={styles.container}>
      <Toast ref={(toast_) => toast = toast_} position="center" />
      <Image
        style={styles.logo}
        source={require('../assets/images/logogg.png')}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="Senha"
      />

      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={signInWithGoogle}>
        <Ionicons size={30} name="logo-google" color={Colors.white}/>
        <Text style={styles.loginGoogleText}>Entrar com o Google</Text>
      </TouchableOpacity>

      <Text
        style={styles.underlineText}
        onPress={() => navigation.navigate("Register")}
      >
        Ainda não possui uma conta? Clique aqui
      </Text>
      <Text style={styles.underlineText}>Esqueci minha senha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 10,
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  underlineText: {
    marginTop: 15,
    textDecorationLine: "underline",
  },
  loginBtn: {
    marginTop: 15,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkBlue,
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row'
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    width: 'auto'
  },
  loginGoogleText: {
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    width: 'auto'
  },
  logo: {
    width: 200,
    height: 200
  }
});
