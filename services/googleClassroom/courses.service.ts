import classroomApi from "./googleClassroomApi";


export const getCourses = async (accessToken: string) => {
  classroomApi.defaults.headers.common = getHeader(accessToken);

  // const params = new URLSearchParams([['courseStates', 'ACTIVE']]);
  return classroomApi.get("courses");
};

export const getCourseWorks = async (accessToken: string, courseId: string) => {
  classroomApi.defaults.headers.common = getHeader(accessToken);

  // const params = new URLSearchParams([['orderBy', 'dueDate desc']]);
  return classroomApi.get(`courses/${courseId}/courseWork`);
};

const getHeader = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json"
  };
};
