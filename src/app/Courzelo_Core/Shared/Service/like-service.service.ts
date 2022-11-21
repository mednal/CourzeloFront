import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../../Modules/Entity/like';

@Injectable({
  providedIn: 'root'
})
export class LikeServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiServerUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  public addLike(idUser: number, idPost: number): Observable<Like> {
  
    return this.http.post<Like>(`${this.apiServerUrl}/like/add/${idUser}/${idPost}`, this.httpOptions) ;
  }

  public getLiked(idUser: number, idPost: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.apiServerUrl}/like/liked/${idUser}/${idPost}`);
  }
}
