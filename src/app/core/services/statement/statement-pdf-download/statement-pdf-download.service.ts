import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatementPDF } from 'src/app/core/domain/statement-pdf.model';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class StatementPdfDownloadService {

  constructor(private http: HttpClient) { }

  pdfDownload(payload: StatementPDF, fileName: string): void {
    this.http.post(environment.apiUrl + urlList.statement.getPdf, payload).subscribe( (res: any) => {
      const anchor = document.createElement('a');
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      anchor.setAttribute('href', url);
      anchor.setAttribute('download', fileName);

      const clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      anchor.dispatchEvent(clickEvent);
    });
  }

}
