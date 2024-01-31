import React from "react";

export default function Options({ question, dispatch, answer }) {
  const isAnswered = answer !== null;
  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${
              isAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={isAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
