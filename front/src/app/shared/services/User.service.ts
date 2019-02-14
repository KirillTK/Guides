import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  registerUser(user) {
    console.log('service', user);
    return this.http.post('http://localhost:3000/api/registration', user);
  }


}
