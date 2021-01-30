import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const onRegister = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeName(text)}
        value={name}
        placeholder="Digite o seu nome completo"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        placeholder="Digite o seu email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="Digite a sua senha"
      />

      <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
        <Text style={styles.registerText}>Cadastrar</Text>
      </TouchableOpacity>
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
  registerBtn: {
    marginTop: 15,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkBlue,
    padding: 10,
    borderRadius: 25,
  },
  registerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
