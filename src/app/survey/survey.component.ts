import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SurveyserviceService } from '../surveyservice.service';
import { User } from '../User';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

//Survey component to show survey form
export class SurveyComponent implements OnInit {

  public infoMsg: string;
  public errorMsg: string;
  genderForms: any;
  carmodelForms:any;
  submitted = false;

  public userModel = new User(0, "","","","","",0,"","");

   constructor(private surveyService: SurveyserviceService, private formBuilder: FormBuilder) { 

    this.genderForms = ['Male', 'Female', 'Other'];
    this.carmodelForms = ['BMW', "MERCEDEZ", 'HYUNDAI', 'AUDI' , 'SAAB'];
    this.infoMsg = '';
    this.errorMsg = '';

  }

  ngOnInit(): void {
  }

  onSubmit(tempForm:User) {
    this.infoMsg = '';
    this.errorMsg = '';
    this.submitted = true;
    this.userModel = tempForm;

    //for temporary check
    // console.log("tempForm: "+tempForm);
    // console.log("userModel: "+this.userModel);
    this.surveyService.createSurvey(this.userModel)
    .subscribe((createdSurvey:User) => {
      if(createdSurvey.age< 18) {
        this.infoMsg = 'Survey submitted Successfully. Thanks for filling out our form!';
      } else 
      if(createdSurvey.firstcar=="yes") {
        this.infoMsg = 'Survey submitted Successfully. We are targeting more experienced clients, thank you for your interest.';
      } else {
      this.infoMsg = 'Survey submitted Successfully, Thank You!!';
      }
      this.errorMsg = '';
    },
    (error: ErrorEvent) => {
       this.errorMsg = "Error: "+error.error.message;
       this.infoMsg = '';
      });
  }

  isValidBMWModel():boolean {
    if(this.userModel.carmake != "BMW") {
      return true;
    }

    let regexp1 = new RegExp('^[xXzZ][0-9]{1}$');
    let regexp2= new RegExp('^[mM]{0,1}[0-9]{3}[diDI]{0,1}$');
    let firstReg:boolean = regexp1.test(this.userModel.carmodel);
    let secondReg:boolean = regexp2.test(this.userModel.carmodel);
    
    return (firstReg || secondReg);
  }
}

