import React, { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";

export default function Quiz({ questionsList }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (questionsList.length > currentQuestionIndex) {
      const optionList = [
        ...questionsList[currentQuestionIndex].incorrect_answers,
        answer,
      ].sort(() => Math.random() - 0.5);
      setQuestion(questionsList[currentQuestionIndex].question);
      // setQuestion(renderHTML(questionsList[currentQuestionIndex].question));
      setOptions(optionList);
      setAnswer(questionsList[currentQuestionIndex].correct_answer);
    } else {
      setFinished(true);
    }
  }, [answer, currentQuestionIndex, questionsList]);

  function result(e) {
    const chosenOption = e.target.textContent;
    if (answer === chosenOption) {
      setPoints(points + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function reset(e) {
    setCurrentQuestionIndex(0);
    setQuestion("");
    setOptions([]);
    setAnswer("");
    setPoints(0);
    setFinished(false);
  }

  return (
    <div className="quiz-container">
      {finished ? (
        <div className="finish">
          <p className="your-score">Your Score is {points}/10</p>
          <button className="restart" onClick={reset}>
            Restart
          </button>
        </div>
      ) : (
        <div className="quiz-component">
          <p className="points">Score: {points}/10</p>
          <h1 className="question">{sanitizeHtml(question)}</h1>
          <div className="buttons">
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  className="option-btn"
                  onClick={result}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(option) }}
                ></button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
