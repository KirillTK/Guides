import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Theme} from '../model/Theme';
import {Tag} from '../model/Tag';
import {Instruction} from '../model/Instruction';
import {Comment} from '../model/Comment';
import {AuthService} from './AuthService';


@Injectable()
export class InstructionService {


  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getUserInstructions(id: string): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(`/api/getUserInstructions/${id}`);
  }

  postInstruction(instruction) {
    console.log('auth token', this.auth.token);
    return this.http.post(`/api/postInstruction/${this.auth.token}`, instruction);
  }

  getThemeInstruction(): Observable<Theme[]> {
    return this.http.get<Theme[]>('/api/getThemes');
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('/api/getTags');
  }

  deleteInstruction(id: string): Observable<Instruction[]> {
    return this.http.delete<Instruction[]>(`/api/deleteInstruction/${id}/${this.auth.token}`);
  }

  updateInstruction(id: string, instruction: Instruction) {
    return this.http.put(`/api/updateInstruction/${id}/${this.auth.token}`, instruction);
  }

  getInstructionById(id: string) {
    return this.http.get<Instruction>(`/api/getInstructionById/${id}`);
  }

  postComment(comment: Comment) {
    return this.http.post(`/api/postComment/${this.auth.token}`, comment);
  }

  getCommentsByIdInstruction(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/getComments/${id}`);
  }

}
