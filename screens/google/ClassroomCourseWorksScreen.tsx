import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import Toast from 'react-native-easy-toast';

import { Text, View } from '../../components/Themed';
import { TextButton } from '../../components/StyledButton';
import Colors from '../../constants/Colors';
import { getCourses, getCourseWorks } from '../../services/googleClassroom/courses.service';
import { Course } from '../../models/googleClassroom/course.model';
import { refreshToken } from '../../services/googleOAuth2/token.service';
import { GoogleClassroomCourseWorksScreenProps } from '../../types';


export default function ClassroomCourseWorksScreen({ route }: GoogleClassroomCourseWorksScreenProps) {
  const navigation = useNavigation();
  let toast: Toast;

  const [courses, setCourses] = React.useState<Course[]>([]);

  React.useEffect(() => {
    const loadCourseWorks = async () => {
      getCourseWorks(route.params.accessToken, route.params.courseId)
        .then((res) => {
          setCourses(res.data.courses)
        })
        .catch((error) => {
          toast.show('Erro ao carregar cursos.', 4000);
        })
    };
    loadCourseWorks();
  }, []);

  return (
    <View style={styles.container}>
      <Toast ref={(toast_) => toast = toast_} position="center" />
      <Text style={styles.title}>Atividades</Text>
      <View style={styles.cardsContainer}>
        {courses.map((course, key) => {
          return (
            <View style={styles.card} key={key}>
              <Text style={styles.cardText}>{course.name}</Text>
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardsContainer: {
    padding: '10%',
    width: '100%'
  },
  card: {
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 10
  },
  cardIcon: {
    width: '10%',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingLeft: 15,
    width: '90%',
    textAlign: 'left'
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 40,
    width: '40%',
  },
});
