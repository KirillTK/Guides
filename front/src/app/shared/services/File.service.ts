import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, take} from 'rxjs/operators';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class FileService {

  public downloadURL;

  constructor(public afStorage: AngularFireStorage, private cloudinary: Cloudinary, private http: HttpClient) {
  }

  uploadFile(file) {
    const task = this.afStorage.upload('/images', file);
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.afStorage.ref('/images').getDownloadURL())
    ).subscribe();
  }

  getPDF(id: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(`/api/getPDF/${id}`, {headers, responseType: 'blob'});
  }
}
