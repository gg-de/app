export interface Schedule {
  subjects: Subject[];
  availabilities: Availability[];
}

export interface Availability {
  weekday: number,
  time: number
}

export interface Subject {
  title: string;
  hours: number;
}
