import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    //estos datos se inyectaran de quienes lo utilicen
    protected http: HttpClient,
    @Inject("url") protected url: string
  ) { }
  findAll(){
    return this.http.get<T[]>(this.url);
  }

  findById(ID: number){
    return this.http.get<T>(`${this.url}/${ID}`);
  }

  save(t: T){
    return this.http.post(this.url,t);
  }

  update(t: T, ID: number){
    return this.http.put(`${this.url}/${ID}`,t);
  }
  delete(ID: number){
    return this.http.delete(`${this.url}/${ID}`);
  }
}
