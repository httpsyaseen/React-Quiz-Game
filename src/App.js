import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],
  status: "loading", //error active loading ready finished
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "getData":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedData":
      return { ...state, questions: [], status: "error" };
    case "startGame":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const points =
        question.correctOption === action.payload ? question.points : 1;

      return { ...state, answer: action.payload, points };
    default:
      throw new Error("Now Action is not supported");
  }
}
function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const totalQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "getData", payload: data }))
      .catch((err) => dispatch({ type: "failedData" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen total={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
