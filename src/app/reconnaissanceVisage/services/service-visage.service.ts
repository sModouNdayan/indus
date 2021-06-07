import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpRequestHelper } from 'src/app/shared/helpers/httprequest.helper';
import { User } from 'src/app/utilisateur/models/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceVisageService {
apiReconnaissance = environment.apiReconnaissance;
  constructor(private http: HttpClient,private reqHelper: HttpRequestHelper) { }

  enrolUser(utilisateur:User){
    const {utiPrenom, utiNom, utiUsername, utiTelephone, utiEmail, utiAdresse} = utilisateur;
     const formData: FormData = new FormData();
     formData.append('utiPrenom',utiPrenom);
     formData.append('utiNom', utiNom);
     formData.append('utiUsername', utiUsername);
     formData.append('utiTelephone', utiTelephone);
     formData.append('utiEmail', utiEmail);
     formData.append('utiAdresse', utiAdresse);
    return this.http.post<any>(this.apiReconnaissance + 'utilisateur/enroleUser',formData);
  }

  
  loginByVisage(){
    return this.http.get<any>(this.apiReconnaissance+ 'utilisateur/loginVisage');
  }
}
