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

// New Lesson Plan Interfaces
export interface LessonStage {
  time: string;
  stage: string;
  aim: string;
  procedure: string;
  teacher_talk?: string;
  interaction?: string;
  materials?: string;
}

export interface VocabularyItem {
  word: string;
  context: string;
  examples: string[];
  practice: string[];
  notes?: string;
}

export interface GrammarPoint {
  point: string;
  simple_explanation: string;
  form?: string;
  classroom_focus?: string;
  meaning_checks_CCQs?: string[];
  listening_strategies?: string[];
  pronunciation?: string[];
  common_errors_and_fixes?: string[];
  creative_practice: string[];
  reference_note?: string;
}

export interface Question {
  type: string;
  q: string;
  options?: string[];
  answer?: string;
  answer_key?: string;
}

export interface Quiz {
  name: string;
  timing_minutes: number;
  questions?: Question[];
  task?: string;
  checklist_answer_key?: string[];
  answer_key_guidance?: string[];
}

export interface LessonPlanData {
  unit: string;
  planning_reasoning: string;
  lesson_plan: LessonStage[];
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  quizzes_tests: Quiz[];
  creative_tasks: string[];
}