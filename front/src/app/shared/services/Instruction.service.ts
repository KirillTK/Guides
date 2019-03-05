import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent, Observable, Subject} from 'rxjs';
import {Theme} from '../model/Theme';
import {Tag} from '../model/Tag';
import {Instruction} from '../model/Instruction';
import {Comment} from '../model/Comment';
import {AuthService} from './AuthService';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import * as socketIo from 'socket.io-client';

@Injectable()
export class InstructionService {

  private _userInstructions: Subject<Instruction[]> = new Subject<Instruction[]>();
  userInstructions = this._userInstructions.asObservable();

  socket = socketIo('http://localhost:3000');

  constructor(private http: HttpClient, private auth: AuthService) {
    this.socket.on('newInstruction', (instructions: Instruction[]) => {
      console.log(instructions);
      this.setUserInstructions(instructions);
    });
  }

  setUserInstructions(instructions: Instruction[]) {
    this._userInstructions.next(instructions);
  }

  getUserInstructions(id: string): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(`/api/getUserInstructions/${id}`);
  }

  postInstruction(instruction) {
    return this.http.post(`/api/postInstruction`, instruction);
  }

  getUserFreshInstructions(idUser) {
    this.socket.emit('addInstruction', idUser);
  }

  getThemeInstruction(): Observable<Theme[]> {
    return this.http.get<Theme[]>('/api/getThemes');
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('/api/getTags');
  }

  deleteInstruction(id: string): Observable<Instruction[]> {
    return this.http.delete<Instruction[]>(`/api/deleteInstruction/${id}`);
  }

  updateInstruction(id: string, instruction: Instruction) {
    return this.http.put(`/api/updateInstruction/${id}`, instruction);
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

  getSearchObserver(element: ElementRef) {
    return fromEvent(element.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 1),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap((text) => ajax(`/api/search/${text}`))
    );
  }

  getTopRatedInstructions(): Observable<Instruction[]> {
    return this.http.get<Instruction[]>('/api/getTopRatedInstructions');
  }

  getLatestInstructions(): Observable<Instruction[]> {
    return this.http.get<Instruction[]>('/api/getLatestInstructions');
  }

  getInstructionsByTag(tag: string, page: number) {
    return this.http.get<Instruction[]>(`/api/getInstructionsByTag/${tag}/${page}`);
  }

}
