import {Tag} from './Tag';
import {InstructionStep} from './InstructionStep';

export interface Instruction {
  _id?: string;
  name: string;
  description: string;
  theme: string;
  imgHref: string;
  idUser: string;
  tags: Tag[];
  steps: InstructionStep[];
  score: number;
  // comments: Comment[];
  author: string;
  lastEdited: string;
}

