import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ParametreService } from 'src/app/utilisateur/services/parametre.service';
import { StyleManagerService } from 'src/app/shared/style-manager.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApplicationService } from 'src/app/application/services/application.service';
import { UserService } from 'src/app/utilisateur/services/user.service';
//import { ParametreServices } from 'src/app/parametrage/services/parametre.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  appName;
  langue;
  theme;
  Langues;
  appsPubliees;
  appLogo;
  selectedFile1: File;
  selectedFile2: File;
  selectedFile3: File;
  selectedFile4: File;
  selectedFile5: File;

  retreivedImage1: any;
  retreivedImage2: any;
  retreivedImage3: any;
  retreivedImage4: any;
  retreivedImage5: any;


  base64Data5: any;
  base64Data1: any;
  base64Data2: any;
  base64Data3: any;
  base64Data4: any;

  retreivedResponse: any;
  retreivedResponse1: any;
  retreivedResponse2: any;
  retreivedResponse3: any;
  retreivedResponse5: any;
  idLangue;
  currentLangue;

  userForm = this.formbuild.group({
    utiId: ['', Validators.required],
    utiPrenom: ['', Validators.required],
    utiNom: ['', Validators.required],
    utiUsername: [localStorage.getItem('username')],
    utiTelephone: [''],
    utiEmail: [''],
    utiAdresse: [''],
    uti_lng_id: [''],
    uti_thm_id: [''],
  });
  constructor(public router: Router, private dialogRef: MatDialog,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private paramService: ParametreService,
    public dateAdapter: DateAdapter<Date>,
    private formbuild: FormBuilder,
    public styleManager: StyleManagerService,
    public notification: NotificationService,
    private appService: ApplicationService,
    public userService: UserService,
  ) {
    this.currentLangue = localStorage.getItem('langue') ? localStorage.getItem('langue') : 'fr';
  }
  ngAfterViewInit() {
    //this.installerTheme(localStorage.getItem('theme'));
    this.useLang(localStorage.getItem('langue'));
    //this.getLogoUser();
  }
  
  ngOnInit() {
    this.listLangue();
    this.getListParam();
    this.getImagelanding();
    this.appService.listeAppPubliee().subscribe(data => {
      this.appsPubliees = data.data;
    });
  }

  getImagelanding() {
    this.paramService.getImageLanding().subscribe(data => {
      console.log(data);
      if (data.statut) {
        this.retreivedResponse = data?.data;
        //alert(''+this.base64Data1);
        this.base64Data1 = this.retreivedResponse.lndIm1;
        this.base64Data2 = this.retreivedResponse?.lndIm2;
        this.base64Data3 = this.retreivedResponse?.lndIm3;
        this.base64Data4 = this.retreivedResponse?.lndIm4;
        this.base64Data5 = this.retreivedResponse?.lndIm5;

        this.retreivedImage1 = 'data:image/png;base64,' + this.base64Data1;
        this.retreivedImage2 = 'data:image/png;base64,' + this.base64Data2;
        this.retreivedImage3 = 'data:image/png;base64,' + this.base64Data3;
        this.retreivedImage4 = 'data:image/png;base64,' + this.base64Data4;
        this.retreivedImage5 = 'data:image/png;base64,' + this.base64Data5;
        localStorage.setItem('image', this.retreivedImage1)
      } else {
        this.retreivedResponse = false;
      }


    })
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  fonctionUpdatelangue() {
    this.userService.updateLangueUser(this.userForm.value).subscribe(data => {
    });
  }
  getLangueId(langue) {
    for (let index = 0; index < this.Langues.length; index++) {
      if (langue == this.Langues[index].lngLangue) {
        this.idLangue = this.Langues[index].lngId;
        this.userForm.value.uti_lng_id = this.idLangue;
        this.userForm.value.uti_thm_id = null;
        this.fonctionUpdatelangue();
      }
    }

  }
  compareLangue(l1, l2): boolean {
    return l1 && l2 ? l1.lnglangue === l2.lnglangue : false;
  }
  switchLang(lang: string) {
    localStorage.setItem('langue', lang);
    this.useLang(lang);
  }
  useLang(lang: string) {
    this.translate.use(lang);
    this.dateAdapter.setLocale(lang);
  }
  listLangue() {
    this.paramService.getLangue().subscribe(data => {
      this.Langues = data.data;
    });
  }

  openDialogInscription() {
    this.router.navigate(['/inscription']);
  }

  getListParam() {
    this.langue = localStorage.getItem("langue");
    this.paramService.getDefautParametre().subscribe(data => {
      //console.log(data);
      this.langue = this.langue ? this.langue : data.data.param_lng_id.lngLangue;
      this.theme = this.theme ? this.theme : data.data.param_thm_id.thmName;
      localStorage.setItem('langue', this.langue);
      localStorage.setItem('theme', this.theme);
      this.langue = localStorage.getItem('langue') ? localStorage.getItem('langue') : 'fr';
      this.theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'gainde-green';
      this.installTheme(this.theme);
      this.translate.setDefaultLang(this.langue);
      this.translate.use(this.langue);
      this.appName = data.data?.param_nom_app;
      localStorage.setItem("appName", this.appName);
      if (data.data?.param_img_id) {
        this.getLogo(data.data?.param_img_id.imgId);
        // var base64Data = data.data.param_img_id.imgLogoByte;
        // this.appLogo = `data:image/png;base64,${base64Data}`         
        // localStorage.setItem('logo', this.appLogo);
      }
    }
      , error => {
        this.langue = 'fr';
        this.theme = 'gainde-green';
        this.installTheme(this.theme);
        this.translate.setDefaultLang(this.langue);
        this.translate.use(this.langue);
        this.translate.get('Error.internalservererror').subscribe((res: string) => {
          this.notification.error(res);
        });
      }
    );
  }

  getLogo(logoRef) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    //localStorage.setItem('logo', 'data:image/png;base64,' + logoRef);    
    this.paramService.getImage(logoRef)
      .subscribe(
        res => {
          var base64Data = res.data.imgLogoByte;
          this.appLogo = `data:image/png;base64,${base64Data}`
          localStorage.setItem('logo', this.appLogo);
        }
      );

  }

  installTheme(themeName: string) {
    this.styleManager.setStyle('theme', themeName);
  }

}
