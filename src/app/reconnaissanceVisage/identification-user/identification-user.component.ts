import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ServiceVisageService } from '../services/service-visage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-identification-user',
  templateUrl: './identification-user.component.html',
  styleUrls: ['./identification-user.component.scss']
})
export class IdentificationUserComponent implements OnInit {
  tokkens;
  appName;
  appLogo
  imageAccueil;
  loading: boolean;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
  });

  constructor( private formBuilder: FormBuilder, private router: Router,
    private _snackBar: MatSnackBar,
    private notification: NotificationService,
    private visageService: ServiceVisageService,
    private translate: TranslateService ) {    
      this.loading = false;
   }

  ngOnInit() {
    this.imageAccueil=localStorage.getItem('image');
  }

  loginVisage(){
    this.loading = true
    this.visageService.loginByVisage().subscribe(data=>{
      if(data){
        this.loading = false;
        if(data.data==true){
          this.loading = false;
          this.router.navigate(['/home']);
          this.translate.get("Authentification reussi!!!").subscribe((res: string) => {
            this.notification.success(res);
          });

        }else{
          this.loading = false;
          this.translate.get("Personne inconnue ou verifiez votre username!!").subscribe((res: string) => {
            this.notification.error(res);
          });
          this.loginForm.reset();

        }

      }else{
        this.loading = false;
        this.translate.get("personne inconnue").subscribe((res: string) => {
          this.notification.error(res);
        });
      }
    },(error) => {
      this.translate.get(error).subscribe((res: string) => {
                  this.notification.error(res);
            });
})
  }



}
