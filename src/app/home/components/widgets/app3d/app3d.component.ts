import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-app3d',
  templateUrl: './app3d.component.html',
  styleUrls: ['./app3d.component.scss']
})
export class App3dComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  chart3d:any;
  chart3d1:any;
 
  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    this.getProfile(this.profilId); 
    this.drawing();
  }


  drawing(){
    
    this.chart3d=new Chart({
      chart: {
        //renderTo: 'container',
        margin: 100,
        type: 'scatter3d',
        animation: false,
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 30,
            depth: 250,
            viewDistance: 5,
            fitToPlot: false,
            frame: {
                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
               
            }
        }
    },
    title: {
        text: 'Draggable box'
    },
    subtitle: {
        text: 'Click and drag the plot area to rotate in space'
    },
   
    yAxis: {
        min: 0,
        max: 10,
        title: null
    },
    xAxis: {
        min: 0,
        max: 10,
        gridLineWidth: 1
    },
    zAxis: {
        min: 0,
        max: 10,
        showFirstLabel: false
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Data',
        type:undefined,
        colorByPoint: true,
        accessibility: {
            exposeAsGroupOnly: true
        },
        data: [
            [1, 6, 5], [8, 7, 9], [1, 3, 4], [4, 6, 8], [5, 7, 7], [6, 9, 6],
            [7, 0, 5], [2, 3, 3], [3, 9, 8], [3, 6, 5], [4, 9, 4], [2, 3, 3],
            [6, 9, 9], [0, 7, 0], [7, 7, 9], [7, 2, 9], [0, 6, 2], [4, 6, 7],
            [3, 7, 7], [0, 1, 7], [2, 8, 6], [2, 3, 7], [6, 4, 8], [3, 5, 9],
            [7, 9, 5], [3, 1, 7], [4, 4, 2], [3, 6, 2], [3, 1, 6], [6, 8, 5],
            [6, 6, 7], [4, 1, 1], [7, 2, 7], [7, 7, 0], [8, 8, 9], [9, 4, 1],
            [8, 3, 4], [9, 8, 9], [3, 5, 3], [0, 2, 4], [6, 0, 2], [2, 1, 3],
            [5, 8, 9], [2, 1, 1], [9, 7, 6], [3, 0, 2], [9, 9, 0], [3, 4, 8],
            [2, 6, 1], [8, 9, 2], [7, 6, 5], [6, 3, 1], [9, 3, 1], [8, 9, 3],
            [9, 1, 0], [3, 8, 7], [8, 0, 0], [4, 9, 7], [8, 6, 2], [4, 3, 0],
            [2, 3, 5], [9, 1, 4], [1, 1, 4], [6, 0, 2], [6, 1, 6], [3, 8, 8],
            [8, 8, 7], [5, 5, 0], [3, 9, 6], [5, 4, 3], [6, 8, 3], [0, 1, 5],
            [6, 7, 3], [8, 3, 2], [3, 8, 3], [2, 1, 6], [4, 6, 7], [8, 9, 9],
            [5, 4, 2], [6, 1, 3], [6, 9, 5], [4, 8, 2], [9, 7, 4], [5, 4, 2],
            [9, 6, 1], [2, 7, 3], [4, 5, 4], [6, 8, 1], [3, 4, 0], [2, 2, 6],
            [5, 1, 2], [9, 9, 7], [6, 9, 9], [8, 4, 3], [4, 1, 7], [6, 2, 5],
            [0, 4, 9], [3, 5, 9], [6, 9, 1], [1, 9, 2]]
    }]
    })
    this.chart3d.setOptions({
      colors: Highcharts.getOptions().colors.map(function (color) {
          return {
              radialGradient: {
                  cx: 0.4,
                  cy: 0.3,
                  r: 0.5
              },
              stops: [
                  [0, color],
                  [1, Highcharts.color(color).brighten(-0.2).get('rgb')]
              ]
          };
      })
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
