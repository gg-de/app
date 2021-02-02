export interface Schedule {
  subjects: Subject[];
  availabilities: Availability[];
}

export interface Availability {
  weekday: string,
  time: number
}

export interface Subject {
  title: string;
  hours: number;
}
