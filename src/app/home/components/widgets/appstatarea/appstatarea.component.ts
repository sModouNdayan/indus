import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { WidgetService } from 'src/app/home/services/widget.service';
import { Chart } from 'angular-highcharts';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-appstatarea',
  templateUrl: './appstatarea.component.html',
  styleUrls: ['./appstatarea.component.scss']
})
export class AppstatareaComponent implements OnInit {
  profilId:any = localStorage.getItem('profil');
  profil:any;
  chart4:any;
  chart55:any;
  chart7:any;
  chart10:any;
  nbrCourbeIndusUtiPro:any={}
  nbrCourbeIndusUtiPro2:any={}
  nbrCourbeIndusUtiPro3:any={}
  nbrCourbeIndusUtiPro2Annee:any={}
  nbrCourbeIndusUtiPro3Annee:any={}
  nbrCourbeIndusUtiProAnnee:any={}
  constCourbejson:any=[]
  constCourbejsonannee:any=[]
  formatteddata:any=[]
  formatteddatacolor:any=["#cb55bf","#c23318","#758549","#199905","#6495ED","#FFA500","#00ff00"]
  datacolor:any=[]
  showMainContentArea: Boolean = true;

  lineChartColors: Array<any> = [
    { // grey
      //backgroundColor: '#194dd1',
       borderColor: '#194dd1',
     /* pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'*/
    },
    { // dark grey
      //backgroundColor: '#19d191',
      borderColor: '#19d191',
      pointBackgroundColor: 'rgba(76,175,80,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76,175,80,1)'
    },
    { // grey
      //backgroundColor: '#e0d90d',
       borderColor: '#e0d90d',
      pointBackgroundColor: 'rgba(244,67,54,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(244,67,54,0.8)'
    },
    { // grey
      //backgroundColor: '#5ae00d',
      borderColor: '#5ae00d',
      pointBackgroundColor: 'rgba(103,58,183,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103,58,183,0.8)'
    }  
  ];

  lineChartDataMonth: ChartDataSets[] = []; 
  lineChartOptionsMonth:   any = {}
  lineChartColorsMonth: Color[]
  lineChartLabelsMonth: Label[] 
  lineChartLegendMonth = true;
  lineChartTypeMonth = 'line';
  lineChartPluginsMonth = [];

  lineChartDataAnnee: ChartDataSets[] = []; 
  lineChartOptionsAnnee:   any = {}
  lineChartColorsAnnee: Color[]
  lineChartLabelsAnnee: Label[] 
  lineChartLegendAnnee = true;
  lineChartTypeAnnee = 'line';
  lineChartPluginsAnnee = [];

  constructor(private widgetS:WidgetService) { }

  ngOnInit() {
    //alert('id profile area chart '+ this.profilId);
    this.getProfile(this.profilId);
    //this.plotSimpleBarChart2();
    this.drawing();
  }

