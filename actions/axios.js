import axios from "axios";
import { firebaseAuth } from "../firebase";

// For sending to routes where you DON'T need to send the token
export const axiosPublic = axios.create({
  baseURL: process.env.api,
});

// For sending to routes where you DO need the token
export const axiosAuth = axios.create({
  baseURL: process.env.api, // process.env.api comes from the next.config.js file in the root dir
});

axiosAuth.interceptors.request.use(
  (config) => {
    return firebaseAuth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        config.headers.token = idToken;
        return Promise.resolve(config);
      })
      .catch((error) => {
        console.log("Can't get token error:", error);
      });
  },
  (error) => {
    return Promise.reject(error);
  }
);
