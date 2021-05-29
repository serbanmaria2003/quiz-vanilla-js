const scoreResult = document.querySelector("#score-result");
const submitBtn = document.querySelector('#submit-btn');
const quizContainer = document.querySelector(".quiz-container");
const resetBtn = document.querySelector("#reset-btn");

let quizContent;
let quizView;


fetch('http://quiz.siit.ro/api/questions')
  .then(response => response.json())
  .then(data => initQuiz(data));

function initQuiz(data)
{
  quizContent = new QuizContent(data);

  quizView = new QuizView(quizContent.quizData, quizContainer, scoreResult);
  quizView.renderQuiz();

  selectAnswerBehaviour();
}

function selectAnswerBehaviour()
{
  let answersRadioBtns = document.querySelectorAll(".quiz-answer");
  for(let i = 0; i < answersRadioBtns.length; i++)
  {
    answersRadioBtns[i].addEventListener('click', function(){
      let questionIndex = parseInt(answersRadioBtns[i].dataset.questionIndex);
      let answerIndex = parseInt(answersRadioBtns[i].dataset.answerIndex);
      quizContent.setUserAnswer(questionIndex, answerIndex);
    });
  }
}

submitBtn.addEventListener("click", function(){
  quizContent.evaluateResult();
  quizView.displayScore(quizContent.score);
  let correctAnswers = quizContent.getCorrectAnswerIndexes();

  quizView.displayFinalResult(correctAnswers, quizContent.userAnswers);
});

resetBtn.addEventListener('click', function(){
  quizContent.resetQuizContent();
  quizView.renderQuiz();
  selectAnswerBehaviour();
});
