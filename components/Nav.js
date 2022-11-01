import Link from "next/link";
import { useContext } from "react";
import { Context } from "../context";
import { firebaseAuth } from "../firebase";
import { useRouter } from "next/router";

const Nav = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;
  const router = useRouter();

  const handleLogout = async () => {
    await firebaseAuth.signOut();
    dispatch({
      type: "LOGOUT",
    });
    router.push("/login");
  };

  return (
    <nav className="nav bg-light d-flex justify-content-between">
      <Link href="/" className="nav-link">
        Home
      </Link>

      <Link href={user ? "/hotel/new" : "/login"} className="nav-link">
        Submit Hotel
      </Link>

      {user ? (
        <a onClick={handleLogout} className="nav-link">
          Logout
        </a>
      ) : (
        <Link href="/login" className="nav-link">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Nav;
