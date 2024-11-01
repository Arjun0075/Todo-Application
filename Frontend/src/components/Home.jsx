import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputEle, setInputEle] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [loggedInUser , setLoggedInUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {
    const user = localStorage.getItem("user")
    console.log(user)
    if(user == "undefined"){
      console.log("useEffect return")
      return;
    }
    console.log("did not return")
    const userParse = user ? JSON.parse(user) : {}
    console.log("User", userParse)
    setLoggedInUser(userParse)
  }, [])

  useEffect(() => {
    if(!loggedInUser) return
    fetchTodo()
  } , [loggedInUser])

  const fetchTodo = async () => {
    console.log(loggedInUser.email)
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/todo", {
        user : loggedInUser.email
      },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.allTodo);

      res.data?.allTodo ? setTodos(res.data.allTodo) : null;
      const completedTodo = res.data?.allTodo.filter(
        (todo) => todo.completed === false
      );
      completedTodo.length > 0
        ? setCompletedCount(completedTodo.length)
        : setCompletedCount(0);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch todo");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (inputEle.length < 1) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/todo/create",
        {
          text: inputEle,
          completed: false,
          user : loggedInUser.email
        },
        {
          withCredentials: true,
        }
      );
      fetchTodo();
      setInputEle("");
    } catch (error) {
      console.log(error);
      setError("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) {
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:4000/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      fetchTodo();
    } catch (error) {
      console.log(error);
      setError("Failed to fetch todo");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        withCredentials: true,
      });
      fetchTodo();
    } catch (error) {
      console.log(error);
      setError("Failed to delete todo");
    }
  };

  const handleLogoutClick = async () => {
    console.log("logout clicked")
    console.log(loggedInUser.email)
    try {
      const res = await axios.get("http://localhost:4000/logout",{
        withCredentials : true
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem("user")
    navigate("/login")

  }
  

  // useEffect(() => {
  //   fetchTodo();
  // }, []);

  return (
    <div className="main_div">
      <h1>Todo App</h1>
      <div className="input_div">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          type="text"
          placeholder="Add a new Todo"
          value={inputEle}
          onChange={(e) => setInputEle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {loading ? <div>Loading</div>: error ? <div>{error}</div> : 
         <ul className="todo_list">
         {todos &&
           todos.length > 0 &&
           todos.map((todo) => {
             return (
               <li key={todo._id}>
                 <div>
                   <input
                     type="checkbox"
                     onChange={() => updateTodo(todo._id)}
                     checked={todo.completed ? true : false}
                   />
                   <span className={todo.completed ? "completed" : ""}>
                     {todo.text}
                   </span>
                 </div>
                 <button onClick={() => deleteTodo(todo._id)}>Delete</button>
               </li>
             );
           })}
       </ul>
      }
   
      <p className="todo_text">{completedCount} todo Remaining</p>
      <div className="logout">
        <button className="logoutBtn" onClick={handleLogoutClick}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
