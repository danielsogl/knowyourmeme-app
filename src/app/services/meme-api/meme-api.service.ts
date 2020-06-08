import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from 'src/app/interfaces/api.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemeApiService {
  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
  }

  search(query: string): Promise<SearchResult> {
    return this.http
      .get<SearchResult>(`${this.endpoint}/search`, {
        params: { name: query },
      })
      .toPromise();
  }
}
