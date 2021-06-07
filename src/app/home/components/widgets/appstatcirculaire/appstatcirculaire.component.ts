import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-appstatcirculaire',
  templateUrl: './appstatcirculaire.component.html',
  styleUrls: ['./appstatcirculaire.component.scss']
})
export class AppstatcirculaireComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  chart3:any;
  chart6:any;
  chart9:any;
  nbrIndusUtiPro:any={}
  constjson:any=[]
  pielabelindus:any=[]
  piedonneeindus:any=[]
    pieChartLabels = [];
    pieChartData = [];
    pieChartType = 'pie';
  pieChartColors: Array <any> = [{
    backgroundColor: ['#fc5858', '#19d863', '#fdf57d','#7a1f32','#29a3c2'],
    borderColor: ['rgba(252, 235, 89, 0.2)', 'rgba(77, 152, 202, 0.2)', 'rgba(241, 107, 119, 0.2)']
  }];
  pieChartOptions: ChartOptions = {
    responsive: true,
    };
    pieChartPlugins = [];
    public pieChartLegend = true;
    
  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    this.getProfile(this.profilId);
    //this.plotSimpleBarChart();
    //this.plotSimpleBarChart1();
    this.drawing();
  }

  openPDF():void {
    let DATA = document.getElementById('htmlDataCircle');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('dashbord-data.pdf');
    });     
  }
  drawing(){

    this.widgetS.nbrIndusUtiParProfil().subscribe(res => {
      this.nbrIndusUtiPro = res.data;
        
     // console.log("++++++++++++++++nbrIndusUtiParProfil+++++++++++++++++"+JSON.stringify(this.nbrIndusUtiPro));
      for (var i = 0; i < this.nbrIndusUtiPro.length; i++) {
        
         
        //console.log("-----------------------------------------------------------"+this.nbrIndusUtiPro[i].pro_libelle);
        //console.log("-----------------------------------------------------------"+this.nbrIndusUtiPro[i]["COUNT(td_utilisateur.uti_id)"]); 
        this.constjson.push({
          name: this.nbrIndusUtiPro[i].pro_libelle,
          y: this.nbrIndusUtiPro[i]["COUNT(td_utilisateur.uti_id)"],
          sliced: true,
          selected: true
          })  
          this.piedonneeindus.push(this.nbrIndusUtiPro[i]["COUNT(td_utilisateur.uti_id)"])  
          this.pielabelindus.push(this.nbrIndusUtiPro[i].pro_libelle)  
        
    }
   // console.log("-------------------------constjson----------------------------------"+JSON.stringify(this.constjson));
  
    this.pieChartLabels =this.pielabelindus;
    this.pieChartData = this.piedonneeindus;
    this.pieChartType = 'pie';
 /* this.chart3 = new Chart({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
      text: 'Nombre utilisateurs par profil'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} </b>'
    },
    accessibility: {
        point: {
         valueSuffix: ''
    }
   },
   plotOptions: {
     pie: {
    allowPointSelect: true,
    cursor: 'pointer',
    dataLabels: {
    enabled: true,
    format: '<b>{point.name}</b>: {point.y} '
    }
}},
  series: [{ 
     name: 'Répartition par profil',
    type:undefined,
    colorByPoint: true,
    data: this.constjson
}]
  });*/
});
     
    


    this.chart6=new Chart({
        chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
               },
               title: {
                   text: 'Nombre de dossiers'
               },
               tooltip: {
                   pointFormat: '{series.name}: <b>{point.y} </b>'
               },
               accessibility: {
                   point: {
                       valueSuffix: ''
                   }
               },
               plotOptions: {
                   pie: {
                       allowPointSelect: true,
                       cursor: 'pointer',
                       dataLabels: {
                           enabled: true,
                           format: '<b>{point.name}</b>: {point.y} '
                       }
                   }
               },
               series: [{
                   name: 'Brands',
                   type:undefined,
                   colorByPoint: true,
                   data: [{
                      name: 'Soumises',
                       y: 61,
                       sliced: true,
                       selected: true
                   }, {
                       name: 'Traitées',
                       y: 11
                   }, {
                       name: 'Rejetées',
                       y: 8
                 }]
               }]  
    })

    this.chart9=new Chart({
        chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
               },
               title: {
                   text: 'Nombre de dossiers'
               },
               tooltip: {
                   pointFormat: '{series.name}: <b>{point.y} </b>'
               },
               accessibility: {
                   point: {
                       valueSuffix: ''
                   }
               },
               plotOptions: {
                   pie: {
                       allowPointSelect: true,
                       cursor: 'pointer',
                       dataLabels: {
                           enabled: true,
                           format: '<b>{point.name}</b>: {point.y} '
                       }
                   }
               },
               series: [{
                   name: 'Brands',
                   type:undefined,
                   colorByPoint: true,
                   data: [{
                      name: 'Soumises',
                       y: 61,
                       sliced: true,
                       selected: true
                   }, {
                       name: 'Traitées',
                       y: 11
                   }, {
                       name: 'Rejetées',
                       y: 8
                 }]
               }]  
    })
  
  }


 

