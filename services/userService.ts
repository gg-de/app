import api from "./api";
import { User } from "../models/user.model";

export const logIn = async (email: string, password: string) => {
  return api.post("api-token-auth/", {username: email, password});
};

export const createUser = async (data: User) => {
  return api.post("user/register/", data);
};
