import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, take} from 'rxjs/operators';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import {Cloudinary} from '@cloudinary/angular-5.x';


@Injectable()
export class FileService {

  public downloadURL;

  constructor(public afStorage: AngularFireStorage, private cloudinary: Cloudinary) {
  }

  uploadFile(file) {
    const task = this.afStorage.upload('/images', file);
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.afStorage.ref('/images').getDownloadURL())
    ).subscribe();
  }

  uploadFileCloudinary() {
    // this.cloudinary.cloudinaryInstance.
  }
}
