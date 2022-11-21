import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../Modules/Entity/post';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private apiServerUrl ='http://localhost:8086';

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/post/all`);
  }

  public addPost(post: Post, id: number): Observable<Post | null> {
    return this.http.post<Post>(`${this.apiServerUrl}/post/add/${id}`, post);
  }

  public getPostById(id: number): Observable<any>  {
    return this.http.get<Post>(`${this.apiServerUrl}/post/postById/${id}`);
  }

  public getPostByUser(id: number): Observable<any>  {
    return this.http.get<Post>(`${this.apiServerUrl}/post/postByUser/${id}`);
  }

  public deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/post/delete/${id}`);
  }

  public updatePost(id: number,publication: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiServerUrl}/post/updatePost/${id}/${publication}`, null);
  }
}