  openPDF():void {
    let DATA = document.getElementById('htmlDataArea');
      
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

  ShowHideButtonArea() {
    this.showMainContentArea = this.showMainContentArea ? false : true;
  }
  drawing(){
    this.widgetS.nbrCourbeIndusUtiParProfil().subscribe(res => {
      this.nbrCourbeIndusUtiPro = res.data;
        
      //console.log("++++++++++++++++nbrCourbeIndusUtiParProfil+++++++++++++++++"+JSON.stringify(this.nbrCourbeIndusUtiPro));
    
     for (var i = 0; i < this.nbrCourbeIndusUtiPro.length; i++) {  
      this.datacolor.push(
        this.formatteddatacolor[i],
          )  
         // console.log("++++++++++++++++datacolor+++++++++++++++++"+JSON.stringify(this.datacolor));
     // console.log("++++++++++++++++pro_libelle+++++++++++++++++"+JSON.stringify(this.nbrCourbeIndusUtiPro[i].pro_libelle));
      this.nbrCourbeIndusUtiPro3 = this.nbrCourbeIndusUtiPro[i].pro_libelle
     this.nbrCourbeIndusUtiPro2  = this.nbrCourbeIndusUtiPro[i]
     delete this.nbrCourbeIndusUtiPro2['pro_libelle'];
     var count = [];
      var mois=[]
    JSON.parse(JSON.stringify(this.nbrCourbeIndusUtiPro2), function (key, value) {
    if (typeof(value) != "object") {
       // values.push({[key]:value});
       count.push(value); //if you need a value array
       mois.push([key])
    } 
  }); 
   //  console.log(count)
    
       /*this.constCourbejson.push({
        name: this.nbrCourbeIndusUtiPro3,
        type:undefined,
          data: count
          }) */ 

          this.constCourbejson.push({ 
              data: count,
              label: this.nbrCourbeIndusUtiPro3
              })
    }
    
     
   this.lineChartDataMonth = this.constCourbejson
   this.lineChartLabelsMonth = ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']; 
   
    
    this.lineChartLegendMonth = true;
    this.lineChartTypeMonth = 'line';
    this.lineChartPluginsMonth = [];
    //console.log("-------------------------constCourbejson----------------------------------"+JSON.stringify(this.constCourbejson));
    /*this.chart4 = new Chart({
      chart : {
      type: 'spline'
    },
    title: {
      text: 'Nombre utilisateurs selon le profil'
    },
   colors: this.datacolor,
    xAxis: {
      categories: ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
    },
    yAxis: {
      title: {
        text: 'Nombre Utilisateurs'
    }
    },
    series:this.constCourbejson
  });*/
  })
  
  this.widgetS.nbrIndusUtiParProfilParAnnee().subscribe(res => {
    this.nbrCourbeIndusUtiProAnnee = res.data;
      
     console.log("++++++++++++++++nbrCourbeIndusUtiParProfilAnnee+++++++++++++++++"+JSON.stringify(this.nbrCourbeIndusUtiProAnnee));
  
   /*for (var i = 0; i < this.nbrCourbeIndusUtiProAnnee.length; i++) {  
    this.datacolor.push(
      this.formatteddatacolor[i],
        )  
       // console.log("++++++++++++++++datacolor+++++++++++++++++"+JSON.stringify(this.datacolor));
   // console.log("++++++++++++++++pro_libelle+++++++++++++++++"+JSON.stringify(this.nbrCourbeIndusUtiPro[i].pro_libelle));
    this.nbrCourbeIndusUtiPro3Annee = this.nbrCourbeIndusUtiProAnnee[i].pro_libelle
   this.nbrCourbeIndusUtiPro2Annee  = this.nbrCourbeIndusUtiProAnnee[i]
   delete this.nbrCourbeIndusUtiPro2Annee['pro_libelle'];
   var count = [];
    var mois=[]
  JSON.parse(JSON.stringify(this.nbrCourbeIndusUtiPro2Annee), function (key, value) {
  if (typeof(value) != "object") {
     // values.push({[key]:value});
     count.push(value); //if you need a value array
     mois.push([key])
  } 
}); 
 //  console.log(count)
  
     this.constCourbejsonannee.push({
      name: this.nbrCourbeIndusUtiPro3Annee,
      type:undefined,
        data: count
        })  
  }*/
      var profil = []
      var count = []
       var annee = []
       for (var i = 0; i < this.nbrCourbeIndusUtiProAnnee.length; i++) {    
        count.push(this.nbrCourbeIndusUtiProAnnee[i]["CountOfNewUsers"])
        annee.push(this.nbrCourbeIndusUtiProAnnee[i]["annee"])  
       /* this.constCourbejsonannee.push({
          name: this.nbrCourbeIndusUtiProAnnee[i]["pro_libelle"],
          type:undefined,
            data: count
            })  */
            this.constCourbejsonannee.push({ 
                data: count,
                label: this.nbrCourbeIndusUtiPro3
                }) 
      }

      this.lineChartDataAnnee = this.constCourbejsonannee
      this.lineChartLabelsAnnee  = annee; 
      
       
       this.lineChartLegendAnnee  = true;
       this.lineChartTypeAnnee  = 'line';
       this.lineChartPluginsAnnee  = [];
  //console.log("-------------------------constCourbejson----------------------------------"+JSON.stringify(this.constCourbejson));
 /* this.chart55 = new Chart({
    chart : {
    type: 'spline'
  },
  title: {
    text: 'Nombre utilisateurs selon le profil'
  },
 colors: this.datacolor,
  xAxis: {
    categories: annee
  },
  yAxis: {
    title: {
      text: 'Nombre Utilisateurs'
  }
  },
  series:this.constCourbejsonannee
});*/ 
})

      
    
    this.chart7=new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Nombre de dossiers'
      },
     colors:[
       '#6495ED',
       '#FFA500',
       '#00ff00'
     ],
      xAxis: {
        categories: ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
      },
      yAxis: {
        title: {
          text: 'Nombre de dossiers'
      }
      },
      series:[{
       name: 'Nombre de dossiers soumis',
       type:undefined,
        data: [10,24,39,56,38,39,45,8,25,37,34,67]
      },
      {
       name:'Nombre de dossiers traités',
       type:undefined,
        data:[30,68,54,40,200,45,58,90,37,68,50,100]
      },
     
      {
       name:'Nombre de dossiers rejetés',
       type:undefined,
       data:[27,58,44,40,200,35,18,60,17,28,29,69]
      },
     ]
    })


    this.chart10=new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Nombre de dossiers'
      },
     colors:[
       '#6495ED',
       '#FFA500',
       '#00ff00'
     ],
      xAxis: {
        categories: ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
      },
      yAxis: {
        title: {
          text: 'Nombre de dossiers'
      }
      },
      series:[{
       name: 'Nombre de dossiers soumis',
       type:undefined,
        data: [10,24,39,56,38,39,45,8,25,37,34,67]
      },
      {
       name:'Nombre de dossiers traités',
       type:undefined,
        data:[30,68,54,40,200,45,58,90,37,68,50,100]
      },
     
      {
       name:'Nombre de dossiers rejetés',
       type:undefined,
       data:[27,58,44,40,200,35,18,60,17,28,29,69]
      },
     ]
    })
  
  }


  chartOptions: Highcharts.Options = {
    chart: {
     type: 'spline'
   },
   title: {
     text: 'Nombre utilisateurs selon le profil'
   },
  colors:[
    '#6495ED',
    '#FFA500',
    '#00ff00'
 ],
   xAxis: {
     categories: ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
   },
   yAxis: {
     title: {
       text: 'Nombre Utilisateurs'
   }
   },
   series:[{
    name: 'Nombre demandeurs',
    type:undefined,
     data: [10,24,39,56,38,39,45,8,25,37,34,67]
   },
   {
    name:'Nombre traitants',
    type:undefined,
     data:[30,68,54,40,200,45,58,90,37,68,50,100]
   },

   {
    name:'Nombre commerciaux',
    type:undefined,
    data:[27,58,44,40,200,35,18,60,17,28,29,69]
   },
  ]
    
 };

 chartOptions1: Highcharts.Options = {
  chart: {
   type: 'spline'
 },
 title: {
   text: 'Nombre de dossiers'
 },
colors:[
  '#6495ED',
  '#FFA500',
  '#00ff00'
],
 xAxis: {
   categories: ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
 },
 yAxis: {
   title: {
     text: 'Nombre de dossiers'
 }
 },
 series:[{
  name: 'Nombre de dossiers soumis',
  type:undefined,
   data: [10,24,39,56,38,39,45,8,25,37,34,67]
 },
 {
  name:'Nombre de dossiers traités',
  type:undefined,
   data:[30,68,54,40,200,45,58,90,37,68,50,100]
 },

 {
  name:'Nombre de dossiers rejetés',
  type:undefined,
  data:[27,58,44,40,200,35,18,60,17,28,29,69]
 },
]
  
};

