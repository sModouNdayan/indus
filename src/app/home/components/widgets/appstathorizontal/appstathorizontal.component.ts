import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-appstathorizontal',
  templateUrl: './appstathorizontal.component.html',
  styleUrls: ['./appstathorizontal.component.scss']
})
export class AppstathorizontalComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  chartho1:any;
  chartho2:any;
  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    this.getProfile(this.profilId);
    this.drawing();
  }


  drawing(){
    this.chartho1=new Chart({
      chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Source:'
    },
    xAxis: {
        categories: ['janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nombre utilisateur par profil',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
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


    this.chartho2=new Chart({
      chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Source:'
    },
    xAxis: {
        categories: ['janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nombre de dossiers',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
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
