import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity, FlatList, AsyncStorage } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import Toast, {DURATION} from 'react-native-easy-toast';

import Colors from "../constants/Colors";
import { Text, View, ScrollView } from "../components/Themed";
import { Subject } from "../models/schedule.model";


export default function RegisterSubjectScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let toast: Toast;

  const [retrieved, setRetrieved] = React.useState(false);

  const [subjects, setSubjects] = React.useState<Subject[]>([]);

  const addSubject = () => {
    addItem();
  };

  const onNext = () => {
    if(subjects.length > 0) {
      navigation.navigate("RegisterAvailabilityScreen");
    } else {
      toast.show('Adicione pelo menos uma matéria para continuar.', 5000);
    }
  };

  const addItem = () => {
    navigation.navigate("NewSubjectScreen");
  };

  const saveSubjects = async () => {
    await AsyncStorage.setItem('subjectsAdded', JSON.stringify(subjects));
  };

  const removeItem = async (item) => {
    setSubjects(subjects.filter((_item) => _item.title !== item.title));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.normalText}>{item.title} - {item.hours} hora{item.hours > 1 ? 's' : ''}</Text>
      <Ionicons
        size={30}
        style={styles.iconRemove}
        name="remove-circle"
        color={Colors.danger}
        onPress={() => removeItem(item)}
        />
    </View>
  )

  const retrieveSubjectsData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('subjectsAdded');
      if (valueString) {
        const value = JSON.parse(valueString);
        setSubjects(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Retrieve if has new data
  if (!retrieved) {
    retrieveSubjectsData();
    setRetrieved(true);
  }

  React.useEffect(() => {
    retrieveSubjectsData();
  }, []);

  React.useEffect(() => {
    saveSubjects()
  }, [subjects]);

  React.useEffect(() => {
    retrieveSubjectsData();
  },[isFocused]);

  return (
    <View style={styles.container}>
      <Toast ref={(toast_) => toast = toast_} position="center" />
      <FlatList
        style={{flexGrow: 0}}
        data={subjects}
        renderItem={renderItem}
        extraData={subjects.length}
        keyExtractor={(item, index) => item.title}
        persistentScrollbar={true}
      />
      <View style={styles.viewContainer}>
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
        <View style={styles.nextContainer}>
          <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
            <Text style={styles.nextText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    paddingHorizontal: "10%",
    paddingBottom: 20
  },
  viewContainer: {
    paddingTop: "10%",
  },
  nextContainer: {
    width: "100%",
    backgroundColor: 'transparent'
  },
  nextBtn: {
    marginTop: 25,
    marginBottom: 10,
    height: 50,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 25,
    alignSelf: "flex-end",
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
  },
  normalText: {
    width: "80%",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: 'center'
  },
  icon: {
    marginRight: 15
  },
  iconRemove: {
    width: '20%',
    textAlign: 'center',
  },
  newSubjectText: {
    fontSize: 16,
    textAlign: "center",
  },
  newSubjectView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  item: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 7,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
});
