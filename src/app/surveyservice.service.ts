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

  getSurveyCategory(): Observable<String[][]> {
    return this.http.get<String[][]>(`${this.BASE_URL}/api/survey/age`);
  }

  getSurveyAverageCar(): Observable<String> {
    return this.http.get<String>(`${this.BASE_URL}/api/survey/averagecar`);
  }

  getSurveyTargetableclients(): Observable<String[][]> {
    return this.http.get<String[][]>(`${this.BASE_URL}/api/survey/targetableclients`);
  }

  getSurveyCarmodel(cmake: String): Observable<String[][]> {
    return this.http.get<String[][]>(`${this.BASE_URL}/api/survey/carmodel/${cmake}`);
  }

  getSurveyCarmake(): Observable<String[][]> {
    return this.http.get<String[][]>(`${this.BASE_URL}/api/survey/carmake`);
  }

}