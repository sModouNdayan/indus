import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';
import { ChartsModule, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-appstathoriempile',
  templateUrl: './appstathoriempile.component.html',
  styleUrls: ['./appstathoriempile.component.scss']
})
export class AppstathoriempileComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  charthoemp1:any;
  charthoemp2:any;
  lineChartColors: Array<any> = [
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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', stack: 'a' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', stack: 'a' }
    ];

    public barChartOptions: ChartOptions = {
      responsive: true,
    };
  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    this.getProfile(this.profilId);
    this.drawing();
  }


  drawing(){


    this.charthoemp1=new Chart({
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Vu empilé du nombre utilisateur créé'
    },
    xAxis: {
        categories:['janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'Intégrateur',
        type:undefined,
        data: [5, 3, 4, 7, 2,4,6,4,9,9,11]
    }, {
        name: 'Traitant n1',
        type:undefined,
        data: [5, 2, 4, 7, 2,4,5,4,9,9,11]
    }, {
        name: 'Traitant n2',
        type:undefined,
        data: [5, 3, 4, 4, 2,3,6,4,9,9,15]
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
