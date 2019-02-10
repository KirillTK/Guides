import {Component, ElementRef, ViewChild} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
  selector: 'app-write-instruction',
  templateUrl: './write-instruction.component.html',
  styleUrls: ['./write-instruction.component.css']
})
export class WriteInstructionComponent {

  public files: UploadFile[] = [];
  public url;
  public steps = [1, 2, 3];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (ev: ProgressEvent) => {
            // this.url = ev.target.result;
          };

          console.log(droppedFile.relativePath, file);

        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
