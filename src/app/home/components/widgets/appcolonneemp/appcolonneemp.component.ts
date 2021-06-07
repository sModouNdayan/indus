import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-appcolonneemp',
  templateUrl: './appcolonneemp.component.html',
  styleUrls: ['./appcolonneemp.component.scss']
})
export class AppcolonneempComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  chartcoemp1:any;
  chartcoemp2:any;
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: '#f92c2c'
     /* pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'*/
    },
    { // dark grey
      backgroundColor: '#e0d90d'
    } 
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabelsVertic: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartTypeVertic: ChartType = 'bar';
  public barChartLegendVertic = true;
  public barChartPluginsVertic = [];

    public barChartDataVertic: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', stack: 'a' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', stack: 'a' }
    ];
  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    this.getProfile(this.profilId);
    this.drawing();
  }

  drawing(){
    this.chartcoemp1=new Chart({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Nombre utilisateurs créés'
    },
    xAxis: {
        categories: ['janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
      name: 'Intégrateur',
      type:undefined,
      data: [107, 31, 635, 203,2,3,12,34,67,56,89,102]
  }, {
      name: 'Traitant n1',
      type:undefined,
      data:  [107, 31, 6,203,2,3,12,34,67,56,79,10]
  }, {
      name: 'Traintant n2',
      type:undefined,
      data:  [106, 31,6,20,2,3,12,34,61,45,19,10]
  }]
    })

    this.chartcoemp2=new Chart({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Nombre dossiers'
    },
    xAxis: {
        categories: ['janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series:  [{
      name: 'Traité',
      type:undefined,
      data: [10, 3, 6, 23,2,3,2,4,7,6,8,10]
  }, {
      name: 'en cours',
      type:undefined,
      data:  [7, 1,6,3,2,3,2,4,7,6,9,10]
  }, {
      name: 'Rejeté',
      type:undefined,
      data:  [6,13,6,11,2,3,12,34,1,5,19,10]
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
