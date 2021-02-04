export interface Course {
    "id": string,
    "name": string,
    "section": string,
    "descriptionHeading": string,
    "description": string,
    "room": string,
    "ownerId": string,
    "creationTime": string,
    "updateTime": string,
    "enrollmentCode": string,
    "courseState": any,
    "alternateLink": string,
    "teacherGroupEmail": string,
    "courseGroupEmail": string,
    "teacherFolder": any,
    "courseMaterialSets": any[],
    "guardiansEnabled": boolean,
    "calendarId": string
}

export interface CourseWork {
    courseId: string;
    id: string;
    title: string;
    description: string;
    materials: any[];
    state: string;
    alternateLink: string;
    creationTime: string;
    updateTime: string;
    dueDate: GoogleDate;
    dueTime: GoogleTime;
    scheduledTime: string;
    maxPoints: number;
    workType: string;
    associatedWithDeveloper: boolean;
    assigneeMode: string;
    individualStudentsOptions: object;
    submissionModificationMode: string;
    creatorUserId: string;
    topicId: string;
    assignment?: object;
    multipleChoiceQuestion?: object;
}

export interface GoogleDate {
    day: string;
    month: string;
    year: string;
}

export interface GoogleTime {
    hours: string;
    minutes: string;
}
