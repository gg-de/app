import { RouteProp } from '@react-navigation/native';


export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Calendário: undefined;
  Perfil: undefined;
  Configurações: undefined;
};

export type CalendarParamList = {
  CalendarScreen: undefined;
  RegisterAvailabilityScreen: undefined;
  RegisterSubjectScreen: undefined;
  NewSubjectScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
  GoogleClassroomCoursesScreen: undefined;
  GoogleClassroomCourseWorksScreen: { accessToken: string, courseId: string }
};

type GoogleClassroomCourseWorksScreenRouteProp = RouteProp<SettingsParamList, 'GoogleClassroomCourseWorksScreen'>;

export type GoogleClassroomCourseWorksScreenProps = {
  route: GoogleClassroomCourseWorksScreenRouteProp;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
}
