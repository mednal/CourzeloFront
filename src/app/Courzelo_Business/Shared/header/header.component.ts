import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { BusinessTokenStorageService } from '../services/Business-token-storage.service';
import { BusinessService } from '../services/Business.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  BusinessisLoggedIn = false;
  currentBusiness:any;
  roles:any;
  content?: string;

  
  constructor(private userService:BusinessService,private router: Router,private tokenStorageService: TokenStorageService,private businessTokenStorage: BusinessTokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.businessTokenStorage.getToken()) {
      this.BusinessisLoggedIn = true;

      this.currentBusiness = this.businessTokenStorage.getUser();
      console.log(this.currentBusiness)
      console.log(this.IsAdmin());
      
    }
  
    




  }
  

  logout(): void {
    this.businessTokenStorage.signOut();
    this.router.navigate(["/Businessregister"]).then(onfulfilled => window.location.reload()) ;

  }


IsAdmin(){
    var roles= this.currentBusiness.roles as Array<String>
    return roles.includes("ROLE_ADMIN",0);
}





}

