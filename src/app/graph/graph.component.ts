import { Component, OnInit } from '@angular/core';
import { SurveyserviceService } from '../surveyservice.service';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { Survey } from '../Survey';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
);


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

//Graph component to draw the graphs

export class GraphComponent implements OnInit {

  public loading = true;
  public errorMsg: String;
  public infoMsg: String;
  public surveys: Survey[];
  carmodelForms: any;

  canvas: any;
  ctx: any;
  graphData: String[][];
  carChart: any;

  constructor(private surveyService: SurveyserviceService) {
    this.errorMsg = "";
    this.infoMsg = '';
    this.surveys = [];
    this.graphData = [];
    this.carmodelForms = ['BMW', "MERCEDEZ", 'HYUNDAI', 'AUDI', 'SAAB'];
  }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((mSurveys: Survey[]) => {
      this.surveys = mSurveys;
      this.loading = false;
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });

    this.surveyService.getSurveyCategory().subscribe((mData: String[][]) => {

      this.graphData = mData;
      this.loading = false;
      this.categorySurveyGraph();
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });

    this.surveyService.getSurveyAverageCar().subscribe((mData: String) => {

      this.infoMsg = "Average Car (per person): " + mData;
      this.loading = false;
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });

    this.surveyService.getSurveyTargetableclients().subscribe((mData: String[][]) => {

      this.graphData = mData;
      this.targetSummaryGraph();
      this.loading = false;
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });

    this.surveyService.getSurveyCarmodel(this.carmodelForms[0]).subscribe((mData: String[][]) => {
      this.carModelGraph(mData[0], mData[1]);
      this.loading = false;
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });

    this.surveyService.getSurveyCarmake().subscribe((mData: String[][]) => {
      this.carMakeDistributionGraph(mData[0], mData[1]);
      this.loading = false;
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });

  }
  categorySurveyGraph(): void {
    this.canvas = document.getElementById('chart_category');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: this.graphData[0],
        datasets: [{
          label: '# of Surveys',
          data: this.graphData[1],
          backgroundColor: [
            'rgb(0,63,92)',
            'rgb(88,80,141)',
            'rgb(188,80,144)',
            'rgb(255,166,0)',
          ],
          borderColor: [

          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 0,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14
              }
            },
            position: 'right',
          },
          title: {
            display: true,
            text: 'Survey Category',
            font: {
              size: 18
            },
          }
        }
      },
    });
  }

  targetSummaryGraph(): void {
    this.canvas = document.getElementById('chart_target');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.graphData[0],
        datasets: [{
          label: '# of Surveys',
          data: this.graphData[1],
          backgroundColor: [
            'rgb(0,63,92)',
            'rgb(188,80,144)',
            'rgb(255,166,0)',
          ],
          borderColor: [
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 10,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18
              }
            },
            position: 'right',
          },
          title: {
            display: true,
            text: 'Target Survey',
            font: {
              size: 18
            },
          }
        },

      },
    });
  }

  carMakeDistributionGraph(plabel: String[], pdata: String[]): void {
    this.canvas = document.getElementById('chart_carmake');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: plabel,
        datasets: [{
          label: '# of Surveys',
          data: pdata,
          backgroundColor: [
            'rgb(0,63,92)',
            'rgb(88,80,141)',
            'rgb(188,80,144)',
            'rgb(255,166,0)',
            'rgb(255,99,71)',
            'rgb(0,128,0)',
          ],
          borderColor: [
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 10,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18
              }
            },
            position: 'right',
          },
          title: {
            display: true,
            text: 'Car Make Distribution',
            font: {
              size: 18
            },
          }
        }
      },
    });
  }

  carModelGraph(plabel: String[], pdata: String[]): void {
    this.canvas = document.getElementById('chart_car');
    this.ctx = this.canvas.getContext('2d');
    if (typeof this.carChart != 'undefined') {
      this.carChart.destroy();
    }


    this.carChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: plabel,
        datasets: [{
          label: "Car Model ",
          data: pdata,
          backgroundColor: [
            'rgb(0,63,92)',
            'rgb(88,80,141)',
            'rgb(188,80,144)',
            'rgb(255,166,0)',
          ],
          borderColor: [
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 10,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18
              }
            },
            position: 'top',
          },
          title: {
            display: true,
            text: 'Car Model Distribution',
            font: {
              size: 18
            },
          }
        }
      },
    });
  }



  updateCarChart(filterVal: any): void {
    this.surveyService.getSurveyCarmodel(filterVal.target.value).subscribe((mData: String[][]) => {
      this.loading = false;
      this.carModelGraph(mData[0], mData[1]);
    },
      (error: ErrorEvent) => {
        this.errorMsg = error.message;
        this.loading = false;
      });
  }

}
