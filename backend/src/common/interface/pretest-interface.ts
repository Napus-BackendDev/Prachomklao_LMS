export interface PretestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface PretestAnswer {
  id: string;
  question: string;
  options: string[];
  answer?: string;
  correctAnswer: string;
}

export interface PretestScore {
  message: string;
  score: number;
  total: number;
}
