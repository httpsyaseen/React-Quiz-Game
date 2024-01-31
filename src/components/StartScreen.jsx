import React from "react";

export default function StartScreen({ total, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{total} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startGame" })}
      >
        Let's Start
      </button>
    </div>
  );
}
