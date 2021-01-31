import * as React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { Text, View, ScrollView } from "../components/Themed";
import { LabelInput } from "../components/LabelInput";

interface Subject {
  title: string;
  hours: number;
}

const hoursList: number[] = [1, 2, 3, 4, 5]

export default function NewSubjectScreen() {
  const navigation = useNavigation();

  const [hourSelected, setHourSelected] = React.useState<number>(1);
  const [title, setTitle] = React.useState<string>("");

  const onFinish = async () => {
    try {
      const valueString = await AsyncStorage.getItem("subjectsAdded");
      let value = [];
      if (valueString !== null) {
        value = JSON.parse(valueString);
        const subject: Subject = {
          title,
          hours: hourSelected
        }
        value.push(subject);
      } else {
        const subject: Subject = {
          title,
          hours: hourSelected
        }
        value = [subject];
      }
      await AsyncStorage.setItem("subjectsAdded", JSON.stringify(value));
      navigation.navigate("RegisterSubjectScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const getCircleStyle = (hour: number): object => {
    return {
      marginTop: 15,
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: hour === hourSelected ? Colors.darkBlue : Colors.white,
      justifyContent: "center",
      alignItems: "center",
    }
  };

  const getCircleTextStyle = (hour: number): object => {
    return {
      fontSize: 20,
      color: hour === hourSelected ? Colors.white : Colors.darkBlue,
      fontWeight: "bold",
    }
  };

  return (
    <View style={styles.container}>
      <LabelInput label="Nome da matéria:" placeholder="Ex.: Matemática" text={title} onChangeText={setTitle}></LabelInput>
      <Text style={styles.normalText}>Quantas horas semanais deseja dedicar?</Text>
      <View style={styles.circlesContainer}>
        {hoursList.map((hour, key) => {
          return (
            <View key={key}>
              <TouchableOpacity style={getCircleStyle(hour)} onPress={() => setHourSelected(hour)}>
                <Text style={getCircleTextStyle(hour)}>{hour}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={styles.tipContainer}>
        <Ionicons size={30} name="bulb" color={Colors.warning}></Ionicons>
        <Text style={styles.tipText}>Aconselhamos começar dedicando poucas horas semanais</Text>
      </View>
      <View style={styles.finishContainer}>
        <TouchableOpacity style={styles.finishBtn} onPress={onFinish}>
          <Text style={styles.finishText}>Cadastrar matéria</Text>
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
    paddingBottom: 20,
  },
  finishContainer: {
    width: "100%",
    backgroundColor: "transparent",
  },
  finishBtn: {
    marginTop: 25,
    marginBottom: 10,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkBlue,
    padding: 10,
    borderRadius: 25,
  },
  finishText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  normalText: {
    width: "80%",
    fontSize: 16,
    color: Colors.white,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  circleSelected: {
    backgroundColor: Colors.darkBlue
  },
  tipContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    flexDirection: "row",
    paddingHorizontal: "12%"
  },
  tipText: {
    color: Colors.warning,
    paddingLeft: 15
  }
});
