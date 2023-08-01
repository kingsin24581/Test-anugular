import { Component, inject } from '@angular/core';
import { Choice, Question } from '../question';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizService: QuizService = inject(QuizService)
  questions : Question[] = [];
  currentQuestionIndex = 0;
  isEnd = false
  score = 0
  
  constructor(){
    this.quizService.getQuizeData().then((questions) =>{
      this.questions = questions
    })
   this.reset()
  }
  async init(){
    
  }
  onClickChoice(choice: Choice) {
    console.log('User clicked ' + choice.text);
    if(choice.isAnswer){
      this.score++
    }
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.questions[this.currentQuestionIndex].choices.sort((a,b) => 0.5 -Math.random())
    }else{
      this.isEnd=true
    }
  }

  playSound() {
    
  }
  onClickreset(){
    this.reset()
  }
  private reset(){
    this.isEnd = false
    this.currentQuestionIndex = 0
    this.score =0
  }
}