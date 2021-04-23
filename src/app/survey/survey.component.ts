import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarInfo } from '../CarInfo';
import { SurveyserviceService } from '../surveyservice.service';
import { Survey } from '../Survey';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

// Survey component to show survey form
export class SurveyComponent implements OnInit {

  public infoMsg: string;
  public errorMsg: string;
  genderForms: any;
  carmodelForms: any;
  submitted = false;

  public surveyModel = new Survey(0, '', '', '', '', '', 0, '', '', []);

  constructor(private surveyService: SurveyserviceService, private formBuilder: FormBuilder) {

    this.genderForms = ['Male', 'Female', 'Other'];
    this.carmodelForms = ['BMW', 'MERCEDEZ', 'HYUNDAI', 'AUDI', 'SAAB'];
    this.infoMsg = '';
    this.errorMsg = '';
  }

  ngOnInit(): void {
  }

  onSubmit(tempForm: Survey): void {
    this.infoMsg = '';
    this.errorMsg = '';

    this.errorMsg = this.validateCars();
    if (this.errorMsg !== '') {
      return;
    }

    this.submitted = true;
    tempForm.cars = this.surveyModel.cars;
    this.surveyModel = tempForm;

    this.surveyService.createSurvey(this.surveyModel)
      .subscribe((createdSurvey: Survey) => {
        if (createdSurvey.age < 18) {
          this.infoMsg = 'Survey submitted Successfully. Thanks for filling out our form!';
        } else
          if (createdSurvey.firstcar === 'yes') {
            this.infoMsg = 'Survey submitted Successfully. We are targeting more experienced clients, thank you for your interest.';
          } else {
            this.infoMsg = 'Survey submitted Successfully, Thank You!!';
          }
        this.errorMsg = '';
      },
        (error: ErrorEvent) => {
          this.errorMsg = 'Error: ' + error.error.message;
          this.infoMsg = '';
        });
  }

  isValidBMWModel(index: number): boolean {
    if (this.surveyModel.cars[index].carMakeInfo !== 'BMW') {
      return true;
    }

    const regexp1 = new RegExp('^[xXzZ][0-9]{1}$');
    const regexp2 = new RegExp('^[mM]{0,1}[0-9]{3}[diDI]{0,1}$');
    const firstReg: boolean = regexp1.test(this.surveyModel.cars[index].carModelInfo);
    const secondReg: boolean = regexp2.test(this.surveyModel.cars[index].carModelInfo);
    return (firstReg || secondReg);
  }

  setCarsCount(): void {
    this.surveyModel.cars = [];
    for (let itr = 0; itr < this.surveyModel.carscount; itr++) {
      this.surveyModel.cars.push(new CarInfo('', ''));
    }
  }

  validateCars(): string {
    for (let i = 0; i < this.surveyModel.cars.length; i++) {
      if (!this.isValidBMWModel(i)) {
        return 'Mentioned Car Model information is wrong for BMW car';
      }
    }
    return '';
  }

}

