import api from "./api";
import { Schedule } from "../models/schedule.model";

export const createSchedule = async (data: Schedule) => {
  return api.post("mount_schedule/", data);
};
