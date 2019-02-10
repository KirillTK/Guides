import {Component} from '@angular/core';
import {FileService} from '../../shared/services/File.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPageComponent {
  public rate = 3.34;


  constructor(private file: FileService, private storage: AngularFireStorage) {
  }

  upload(event) {
    const file = event.target.files[0];
    const filePath = Math.random().toString(36).substring(2);
    const task = this.storage.upload(filePath, file).then(() => {
      const ref = this.storage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        console.log(url);
      });
    });
  }


}
