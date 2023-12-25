import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../features/applicationSlice";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignUp({login, password}))
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" value={login} placeholder="name" onChange={handleSetName} />
      <br />
      <input type="text" value={password} placeholder="password" onChange={handleSetPass} />
      <br />
      <button type="submit">register</button>
    </form>
  );
};

export default SignUp 