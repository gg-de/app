import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import Toast from 'react-native-easy-toast';

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import { createUser } from "../services/userService";
import { User } from "../models/user.model";

export default function RegisterScreen() {
  const navigation = useNavigation();
  let toast: Toast;

  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const onRegister = () => {
    const user: User = {
      email,
      fullName: name,
      password
    }
    let email_re = RegExp("[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+");
    if (name.length > 3 && email_re.test(email) && password.length > 4) {   
      createUser(user)
        .then((res) => {
          const token = res.data.token;
          AsyncStorage.setItem('token', JSON.stringify(token));
          navigation.navigate("Home");
        })
        .catch((error) => {
          toast.show('Ocorrou um erro ao cadastrar, tente novamente mais tarde.', 4000);
        })
    } else {
      toast.show('Preencha todos os campos para finalizar o cadastro.', 4000);
    }
  };

  return (
    <View style={styles.container}>
      <Toast ref={(toast_) => toast = toast_} position="bottom" />
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
