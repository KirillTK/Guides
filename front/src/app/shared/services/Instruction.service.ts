import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class InstructionService {


  constructor(private http: HttpClient) {
  }

  getUserInstruction(id: string) {
    return this.http.get(`http://localhost:3000/api/getUserInstructions/${id}`);
  }

}
