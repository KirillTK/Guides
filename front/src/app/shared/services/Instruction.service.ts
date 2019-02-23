import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Theme} from '../model/Theme';
import {Tag} from '../model/Tag';
import {Instruction} from '../model/Instruction';


@Injectable()
export class InstructionService {


  constructor(private http: HttpClient) {
  }

  getUserInstructions(id: string) {
    return this.http.get(`/api/getUserInstructions`);
  }

  postInstruction(instruction) {
    return this.http.post(`/api/postInstruction`, instruction);
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

}
