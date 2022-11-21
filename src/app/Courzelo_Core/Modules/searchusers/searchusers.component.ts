import { EQUALS } from '@angular/cdk/keycodes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isEqual } from 'date-fns';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../Shared/Service/auth.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { User } from '../Entity/user';

@Component({
  selector: 'app-searchusers',
  templateUrl: './searchusers.component.html',
  styleUrls: ['./searchusers.component.css']
})
export class SearchusersComponent implements OnInit {

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute ,private httpClient:HttpClient,private tokenService: TokenStorageService) { }
  users: User[] | any;
  key: any;
  currentUser:any;
  currentUserId: any;
  isfollowed=false;
  followinglist:number[]=[];
  userfol!: User;
  ngOnInit(): void {
    this.checkisFollowed;
    
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.key = params.get('id') || '';
    });
    this.getUsers(this.key);
    this.currentUser= this.tokenService.getUser();
    this.currentUserId = this.currentUser.id;
    this.onGetUser();
    //this.followinglist= this.currentUser.following;
    console.log(this.followinglist);
    console.log("aaaaaaaaaaaaaaa");
    console.log(this.users);
   // this.searchUsers(this.key);
  
  }
  

  public getUsers(key: string): void {
    this.authService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        const results: User[] = [];
        for (const user of this.users) {
          if (user.followers!==-1||user.displayName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            results.push(user);
          }
        }
        this.users = results;
        if (key.length===0) {
          this.users;
        }
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
public FollowUser(id:number)
{
   console.log(this.currentUser.followers);
  this.authService.FollowUser(id, this.currentUserId).subscribe(
    (response)=> {
      Swal.fire({
        title: 'Success!',
        text: 'You have followed this mate',
        icon: 'success',
        confirmButtonText: 'Return'
      })
      this.onGetUser();
      
    },
    (error: HttpErrorResponse) => {
      //alert(error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Your follow wasnt applied',
        icon: 'error',
        confirmButtonText: 'Return'
      })
    }

  );

}


public UnFollowUser(id:number)
{
   console.log(this.currentUser.followers);
  this.authService.UnFollowUser(id, this.currentUserId).subscribe(
    (response)=> {
      Swal.fire({
        title: 'Success!',
        text: 'You have Unfollowed this mate',
        icon: 'success',
        confirmButtonText: 'Return'
      })
      this.onGetUser();
      
    },
    (error: HttpErrorResponse) => {
      //alert(error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Your Unfollow wasnt applied',
        icon: 'error',
        confirmButtonText: 'Return'
      })
    }

  );

}

public checkisFollowed(id:number):boolean{

if(this.followinglist.includes(id))
return true;
else
return false;
}
  // public searchUsers(key: string): void {
    
  //   console.log(key)
  //   const results: User[] = [];
  //   for (const user of this.users) {
  //     if (user.displayName.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(user);
  //     }
  //   }
  //   this.users = results;
  //   if (key.length===0) {
  //     this.getUsers();
  //   }
  // }


  public onGetUser()
{
   
  this.authService.getUserById(this.currentUser.id).subscribe(
    (response: User)=> {
      this.followinglist= response.following;
      
    },
    (error: HttpErrorResponse) => {
      
    }

  );

}

}
