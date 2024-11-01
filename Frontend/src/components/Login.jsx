import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const location = useLocation();
  const [link , setLink] =useState("/signup")
  const [linkBtnChanged ,setLinkBtnChanged] = useState(false)
  const navigate = useNavigate()
  const [User,setUser] = useState({})


  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLoginPage(true);
      setLink("/signup")
      console.log("Login Page");
    } else {
      setIsLoginPage(false);
      console.log("Sign Up page");
      setLink("/login")
    }
  }, [linkBtnChanged]);

  const handleLoginClick = () => {
    console.log("login click")
    setLinkBtnChanged(!linkBtnChanged)
  }

 
  const handleSignInLoginClick = async(e) => {
    console.log("Clicked")
    e.preventDefault()
    if(isLoginPage){
        console.log("Login User")
        try {
            const res = await axios.post("http://localhost:4000/login", {
                email : email,
                password :password
            }, {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            console.log(res)
            console.log(res.data.user);
            if(res.status === 200){
                navigate("/")
                setUser(res.data.user)
                localStorage.setItem("user" , JSON.stringify(res.data.user))
            }
        } catch (error) {
            console.log(error)
            alert("Please enter valid credentials")
        }
    }else {
        try {
            const res = await axios.post("http://localhost:4000/register", {
                username : userName,
                email : email,
                password :password
            }, {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            console.log(res)
            if(res.status === 201){
                navigate("/login")
                setLinkBtnChanged(!linkBtnChanged)
                setEmail('')
                setUserName("")
                setPassword('')
                alert("User successfully registered")
            }
        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
            // setEmail('')
            // setUserName("")
            // setPassword('')
        }
 
    }
  }

  return (
    <div>
      <div className="main-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignInLoginClick}>
          {!isLoginPage && (
            <div className="input_wrapper">
              <label htmlFor="">Username</label>
              <input type="text" name="" id="" placeholder="Type Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
          )}

          <div className="input_wrapper">
            <label htmlFor="">Email</label>
            <input type="text" name="" id="" placeholder="Type Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input_wrapper">
            <label htmlFor="">Password</label>
            <input type="text" name="" id="" placeholder="Type Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <button className="signupBtn" type ="submit">{isLoginPage ? "Login" :"Sign Up"}</button>

          <p>
            {isLoginPage ? "New User ? ": "Already have an account" }<Link to={link} onClick={handleLoginClick}>{isLoginPage ? "Sign Up" : " Login"}</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
