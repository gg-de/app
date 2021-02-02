import * as React from 'react';
import { StyleSheet, TextInput } from "react-native";

import { View, Text } from './Themed';
import Colors from "../constants/Colors";


type LabelInputProps = {
  label: string;
  placeholder: string;
  text: string,
  onChangeText: (text: string) => void;
};

export function LabelInput(props: LabelInputProps) {
  return (
      <View>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput placeholder={props.placeholder} style={styles.input} value={props.text} onChangeText={(text) => props.onChangeText(text)} />
      </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  input: {
    marginVertical: 10,
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  }
});
