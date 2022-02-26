import {useState} from "react"
const Login = () => {
    const [value, setValue] = useState("")
  return (
    <form >
      <h4>Welcome to out Website</h4>
      <p>Please enter your username</p>
      <input type="text" value={value} onChange={(event) => {

      }}/>
      <button>Login</button>
      
    </form>
  );
};
