import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  likeComment(commentID: string, instructionID: string) {
    return this.http.post('/api/likeComment', {commentID, instructionID});
  }
}
