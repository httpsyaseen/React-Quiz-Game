import React from "react";

export default function NextButton({ answer, dispatch, index, maxQuestions }) {
  if (answer === null) return null;

  const isLastQuestion = index + 1 === maxQuestions;
  return (
    <>
      {!isLastQuestion ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
      )}
    </>
  );
}
