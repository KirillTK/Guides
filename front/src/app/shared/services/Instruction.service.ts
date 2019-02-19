import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class InstructionService {


  constructor(private http: HttpClient) {
  }

  getUserInstructions(id: string) {
    return this.http.get(`/api/getUserInstructions/${id}`);
  }

  postInstruction(instruction) {
    return this.http.post(`/api/postInstruction`, instruction);
  }

}
