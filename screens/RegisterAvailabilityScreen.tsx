import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import Constants from 'expo-constants';

import Colors from "../constants/Colors";
import { Text, View, ScrollView } from "../components/Themed";

export default function RegisterAvailabilityScreen() {
  const navigation = useNavigation();
  const dayHours = {
    _06_07: false,
    _07_08: false,
    _08_09: false,
    _09_10: false,
    _10_11: false,
    _11_12: false,
    _12_13: false,
    _13_14: false,
    _14_15: false,
    _15_16: false,
    _16_17: false,
    _17_18: false,
    _18_19: false,
    _19_20: false,
    _20_21: false,
    _21_22: false,
  }

  const hoursList = [
    {key: '_06_07', text: '6h às 7h'},
    {key: '_07_08', text: '7h às 8h'},
    {key: '_08_09', text: '8h às 9h'},
    {key: '_09_10', text: '9h às 10h'},
    {key: '_10_11', text: '10h às 11h'},
    {key: '_11_12', text: '11h às 12h'},
    {key: '_12_13', text: '12h às 13h'},
    {key: '_13_14', text: '13h às 14h'},
    {key: '_14_15', text: '14h às 15h'},
    {key: '_15_16', text: '15h às 16h'},
    {key: '_16_17', text: '16h às 17h'},
    {key: '_17_18', text: '17h às 18h'},
    {key: '_18_19', text: '18h às 19h'},
    {key: '_19_20', text: '19h às 20h'},
    {key: '_20_21', text: '20h às 21h'},
    {key: '_21_22', text: '21h às 22h'}
  ]

  const weekdaysList = [
    {key: 'monday', text: 'Segunda-feira'},
    {key: 'tuesday', text: 'Terça-feira'},
    {key: 'wednesday', text: 'Quarta-feira'},
    {key: 'thursday', text: 'Quinta-feira'},
    {key: 'friday', text: 'Sexta-feira'},
  ]

  const [availability, onChangeAvailability] = React.useState({
    monday: dayHours,
    tuesday: dayHours,
    wednesday: dayHours,
    thursday: dayHours,
    friday: dayHours,
  });
  
  function handleChange(day: string, hourRange: string) {
    onChangeAvailability(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], [hourRange]: !availability[day][hourRange] }
    }));
  };

  const onFinish = () => {
    navigation.navigate("CalendarScreen");
  };

  React.useEffect(() => {
  }, [availability]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>
          Marque os horários ao qual tem disponibilidade para estudar
        </Text>
        {weekdaysList.map((weekday, itemKey) => {
          return (
            <View>
              <Text style={styles.normalText}>{weekday.text}</Text>
              <View key={itemKey} style={styles.itemsContainer}>
                {hoursList.map((hour, key) => {
                  return (
                    <CheckBox
                    key={key}
                    title={hour.text}
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                    checked={availability[weekday.key][hour.key]}
                    onPress={() => handleChange(weekday.key, hour.key)}
                    />
                    )
                  })}
              </View>
            </View>
          )
        })}
        <TouchableOpacity style={styles.finishBtn} onPress={onFinish}>
          <Text style={styles.finishText}>Finalizar</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: '10%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemsContainer: {
    marginVertical: 15,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  finishBtn: {
    marginTop: 15,
    marginBottom: '20%',
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
  },
  normalText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  checkboxContainer: {
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    width: "43%",
    
  },
  checkboxText: {
    paddingHorizontal: 0,
    color: Colors.white,
  },
});
