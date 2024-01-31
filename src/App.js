import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  status: "loaidng",
};

function reducer(state, action) {
  switch (action.type) {
    case "getData":
      return { ...state, questions: action.payload };
    case "failedData":
      return { ...state, status: "error" };

    default:
      throw new Error("Now Action is not supported");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8080/questionss")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "getData", payload: data }))
      .catch((err) => dispatch({ type: "failedData" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

export default App;
