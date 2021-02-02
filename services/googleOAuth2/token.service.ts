import oauth2Api from "./oauth2Api";


const ANDROID_CLIENT_ID =
  "770873265156-6u8vgas9fg13uea7upa5giac85agrrme.apps.googleusercontent.com";

export const refreshToken = async (refreshToken: string) => {
  oauth2Api.defaults.headers.common = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return oauth2Api.post("token", {
    client_id: ANDROID_CLIENT_ID,
    refresh_token: refreshToken,
    grant_type: refreshToken
  });
};
