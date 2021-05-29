class QuizContent {
  constructor(quizData)
  {
    this.quizQuestionsPool = quizData;
    this.quizData = [];
    this.resetQuizContent();
  }

  resetQuizContent()
  {
    this.extractQuizQuestions(5);
    this.initUserAnswers();
    this.score = 0;
    this.scrambleQuizData();
  }

  extractQuizQuestions(questionsNumber)
  {
    let questionsPool = [...this.quizQuestionsPool];

    this.quizData.length = 0;
    for (let i = 0; i < questionsNumber; i++)
    {
      let randomPos = this.generateRandomElementIndex(questionsPool.length);
      let extract = questionsPool.splice(randomPos, 1);
      this.quizData.push(extract[0]);
    }
  }

  initUserAnswers()
  {
    this.userAnswers = [];
    for (let i = 0; i < this.quizData.length; i++)
    {
      this.userAnswers[i] = null;
    }
  }

  scrambleQuizData()
  {
    this.scrambleQuizQuestions();
    this.scrambleQuizAnswers();
  }

  scrambleQuizQuestions()
  {
    for(let i = 0; i < this.quizData.length; i++)
    {
      let index1 = this.generateRandomElementIndex(this.quizData.length);
      let index2 = this.generateRandomElementIndex(this.quizData.length);
      if(index1 != index2)
      {
        let aux = this.quizData[index1];
        this.quizData[index1] = this.quizData[index2];
        this.quizData[index2] = aux;
      }
    }
  }
  scrambleQuizAnswers()
  {
    for (let i = 0; i < this.quizData.length; i++)
    {
      for (let j = 0; j < this.quizData[i].answers.length * 4; j++)
      {
        let index1 = this.generateRandomElementIndex(this.quizData[i].answers.length);
        let index2 = this.generateRandomElementIndex(this.quizData[i].answers.length);
        if(index1 != index2)
        {
          let aux = this.quizData[i].answers[index1];
          this.quizData[i].answers[index1] = this.quizData[i].answers[index2];
          this.quizData[i].answers[index2] = aux;
        }
      }
    }
  }

  generateRandomElementIndex(arrayLength)
  {
    return Math.floor(Math.random() * arrayLength);
  }

  setUserAnswer(questionIndex, answerIndex)
  {
    this.userAnswers[questionIndex] = answerIndex;
  }

  evaluateResult()
  {
    let rightAnswers = 0;
    for (let i = 0; i < this.quizData.length; i++)
    {
      let userIndex = this.userAnswers[i];
      if(this.userAnswers[i] !== null && this.quizData[i].answers[userIndex].right === "1")
        rightAnswers++;
    }
    let score = rightAnswers / this.quizData.length * 100
    this.score = parseFloat(score.toFixed(2));
  }

  getCorrectAnswerIndexes()
  {
    let result = [];
    for (let i = 0; i < this.quizData.length; i++)
    {
      for (let j = 0; j < this.quizData[i].answers.length; j++)
      {
        if(this.quizData[i].answers[j].right === "1")
        {
          result.push(j);
          break;
        }
      }
    }
    return result;
  }

}
