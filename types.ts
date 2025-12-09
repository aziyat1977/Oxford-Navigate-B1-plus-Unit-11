export interface LessonPart {
  id: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum GameState {
  LOCKED,
  UNLOCKED,
  COMPLETED
}

export interface PolysemyItem {
  id: number;
  clue1: string;
  clue2: string;
  answer: string;
}