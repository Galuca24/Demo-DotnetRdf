import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Triplet } from './triplet-model';

@Injectable({
  providedIn: 'root',
})
export class RdfService {
  private readonly BASE_URL = 'http://localhost:5083';
  private readonly BASE_URI = 'http://example.org/';

  private addTripleUrl = `${this.BASE_URL}/api/Graph/triple`;
  private getTriplesUrl = `${this.BASE_URL}/api/Graph`;
  private queryUrl = `${this.BASE_URL}/api/Query`;
  private reasoningUrl = `${this.BASE_URL}/api/Reasoning`;

  constructor(private http: HttpClient) {}

  addTriplet(triplet: Triplet): Observable<string> {
    const subjectUri =
      this.BASE_URI + triplet.firstPersonName.replace(/ /g, '_');
    const objectUri =
      this.BASE_URI + triplet.secondPersonName.replace(/ /g, '_');

    const predicateUri =
      this.BASE_URI + 'relationship/' + triplet.relationship.replace(/ /g, '_');

    const params = new HttpParams()
      .set('s', subjectUri)
      .set('p', predicateUri)
      .set('o', objectUri);

    return this.http.post(this.addTripleUrl, null, {
      params: params,
      responseType: 'text',
    });
  }

  getAllTriples(): Observable<Triplet[]> {
    return this.http.get<any[]>(this.getTriplesUrl).pipe(
      map((rawTriples) =>
        rawTriples.map((t) => ({
          firstPersonName: t.s,
          relationship: t.p,
          secondPersonName: t.o,
        }))
      )
    );
  }

  executeSparqlQuery(query: string): Observable<any[]> {
    return this.http.post<any[]>(this.queryUrl, query);
  }

  applyReasoning(): Observable<string> {
    return this.http.post(this.reasoningUrl, null, {
      responseType: 'text',
    });
  }
}
