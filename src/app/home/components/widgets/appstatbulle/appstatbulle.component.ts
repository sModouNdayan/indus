import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-appstatbulle',
  templateUrl: './appstatbulle.component.html',
  styleUrls: ['./appstatbulle.component.scss']
})
export class AppstatbulleComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  chartbulle1:any;
  chartbulle2:any;

  bubbleChartColors: Array<any> = [
    { // grey
      backgroundColor: '#194dd1'
     /* pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'*/
    },
    { // dark grey
      backgroundColor: '#e0d90d'
    },
    { // grey
      backgroundColor: '#e0d90d' 
    },
    { // grey
      backgroundColor: '#5ae00d'
    }  
  ];

  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 4, y: 21, r: 10 },
        { x: 17, y: 5, r: 15 },
        { x: 26, y: 18, r: 23 },
        { x: 7, y: 28, r: 8 },
        { x: 9, y: 13, r: 20 },
        { x: 5, y: 14, r: 9 },
        { x: 1, y: 22, r: 5 },
        { x: 9, y: 29, r: 25 },
        
      ],
      
      label: 'Series A',
    },
  ];

  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    this.getProfile(this.profilId);
    this.drawing();
  }

  drawing(){
    this.chartbulle1=new Chart({
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    title: {
        text: 'Représentation du nombre utilisateur en bulles'
    },

    xAxis: {
        gridLineWidth: 1,
        accessibility: {
            rangeDescription: 'Range: 0 to 100.'
        }
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        accessibility: {
            rangeDescription: 'Range: 0 to 100.'
        }
    },
    series: [{
        type:undefined,
        data: [
            [9, 81, 63],
            [98, 5, 89],
            [51, 50, 73],
            [41, 22, 14],
            [58, 24, 20],
            [78, 37, 34],
            [55, 56, 53],
            [18, 45, 70],
            [42, 44, 28],
            [3, 52, 59],
            [31, 18, 97],
            [79, 91, 63],
            [93, 23, 23],
            [44, 83, 22]
        ],
        
    }, {
      type:undefined,
        data: [
            [42, 38, 20],
            [6, 18, 1],
            [1, 93, 55],
            [57, 2, 90],
            [80, 76, 22],
            [11, 74, 96],
            [88, 56, 10],
            [30, 47, 49],
            [57, 62, 98],
            [4, 16, 16],
            [46, 10, 11],
            [22, 87, 89],
            [57, 91, 82],
            [45, 15, 98]
        ],
        
    }]
    })

    this.chartbulle2=new Chart({
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    title: {
        text: 'Représentation du nombre de dossiers en bulle'
    },

    xAxis: {
        gridLineWidth: 1,
        accessibility: {
            rangeDescription: 'Range: 0 to 100.'
        }
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        accessibility: {
            rangeDescription: 'Range: 0 to 100.'
        }
    },
    series: [{
        type:undefined,
        data: [
            [9, 81, 63],
            [98, 5, 89],
            [51, 50, 73],
            [41, 22, 14],
            [58, 24, 20],
            [78, 37, 34],
            [55, 56, 53],
            [18, 45, 70],
            [42, 44, 28],
            [3, 52, 59],
            [31, 18, 97],
            [79, 91, 63],
            [93, 23, 23],
            [44, 83, 22]
        ],
        
    }, {
      type:undefined,
        data: [
            [42, 38, 20],
            [6, 18, 1],
            [1, 93, 55],
            [57, 2, 90],
            [80, 76, 22],
            [11, 74, 96],
            [88, 56, 10],
            [30, 47, 49],
            [57, 62, 98],
            [4, 16, 16],
            [46, 10, 11],
            [22, 87, 89],
            [57, 91, 82],
            [45, 15, 98]
        ],
        
    }]
    })
  }

  getProfile(id){
    this.widgetS.checkProfil(id)
    .subscribe(resp=>{
      this.profil=resp;
    },err=>{
      console.log(err);
    })
  }

}
