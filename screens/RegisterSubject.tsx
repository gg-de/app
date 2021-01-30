import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { Text, View, ScrollView } from "../components/Themed";

export default function RegisterSubjectScreen() {
  const navigation = useNavigation();

  const [subjects, onChangeSubjects] = React.useState([]);

  const addSubject = () => {};

  const onNext = () => {
    navigation.navigate("RegisterAvailabilityScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.newSubjectContainer}
          onPress={addSubject}
        >
          <View style={styles.newSubjectView}>
            <Ionicons
              size={30}
              style={styles.icon}
              name="add"
              color="white"
            />
            <Text style={styles.newSubjectText}>Adicionar nova matéria</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.nextContainer}>
        <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
          <Text style={styles.nextText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    paddingHorizontal: "10%",
  },
  scrollContainer: {
    paddingTop: "10%",
  },
  nextContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
    width: "60%",
  },
  nextBtn: {
    marginTop: 15,
    marginBottom: "20%",
    height: 50,
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 25,
  },
  nextText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  newSubjectContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: Colors.darkBlue,
    flex: 1
  },
  normalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 15
  },
  newSubjectText: {
    fontSize: 16,
    textAlign: "center"
  },
  newSubjectView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  }
});
