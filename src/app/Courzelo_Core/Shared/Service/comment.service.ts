import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private apiServerUrl ='http://localhost:8086';

  public addComment(comment: Comment, idUser: number, idPost: number): Observable<Comment | null> {
    return this.http.post<Comment>(`${this.apiServerUrl}/comment/add/${idUser}/${idPost}`, comment);
  }

  public getComments(idPost: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiServerUrl}/comment/getComments/${idPost}`);
  }
  
  public deleteComment(idComment: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/comment/deleteComment/${idComment}`);
  }
  public getComment(idComment: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiServerUrl}/comment/getCommentById/${idComment}`);
  }
  public updateComment(idComment:number, commentaire: string): Observable<Comment | null> {
    return this.http.put<Comment | null>(`${this.apiServerUrl}/comment/update/${idComment}/${commentaire}`, null);
  }
}
