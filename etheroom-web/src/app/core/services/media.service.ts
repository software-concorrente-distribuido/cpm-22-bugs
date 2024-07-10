import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Media } from '../models/media/media.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private mediaApiUrl: string;

  private readonly MEDIA_PATH = 'media';

  constructor(
    private http: HttpClient
  ) { 
    this.mediaApiUrl = `${environment.apiUrl}/${this.MEDIA_PATH}`;
  }

  public create(media: FormData): Observable<Media> {
    return this.http.post<Media>(this.mediaApiUrl, media);
  }

  public findById(id: string): Observable<Media> {
    return this.http.get<Media>(`${this.mediaApiUrl}/${id}`);
  }

  public update(mediaId: string, media: FormData): Observable<Media> {
    return this.http.put<Media>(`${this.mediaApiUrl}/${mediaId}`, media);
  }

  public delete(id: string): Observable<Media> {
    return this.http.delete<Media>(`${this.mediaApiUrl}/${id}`);
  }

}
