import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Theme} from '../model/Theme';


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

}
