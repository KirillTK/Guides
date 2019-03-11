export interface Comment {
  _id?: string;
  comment: string;
  userName: string;
  userID: string;
  score: number;
  instructionID: string;
  likes?: number;
}
