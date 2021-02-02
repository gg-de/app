import * as React from "react";
import { StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import Constants from 'expo-constants';

import Colors from "../constants/Colors";
import { Text, View, ScrollView } from "../components/Themed";
import { Availability, Schedule } from "../models/schedule.model";
import { createSchedule } from "../services/scheduleService";


interface AvailabilityObj {
  monday: object,
  tuesday: object,
  wednesday: object,
  thursday: object,
  friday: object,
}

export default function RegisterAvailabilityScreen() {
  const navigation = useNavigation();
  const dayHours = {
    '6': false,
    '7': false,
    '8': false,
    '9': false,
    '10': false,
    '11': false,
    '12': false,
    '13': false,
    '14': false,
    '15': false,
    '16': false,
    '17': false,
    '18': false,
    '19': false,
    '20': false,
    '21': false,
  }

  const hoursList = [
    {key: '6', text: '6h às 7h'},
    {key: '7', text: '7h às 8h'},
    {key: '8', text: '8h às 9h'},
    {key: '9', text: '9h às 10h'},
    {key: '10', text: '10h às 11h'},
    {key: '11', text: '11h às 12h'},
    {key: '12', text: '12h às 13h'},
    {key: '13', text: '13h às 14h'},
    {key: '14', text: '14h às 15h'},
    {key: '15', text: '15h às 16h'},
    {key: '16', text: '16h às 17h'},
    {key: '17', text: '17h às 18h'},
    {key: '18', text: '18h às 19h'},
    {key: '19', text: '19h às 20h'},
    {key: '20', text: '20h às 21h'},
    {key: '21', text: '21h às 22h'}
  ]

  const weekdaysList = [
    {key: 'monday', text: 'Segunda-feira'},
    {key: 'tuesday', text: 'Terça-feira'},
    {key: 'wednesday', text: 'Quarta-feira'},
    {key: 'thursday', text: 'Quinta-feira'},
    {key: 'friday', text: 'Sexta-feira'},
  ]

  const [availability, onChangeAvailability] = React.useState<AvailabilityObj>({
    'monday': dayHours,
    'tuesday': dayHours,
    'wednesday': dayHours,
    'thursday': dayHours,
    'friday': dayHours,
  });
  
  function handleChange(day: string, hourRange: string) {
    onChangeAvailability(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], [hourRange]: !availability[day][hourRange] }
    }));
  };

  const onFinish = async () => {
    const valueString = await AsyncStorage.getItem('subjectsAdded') || '[]';
    const data: Schedule = {
      subjects: JSON.parse(valueString),
      availabilities: getAvailabilityJson()
    }
    
    createSchedule(data)
      .then((res) => {
        AsyncStorage.setItem('schedule', res.data)
        navigation.navigate("CalendarScreen");
      });
  };

  const getAvailabilityJson = () => {
    const data: Availability[] = [];
    Object.keys(availability).forEach(function(day, index) {
      Object.keys(availability[day]).forEach(function(hour) {
        if (availability[day][hour]) {
          data.push({
            weekday: day,
            time: parseInt(hour)
          });
        }
      })
    });
    return data;
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
              <View key={'day_' + itemKey} style={styles.itemsContainer}>
                {hoursList.map((hour, key) => {
                  return (
                    <CheckBox
                    key={itemKey.toString() + '_' + key.toString()}
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
