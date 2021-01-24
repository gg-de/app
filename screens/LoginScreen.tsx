import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";

export default function LoginScreen() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const onLogin = () => {
        console.warn('Logged');
    };
    

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeEmail(text)}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={text => onChangePassword(text)}
                value={password}
                placeholder="Senha"
            />

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={onLogin}
            >
                <Text style={styles.loginText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.forgotPass}>Esqueci minha senha</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        paddingHorizontal: '10%'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        marginVertical: 10,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 10
    },
    forgotPass: {
        marginTop: 15,
        textDecorationLine: 'underline'
    },
    loginBtn: {
        marginTop: 15,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 25
    },
    loginText: {
        fontSize: 18,
        fontWeight: "bold"
    }
});
