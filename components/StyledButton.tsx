import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "./Themed";
import Colors from "../constants/Colors";


type ButtonProps = {
  text: string;
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
  width?: string|number;
};

export function TextButton(props: ButtonProps) {
  const styles = StyleSheet.create({
    button: {
      width: props.width ? props.width : "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 25,
      backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.darkBlue
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: props.color ? props.color : Colors.white
    }
  });

  return (
    <TouchableOpacity {...props} style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}
