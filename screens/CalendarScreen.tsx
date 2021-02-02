import * as React from 'react';
import { StyleSheet, AsyncStorage, useColorScheme } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {Agenda} from 'react-native-calendars';
import Constants from "expo-constants";
import moment from "moment";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { colors } from 'react-native-elements';


export default function CalendarScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [schedule, setSchedule] = React.useState(null);
  const [events, setEvents] = React.useState({});

  React.useEffect( () => {
    async function loadScheadule() {
      const dataString = await AsyncStorage.getItem('schedule')
      const data = JSON.parse(dataString)
      setSchedule(data);
      console.warn(data)

      const start_week = moment().startOf('isoWeek')
      const monday = start_week.format(moment.HTML5_FMT.DATE)
      const tuesday = start_week.add('days', 1).format(moment.HTML5_FMT.DATE)
      const wednesday = start_week.add('days', 1).format(moment.HTML5_FMT.DATE)
      const thursday = start_week.add('days', 1).format(moment.HTML5_FMT.DATE)
      const friday = start_week.add('days', 1).format(moment.HTML5_FMT.DATE)
      const saturday = start_week.add('days', 1).format(moment.HTML5_FMT.DATE)
      console.warn(saturday)
    
      const items ={
        [monday]:[],
        [tuesday]:[],
        [wednesday]:[],
        [thursday]:[],
        [friday]:[],
        [saturday]:[],
      }
    
      data['monday'].forEach(element => {
        items[monday].push({name: element['subject'], hour: element['time']});
      });
      data['tuesday'].forEach(element => {
        items[tuesday].push({name: element['subject'], hour: element['time']});
      });
      data['wednesday'].forEach(element => {
        items[wednesday].push({name: element['subject'], hour: element['time']});
      });
      data['thursday'].forEach(element => {
        items[thursday].push({name: element['subject'], hour: element['time']});
      });
      data['friday'].forEach(element => {
        items[friday].push({name: element['subject'], hour: element['time']});
      });
      data['saturday'].forEach(element => {
        items[saturday].push({name: element['subject'], hour: element['time']});
      });
      setEvents(items)
      console.log(items)
    }
    loadScheadule();
  }, [isFocused])


  // const renderItem = (event) => {
  //   return (
  //     <View style={{
  //       backgroundColor: 'white',
  //           padding: 20,
  //           marginTop: 20,
  //           marginRight: 15,
  //           borderRadius: 15,
  //           alignItems: 'center',
  //           flex: 1,
  //       }}
        
          
  //     ><Text style={styles.eventText}>{event.hour + ':00'}
  //     </Text><Text style={styles.eventText}>{event.name}</Text></View>);}}
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
        renderItem={(event) => {return (<View style={{
            backgroundColor: 'white',
            padding: 20,
            marginTop: 20,
            marginRight: 15,
            borderRadius: 15,
            alignItems: 'center',
            flex: 1,
        }}
      ><Text style={styles.eventText}>{event.hour + ':00'}
      </Text><Text style={styles.eventText}>{event.name}</Text></View>);}}
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
  eventText:{
    fontSize: 16,
    color: Colors.black
  }
});
