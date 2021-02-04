import * as React from 'react';
import { StyleSheet, AsyncStorage, useColorScheme } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Agenda } from 'react-native-calendars';
import Constants from "expo-constants";
import moment from "moment";

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';


export default function CalendarScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [schedule, setSchedule] = React.useState(null);
  const [events, setEvents] = React.useState({});

  React.useEffect( () => {
    async function loadScheadule() {
      const dataString = await AsyncStorage.getItem('schedule')
      if (!dataString) return;
      const data = JSON.parse(dataString)
      setSchedule(data);

      const start_week = moment().startOf('isoWeek')
      const weekdays = {
        monday: start_week.format(moment.HTML5_FMT.DATE),
        tuesday: start_week.add('days', 1).format(moment.HTML5_FMT.DATE),
        wednesday: start_week.add('days', 1).format(moment.HTML5_FMT.DATE),
        thursday: start_week.add('days', 1).format(moment.HTML5_FMT.DATE),
        friday: start_week.add('days', 1).format(moment.HTML5_FMT.DATE),
        saturday: start_week.add('days', 1).format(moment.HTML5_FMT.DATE),
        sunday: start_week.add('days', 1).format(moment.HTML5_FMT.DATE),
      }
    
      const items ={
        [weekdays.monday]:[],
        [weekdays.tuesday]:[],
        [weekdays.wednesday]:[],
        [weekdays.thursday]:[],
        [weekdays.friday]:[],
        [weekdays.saturday]:[],
        [weekdays.sunday]: []
      }

      const weekdaysList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      weekdaysList.forEach((weekday) => {
        data[weekday].forEach((elem: string) => {
          if (elem['subject']) items[weekdays[weekday]].push({name: elem['subject'], hour: elem['time']});
        });
      });
      setEvents(items)
      console.log(items)
    }
    loadScheadule();
  }, [isFocused])


    const renderEvent = (event) => (
      <View style={styles.eventContainer}>
        <Text style={styles.eventText}>{event.hour + ':00'}</Text>
        <Text style={styles.eventText}>{event.name}</Text>
      </View>
    );

  return (
    schedule == null ? (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bem Vindo ao GG-DE! O gerador de grades para desempenho educacional!</Text>
      </View>
        <Text style={styles.text} onPress={() => navigation.navigate('RegisterSubjectScreen')}>Cadastrar novo cronograma</Text>
    </View>
  ) : (
    <View style={styles.agendaContainer}><Agenda
        items={events}
        // renderKnob={() => {return (<View style={{height: 80, backgroundColor: 'red'}}/>);}}
        renderItem={renderEvent}
        // renderDay={(day, item) => {return (<View style={{height: 80, backgroundColor:'red'}}/>);}}
        // renderEmptyData={() => {return (<View style={{height:90, backgroundColor:Colors.primary}}/>);}}
        theme={{
          agendaDayTextColor: Colors.darkBlue,
          agendaDayNumColor: Colors.darkBlue,
          agendaTodayColor: Colors.primary,
          agendaKnobColor: Colors.primary
        }}
        // loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        // onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
        selected={moment().format(moment.HTML5_FMT.DATE)}
      />
    </View>
  ));

  }


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
  },
  agendaContainer: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  titleContainer: {
    width: '80%',
    paddingVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16
  },
  eventContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    marginRight: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
  },
  eventText:{
    fontSize: 16,
    color: Colors.black
  },
});
