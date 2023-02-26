import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConsultListExamDTOI } from '../dto/consultListExamDTOI';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private url: string  = `${environment.HOST}/consults`;

  constructor(
    private http: HttpClient
  ) { }

  saveTransational(dto: ConsultListExamDTOI){
    return this.http.post(this.url,dto);
  }
}
