import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medic } from '../Model/medic';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic> {

  //private url: string  = environment.HOST + '/medics';
  //private url: string  = `${environment.HOST}/medics`;
  //VARIABLE QUE SIRVE PARA ALMACENAR LOS CAMBIOS
  ///////////changing method to private
  private medicChange = new Subject<Medic[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/medics`)
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
