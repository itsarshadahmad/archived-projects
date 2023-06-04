import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import "../styles.css";
import Loading from "./Loading";

function App() {
  const [questionsList, setQuestionsList] = useState();
  const [start, setStart] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsList(data.results);
      });
  }, []);

  return (
    <div className="container">
      {start ? (
        <button
          className="start-btn"
          onClick={() => {
            setStart(false);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span>Start</span>
        </button>
      ) : questionsList !== undefined ? (
        <Quiz questionsList={questionsList} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
