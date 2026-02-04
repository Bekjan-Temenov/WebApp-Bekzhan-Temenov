
export enum Perspective {
  USER = 'USER',
  BUSINESS = 'BUSINESS',
  TECH = 'TECH'
}

export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  problem: string;
  constraints: string;
  solution: string;
  result: string;
  perspectives: {
    [key in Perspective]: {
      title: string;
      content: string;
    };
  };
}

export interface EngineeringDecision {
  topic: string;
  decision: string;
  why: string;
  tradeoffs: string[];
}
