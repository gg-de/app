import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import Toast from 'react-native-easy-toast';

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import { logIn } from "../services/userService";

export default function LoginScreen() {
  const navigation = useNavigation();
  let toast: Toast;

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

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
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
