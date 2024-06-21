import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export namespace Files {
  export namespace Send {
    export interface GetPdf {
      namePDF: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getPdfUrl(namePDF: Files.Send.GetPdf['namePDF']) {
    return `http://localhost:3333/files/${namePDF}`;
  }
}
