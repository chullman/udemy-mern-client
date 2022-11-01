/**
 * create a component that will keep track of user's auth state
 * then wrap _app.js so that entire app knows if the user is logged in or not
 */

import React, { useEffect, useContext } from "react";
import { firebaseAuth } from "../firebase";
import { Context } from "../context";
import { axiosAuth } from "../actions/axios";
import { setCookie, destroyCookie } from "nookies";

const FirebaseAuthState = ({ children }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    return firebaseAuth.onIdTokenChanged(async (user) => {
      if (!user) {
        dispatch({
          type: "LOGOUT",
        });
        destroyCookie(null, "token");
        setCookie(null, "token", "", {});
      } else {
        const { token } = await user.getIdTokenResult();
        // set token to cookie
        destroyCookie(null, "token");
        setCookie(null, "token", token, {});
        console.log("Cookie set with token value:", token);
        // console.log("TOKEN", token);
        // send this token to backend
        // backend will check if thie token is valid (using firebase admin tool)
        // if it is verified, you get the same user information in the backend too
        // then you can decide to either save this user in your database or update the existing user
        // then send the user information back to client
        axiosAuth
          .post("/current-user", {})
          .then((res) => {
            console.log("RES =====> ", res);
            dispatch({
              type: "LOGIN",
              payload: res.data,
            });
          })
          .catch((error) => {
            console.log(
              "Error in POST to api/current-user with error data:",
              error
            );
          });
      }
    });
  }, []);

  return <>{children}</>;
};

export default FirebaseAuthState;
