import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StefamonService {

  private readonly URL: string = `${environment.urlBackend}/stefamon`

  constructor(
    private http: HttpClient
  ) { }

  listAll(): Observable<Stefamon[]> {
    return this.http.get<Stefamon[]>(this.URL + "/todos");
  }

}
