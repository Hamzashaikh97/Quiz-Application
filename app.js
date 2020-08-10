
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function dispalyQuiz() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // show options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      dispalyQuiz();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("bot");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [

  new Question("WWW stands for ?",[
  "World Whole Web",
  "Wide World Web",
  "Web World Wide",
  "World Wide Web"], 
  "World Wide Web"),

  new Question("Where is RAM located ?", [
  "Expansion Board", 
  "External Drive",
   "Mother Board",
  "All of above"], 
  "Mother Board"),

  new Question("Which is not a JavaScript Framework?", [
  "Python Script", 
  "JQuery",
  "Django",
  "NodeJS"], 
  "Django"),

  new Question("Which is used for Connect To Database?", [
    "PHP", 
    "HTML",
     "JS", 
     "All"], 
     "PHP"),
  new Question("If a computer provides database services to other, then it will be known as?", [
    "Web server",
     "Application server", 
     "Database server",
      "FTP server"],
      "Database server")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
dispalyQuiz();