// chartOptions2:Highcharts.Options= {
//     chart: {
//       plotBackgroundColor: null,
//       plotBorderWidth: null,
//       plotShadow: false,
//       type: 'pie'
//   },
//   title: {
//       text: 'Nombre de dmandes'
//   },
//   tooltip: {
//       pointFormat: '{series.name}: <b>{point.y} </b>'
//   },
//   accessibility: {
//       point: {
//           valueSuffix: ''
//       }
//   },
//   plotOptions: {
//       pie: {
//           allowPointSelect: true,
//           cursor: 'pointer',
//           dataLabels: {
//               enabled: true,
//               format: '<b>{point.name}</b>: {point.y} '
//           }
//       }
//   },
//   series: [{
//       name: 'Brands',
//       type:undefined,
//       colorByPoint: true,
//       data: [{
//           name: 'Soumises',
//           y: 61,
//           sliced: true,
//           selected: true
//       }, {
//           name: 'Traitées',
//           y: 11
//       }, {
//           name: 'Rejetées',
//           y: 8
//       }]
//   }]
// };

// plotSimpleBarChart1() {
//   var chart = Highcharts.chart("highcharts1", this.chartOptions);
//   var chart = Highcharts.chart("highcharts12", this.chartOptions1);
//   var chart = Highcharts.chart("highcharts121", this.chartOptions2);
//   }

saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

  getProfile(id){
    this.widgetS.checkProfil(id)
    .subscribe(resp=>{
      this.profil=resp;
    },err=>{
      console.log(err);
    })
  }

  openExcel(){
    this.widgetS.nbrIndusUtiParProfil().subscribe(res => {
      this.nbrIndusUtiPro = res.data;
      this.widgetS.exportAsExcelFile(this.nbrIndusUtiPro,'nombre utilisateurs par profil')
    },err=>{

    })
  }

  downloadCanvas(event){
     
     let DATA = document.getElementById('htmlDataCircle');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        saveAs(FILEURI, 'utilisateurs.png');
    }); 

  }

  PrintImage(event){  
    let DATA = document.getElementById('htmlDataCircle');  
    html2canvas(DATA).then(canvas => {
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        var windowContent = '<!DOCTYPE html>';
        windowContent += '<html>';
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>';
        windowContent += '<img src="' +FILEURI+ '">';
        windowContent += '</body>';
        windowContent += '</html>';
        
        const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
        printWin.document.open();
        printWin.document.write(windowContent); 
        
        printWin.document.addEventListener('load', function() {
            printWin.focus();
            printWin.print();
            printWin.document.close();
            printWin.close();            
        }, true);
    });  
  }


}
