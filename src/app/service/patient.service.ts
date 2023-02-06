import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Patient } from '../Model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //private url: string  = environment.HOST + '/patients';
  private url: string  = `${environment.HOST}/patients`;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Patient[]>(this.url);
  }

  findById(id: string){
    return this.http.get(`${this.url}/${id}`);
  }

  save(patient: Patient){
    return this.http.post(this.url,patient);
  }

  update(patient: Patient){
    return this.http.put(this.url,patient);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
