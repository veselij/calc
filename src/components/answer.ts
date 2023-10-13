
export interface Answer {
  correct: number;
  nonCorrect: number;
  history: Equation[],

}

export interface Equation {
  content: string;
  status: boolean;
  correct: number;
}