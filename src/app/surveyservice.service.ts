import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Survey } from './Survey';


@Injectable({
  providedIn: 'root'
})
export class SurveyserviceService {
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.BASE_URL}/api/survey`);
  }

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${this.BASE_URL}/api/survey`, survey);
  }

  getSurveyCategory(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.BASE_URL}/api/survey/age`);
  }

  getSurveyAverageCar(): Observable<string> {
    return this.http.get<string>(`${this.BASE_URL}/api/survey/averagecar`);
  }

  getSurveyTargetableclients(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.BASE_URL}/api/survey/targetableclients`);
  }

  getSurveyCarmodel(cmake: string): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.BASE_URL}/api/survey/carmodel/${cmake}`);
  }

  getSurveyCarmake(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.BASE_URL}/api/survey/carmake`);
  }

}
