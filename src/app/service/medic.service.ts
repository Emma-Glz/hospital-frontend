import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medic } from '../Model/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  //private url: string  = environment.HOST + '/medics';
  private url: string  = `${environment.HOST}/medics`;
  //VARIABLE QUE SIRVE PARA ALMACENAR LOS CAMBIOS
  ///////////changing method to private
  private medicChange = new Subject<Medic[]>;
  private messageChange = new Subject<string>;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Medic[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Medic>(`${this.url}/${id}`);
  }

  save(medic: Medic){
    return this.http.post(this.url,medic);
  }

  update(medic: Medic){
    return this.http.put(`${this.url}/${medic.idMedic}`,medic);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
  ////////////implement these change ////////////////////

  public getMedicChange(){
    return this.medicChange.asObservable();
  }

  public setMedicChange(data: Medic[]){
    this.medicChange.next(data);
  }

  public getMessageChange(){
    return this.messageChange.asObservable();
  }

  public setMessageChange(data: string){
    this.messageChange.next(data);
  }
}
