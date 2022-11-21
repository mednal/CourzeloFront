
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { ApplyDiagComponent } from '../../Modules/apply-diag/apply-diag.component';


@Component({
  selector: 'app-candidate-jobs',
  templateUrl: './candidate-jobs.component.html',
  styleUrls: ['./candidate-jobs.component.css']
  
})
export class CandidateJobsComponent implements OnInit {
  isLeftVisible = true;
  jobOffers!: JobOffers[];
  candidateApp!: CandidateApp[];
  business:any;
  public dataSource2= new  MatTableDataSource<CandidateApp>();
  state= new AppState(null,new Date(),"pending",1,0,'',"",'',null,false,"");
  job!:JobOffers
  app=new CandidateApp(null,new Date(),[],"",[],this.state,this.job,null) ;
  dataSource: MatTableDataSource<JobOffers> = new MatTableDataSource<JobOffers>(this.jobOffers);
  currentUser: any;
  isLoggedIn = false;
  currentJob!:any;
  s!:any ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   // MatPaginator Inputs
   length:any;
   pageSize = 5;
   
   // MatPaginator Output
   pageEvent!: PageEvent;

   
  constructor(private businessAuthService: BusinessAuthService,private token: TokenStorageService,private JobsService:JobOffersService,private AppService:CandidateAppService,private diag: MatDialog) { }
  

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    this.Getjobs();
    //this.GetjobsApp();

  }


 
  


  Getjobs(){
    
    this.JobsService.GetAlldJobsByState("Active").subscribe(data=>{
     this.jobOffers=data;
     this.length=data.length
       },err=>{
      console.log(err);
    })}


  /*  GetjobsApp(){
      this.AppService.GetAlldApps().subscribe(data=>{
        this.candidateApp=data;
         },err=>{
        console.log(err);
      })}*/
  


    

      AddJobApp(job:JobOffers){
        if(this.isLoggedIn){
          this.AppService.ExistApp(job.idJob,this.currentUser.id).subscribe(res=>{
            if(res==false){
              const newMsg = Object.assign({}, job);
              const diagref = this.diag.open(ApplyDiagComponent, {
              width: '900px',
              height: '450px',
              data:
              {
                message:newMsg,
              },
             
              disableClose: true,
            }) 
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You have already applied for this job!!',
              
            })
          }
           })  
  }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login to apply!!!',
        
      })
    }
      }


  

    Details(job:JobOffers){
      this.currentJob=job;
      //this.GetBusiness(this.currentJob.idBusiness)
    }


  /*  GetBusiness(id:any){
      this.businessAuthService.GetUserById(id).subscribe(res=>{
        this.currentJob.business=res;
      })

    }*/


}



