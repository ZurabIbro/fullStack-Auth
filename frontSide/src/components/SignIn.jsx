import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignIn } from "../features/applicationSlice";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authSignIn({login, password}))
  };


  return (
    <form onSubmit={handleSignIn}>
      <input type="text" value={login} placeholder="name" onChange={handleSetName} />
      <br />
      <input type="text" value={password} placeholder="password" onChange={handleSetPass} />
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export default SignIn;