chartOptions2: Highcharts.Options = {
  chart: {
   type: 'spline'
 },
 title: {
   text: 'Nombre de dossiers'
 },
colors:[
  '#6495ED',
  '#FFA500',
  '#00ff00'
],
 xAxis: {
   categories: ['janvier','février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre']
 },
 yAxis: {
   title: {
     text: 'Nombre de dossiers'
 }
 },
 series:[{
  name: 'Nombre de dossiers soumis',
  type:undefined,
   data: [10,24,39,56,38,39,45,8,25,37,34,67]
 },
 {
  name:'Nombre de dossiers traités',
  type:undefined,
   data:[30,68,54,40,200,45,58,90,37,68,50,100]
 },

 {
  name:'Nombre de dossiers rejetés',
  type:undefined,
  data:[27,58,44,40,200,35,18,60,17,28,29,69]
 },
]
  
};

plotSimpleBarChart2() {
  var chart = Highcharts.chart("highcharts2", this.chartOptions);
  var chart = Highcharts.chart("highcharts21", this.chartOptions1);
  var chart = Highcharts.chart("highcharts22", this.chartOptions2);
  }

  getProfile(id){
    this.widgetS.checkProfil(id)
    .subscribe(resp=>{
      this.profil=resp;
      console.log(this.profil)
    },err=>{
      console.log(err);
    })
  }


  openExcel(){
    this.widgetS.nbrCourbeIndusUtiParProfil().subscribe(res => {
      this.nbrCourbeIndusUtiPro = res.data;
      this.widgetS.exportAsExcelFile(this.nbrCourbeIndusUtiPro,'nombre utilisateurs par profil')
    },err=>{

    })
  }

  downloadCanvas(event){
    let DATA = document.getElementById('htmlDataArea');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        saveAs(FILEURI,'Utilisateurs.png')
    }); 
  }

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

  PrintImage(event){
    let DATA = document.getElementById('htmlDataArea');  
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
