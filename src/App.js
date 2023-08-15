import React from 'react';
import Question from './components/Question';
import allQuestions from './questions';
import {nanoid} from 'nanoid';

export default function App() {
  const [page2, setPage2] = React.useState(false);
  function changePage(){
    setPage2(true);
  }

  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [userSelections, setUserSelections] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [showAnswerAll, setShowAnswerAll] = React.useState(false);

  function generateUniqueRandomNumbers(count, min, max) {
    if (count > (max - min + 1) || max < min) {
      return [];
    }
    
    const uniqueNumbers = [];
    
    while (uniqueNumbers.length < count) {
      const randomNumber = Math.floor(Math.random() * max);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
    
    return uniqueNumbers;
  }

  React.useEffect(() => {
    const randomNumbers = generateUniqueRandomNumbers(5, 0, allQuestions.results.length);
    const quests = randomNumbers.map(num => {
      const quest = allQuestions.results[num];
      return {id: nanoid(), question: quest.question, answer: quest.correct_answer, options: [...quest.incorrect_answers, quest.correct_answer], randOptions: generateUniqueRandomNumbers(4, 0, 4)};
    });
    setQuestions(quests);
  }, []);

  const [formData, setFormData] = React.useState({});

  function handleChange(event){
    const {name, value} = event.target;
    setFormData(oldFormData => {
      return {...oldFormData, [name]: value}; 
    })
  };

  function handleSubmit(event){
    event.preventDefault();
    if(Object.keys(formData).length === 5){
      setShowAnswerAll(false);
      const ids = [questions[0].id, questions[1].id, questions[2].id, questions[3].id, questions[4].id];
      setUserSelections(ids.map(id => formData[id]));
      setAnswers(questions.map(question => question.answer));
      setSubmitted(true);
    }else{
      setShowAnswerAll(true);
    }
  }

  React.useEffect(() => {
    setScore(0);
    for (let j = 0; j < answers.length; j++) {
      if(userSelections[j] === answers[j]){
        setScore(oldScore => oldScore + 1);
      }      
    }
  }, [answers, userSelections]);

  function newGame(){
    const randomNumbers = generateUniqueRandomNumbers(5, 0, allQuestions.results.length);
    const quests = randomNumbers.map(num => {
      const quest = allQuestions.results[num];
      return {id: nanoid(), question: quest.question, answer: quest.correct_answer, options: [...quest.incorrect_answers, quest.correct_answer], randOptions: generateUniqueRandomNumbers(4, 0, 4)};
    });
    setQuestions(quests);
    setAnswers({});
    setUserSelections({});
    setFormData({});
    setScore(0);
    setSubmitted(false);
    setShowAnswerAll(false);
  }

  const finalQuestions = questions.map(question => <Question key={question.id} id={question.id} question={question.question} index={question.randOptions} options={question.options} handleChange={handleChange} answers={answers} userSelections={userSelections} submitted={submitted} />)

  return (
    <div className="App">
      <div className='circle1'></div>
      <div className='circle2'></div>
      {!page2 && <div className='intro'>
        <h1>TeeJay's Quizzical</h1>
        <p>Knowledge is Power, and You're About to Unleash It!</p>
        <button onClick={changePage}>Start Quiz</button>
      </div>}
      
     {page2 && <form className='questions-wrapper'>
        {finalQuestions}
        {!submitted && <div className='check-btn-wrapper'>
          <button className='check-btn' onClick={handleSubmit}>Check Answers</button>
          <button type='button' className='check-btn' onClick={newGame}>New Questions</button>
        </div>}
      </form>}

      {showAnswerAll && <h5 style={{color: "red"}}>You have to answer all questions</h5>}

      {submitted && <div className='result'>
        <h6>You scored {score}/5 correct answers</h6>
        <button type='button' className='check-btn' onClick={newGame}>Play Again</button>
      </div>}
    </div>
  );
}