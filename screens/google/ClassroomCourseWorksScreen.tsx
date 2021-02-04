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
import { CourseWork } from '../../models/googleClassroom/course.model';
import { refreshToken } from '../../services/googleOAuth2/token.service';
import { GoogleClassroomCourseWorksScreenProps } from '../../types';


export default function ClassroomCourseWorksScreen({ route }: GoogleClassroomCourseWorksScreenProps) {
  const navigation = useNavigation();
  let toast: Toast;

  const [courseWorks, setCourseWorks] = React.useState<CourseWork[]>([]);

  React.useEffect(() => {
    const loadCourseWorks = async () => {
      getCourseWorks(route.params.accessToken, route.params.courseId)
        .then((res) => {
          if (res.data.courseWork) {
            setCourseWorks(res.data.courseWork)
          }
        })
        .catch((error) => {
          console.log(error);
          toast.show('Erro ao carregar cursos.', 4000);
        })
    };
    loadCourseWorks();
  }, []);

  const getWorkDateTime = (courseWork: CourseWork) => {
    return `${courseWork.dueDate.day}/${courseWork.dueDate.month}/${courseWork.dueDate.year} ${courseWork.dueTime.hours}:${courseWork.dueTime.minutes}`;
  };

  return (
    <View style={styles.container}>
      <Toast ref={(toast_) => toast = toast_} position="center" />
      <View style={styles.cardsContainer}>
        {courseWorks.map((courseWork, key) => {
          return (
            <View style={styles.card} key={key}>
              <Text style={styles.cardTitle}>{courseWork.title}</Text>
              <Text style={styles.cardText}>{courseWork.description}</Text>
              <Text style={styles.cardText}>Data de Entrega: {getWorkDateTime(courseWork)}</Text>
            </View>
          )
        })}
        {courseWorks.length == 0 &&
         <Text style={styles.emptyText}>Esta turma não possui nenhuma atividade, pode ficar tranquilo :)</Text>}
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
    paddingHorizontal: '10%',
    width: '100%'
  },
  card: {
    height: 'auto',
    paddingVertical: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingLeft: 15,
    marginBottom: 10,
    textAlign: 'left'
  },
  cardText: {
    fontSize: 16,
    paddingLeft: 15,
    paddingVertical: 2,
    color: Colors.primary,
    textAlign: 'left'
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 40,
    width: '40%',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center'
  }
});
