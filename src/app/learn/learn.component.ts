import { Component , inject } from '@angular/core';
import { Choice, Question } from '../question';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {
  
  questions : Question[];
  currentQuestionIndex = 0;
  isEnd = false
  selectedAnswer: string | null = null;
  isAnswerCorrect: boolean | null = null;
  showAnswer: boolean = false;
  correctAnswer: string | null = null;
  
  constructor(private quizService: QuizService) {
    this.questions = this.quizService.getQuizeData();
  }

  onclickNext() {
    console.log('User next ' + this.questions);
    this.currentQuestionIndex++
    this.checkAnswer()
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isEnd = true;
    }
  }
  onclickPrevious(){
    this.currentQuestionIndex--;
    this.checkAnswer()
    if (this.currentQuestionIndex < 0) {
      this.currentQuestionIndex = 0;
    }
  }
  get currentQuestion(): Question | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer() {
    const currentQuestion = this.currentQuestion;
    if (!currentQuestion) {
      return;
    }

    const correctChoice = currentQuestion.choices.find((choice) => choice.isAnswer);
    if (!correctChoice) {
      return;
    }

    this.correctAnswer = correctChoice.text;
    this.showAnswer = true;
  }
  showAllQuestionsAndAnswers() {
    this.showAnswer = true; // To show the correct answer section

    let formattedAnswers = '';
    this.questions.forEach((question, index) => {
      const correctChoice = question.choices.find((choice) => choice.isAnswer);
      if (correctChoice) {
        formattedAnswers += `Question ${index + 1}: ${question.text}\n`;
        formattedAnswers += `Correct Answer: ${correctChoice.text}\n\n`;
      }
    });

    this.correctAnswer = formattedAnswers;
    setTimeout(() => {
      this.showAnswer = false; // Reset showAnswer to hide the "Correct Answer" section after a delay
    }, 5000); // Adjust the delay time (in milliseconds) as needed
  }
}
