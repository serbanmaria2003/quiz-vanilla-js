class QuizView
{
  constructor(quizData, quizContainerElem, scoreResultDisplay)
  {
    this.quizData = quizData;
    this.quizContainerElem = quizContainerElem;
    this.scoreResultDisplay = scoreResultDisplay;
  }

  renderQuiz()
  {
    this.quizContainerElem.innerHTML = "";
    for (let i = 0; i < this.quizData.length; i++)
    {
      this.renderQuizItem(i, this.quizData[i]);
    }
  }

  renderQuizItem(index, quizItem)
  {
    let row = document.createElement('div');
    row.className = 'row';
    this.quizContainerElem.appendChild(row);

    let col = document.createElement('div');
    col.className = 'col';
    row.appendChild(col);

    //the question
    let question = document.createElement('h5');
    question.innerText = (index+1) + '.' + quizItem.question;
    col.appendChild(question);

    //the answers
    let list = document.createElement('ul');
    list.className = 'quiz-answers';
    col.appendChild(list);

    for (let i = 0; i < quizItem.answers.length; i++)
    {
      let listItem = document.createElement('li');
      list.appendChild(listItem);

      let input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer-' + index;
      input.className = 'quiz-answer answer-' + index;
      //adding data attributes; data-question-index, data-answer-index
      input.dataset.questionIndex = index;
      input.dataset.answerIndex = i;
      listItem.appendChild(input);

      let text = document.createTextNode(quizItem.answers[i].text);
      listItem.appendChild(text);
    }
  }

  displayScore(score)
  {
    this.scoreResultDisplay.innerText = score;
  }

  displayFinalResult(correctAnswers, userAnswers)
  {
    let questionsUL = document.querySelectorAll(".quiz-answers");
    this.displayCorrectAnswers(correctAnswers, questionsUL);
    this.displayInvalidAnswers(correctAnswers, userAnswers, questionsUL);
  }

  displayCorrectAnswers(correctAnswersIndexes, questionsUL)
  {
    for (let i = 0; i < questionsUL.length; i++)
    {
      let answerLI = questionsUL[i].childNodes[correctAnswersIndexes[i]];
      answerLI.classList.add("alert", "alert-success");
    }
  }

  displayInvalidAnswers(correctAnswers, userAnswers, questionsUL)
  {
    this.unmarkInvalidAnswers();
    for (let i = 0; i < userAnswers.length; i++)
    {
      if(userAnswers[i] !== correctAnswers[i] && userAnswers[i] !== null)
      {
        let answerLI = questionsUL[i].childNodes[userAnswers[i]];
        answerLI.classList.add("alert", "alert-danger");
      }
    }
  }

  unmarkInvalidAnswers()
  {
    let answerLI = document.querySelectorAll(".alert-danger");
    for (let i = 0; i < answerLI.length; i++)
    {
      answerLI[i].classList.remove("alert-danger");
    }
  }
}
