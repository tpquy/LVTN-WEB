import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/data/service/file.service';
import { File as SchemaFile }  from 'data/schema/file';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  files: SchemaFile[];

  constructor(private fileService: FileService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.fileService.getFiles().subscribe(files => this.files = files);
  }

}
