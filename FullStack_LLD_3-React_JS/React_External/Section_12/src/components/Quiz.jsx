import { useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    const handleSelectAnswer = (selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }

    if(userAnswers.length == QUESTIONS.length) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} />
                <h2>QUIZ COMPLETED!</h2>
            </div>
        )
    }

    let activeQuestion = userAnswers.length;
    const shuffledAnswers = [...QUESTIONS[activeQuestion].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)} />
                <h2>{QUESTIONS[activeQuestion].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Quiz