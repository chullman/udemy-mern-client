import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import LoginRegisterForm from "../components/LoginRegisterForm";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async () => {
    // console.log(registerEmail, registerPass);
    setLoading(true);
    await createUserWithEmailAndPassword(
      firebaseAuth,
      registerEmail,
      registerPass
    )
      .then((user) => {
        console.log("REGISTER", user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        setLoading(false);
      });
  };

  const login = async () => {
    // console.log(loginEmail, loginPass);
    setLoading(true);
    await signInWithEmailAndPassword(firebaseAuth, loginEmail, loginPass)
      .then((user) => {
        console.log("LOGIN", user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        setLoading(false);
      });
  };

  const googleLogin = async () => {
    await signInWithPopup(firebaseAuth, new firebaseAuth.GoogleAuthProvider())
      .then((user) => {
        console.log("LOGIN", user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center pt-4 display-4">
        {loading ? (
          <SyncOutlined spin className="text-danger" />
        ) : (
          "Login / Register"
        )}
      </h2>

      <Button
        onClick={googleLogin}
        className="mb-3 col-md-6 offset-md-3"
        type="danger"
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
        block
      >
        Login with Google
      </Button>

      <div className="row">
        <LoginRegisterForm
          email={loginEmail}
          setEmail={setLoginEmail}
          pass={loginPass}
          setPass={setLoginPass}
          handleSubmit={login}
          buttonName="Login"
        />

        <LoginRegisterForm
          email={registerEmail}
          setEmail={setRegisterEmail}
          pass={registerPass}
          setPass={setRegisterPass}
          handleSubmit={register}
          buttonName="Register"
        />
      </div>

      <div className="d-flex">
        <Link
          href="/reset-password"
          className="btn btn-outline-danger btn-sm mt-5"
        >
          Reset Password
        </Link>
      </div>
    </div>
  );
};

export default Login;
