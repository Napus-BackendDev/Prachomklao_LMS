export interface PosttestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PosttestAnswer {
  id: string;
  question: string;
  options: string[];
  answer?: string;
  correctAnswer: string;
  explanation: string;
}

export interface PosttestScore {
  message: string;
  score: number;
  total: number;
}
