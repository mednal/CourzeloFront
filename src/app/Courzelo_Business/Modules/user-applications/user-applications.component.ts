import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';

@Component({
  selector: 'app-user-applicatinos',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.css']
})
export class UserApplicationsComponent implements OnInit {

  candidateApps!: CandidateApp[];
  public dataSource= new  MatTableDataSource<CandidateApp>();
  displayedColumns = ['applicationDate','candidateState','Job','interview'];
  JobOffer!:JobOffers;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  fileUrl:any
  file:any
  currentUser: any;
  isLoggedIn = false;
  currentJob:any
  isLeftVisible = true;
  constructor(private businessAuthService: BusinessAuthService,private token: TokenStorageService,private _liveAnnouncer: LiveAnnouncer,private JobsService:JobOffersService,private AppService:CandidateAppService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    this.GetApps();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  SortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


 
    
  
  public doFilter (value: string)  {
    if(value){
      this.dataSource.data=this.candidateApps as CandidateApp[]
      this.dataSource.data= this.dataSource.data.filter(e=>((e.job.title as string ).includes(value)) || ((e.currentState.label as string).includes(value)))
    }
    else{
      this.dataSource.data=this.candidateApps as CandidateApp[]
    }
  }

  GetApps(){
    
    this.AppService.GetApplicationByUser(this.currentUser.id).subscribe(data=>{this.candidateApps=data;
     this.dataSource.data = this.candidateApps as CandidateApp[];
     this.candidateApps.forEach(item=> {
       if(this.getLength(item.candidateState)!=0)
        {
        if (this.getLength(item.candidateState)!=0){
          this.AppService.GetCurrentState(item.idCandidateApp).subscribe(data=>{
           item.currentState=data;
             })
         }
       }
     })
    },err=>{
      console.log(err);
    })
      
  }


  AcceptOffer(app:CandidateApp){
    let state= new AppState(null,new Date(),"official offer accepted",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();
      Swal.fire({
        title: 'You have successufly accepted the official offer',
        icon:'success',
        confirmButtonColor: '#07294d'
         })
    })
  }

  RefuseOffer(app:CandidateApp){
    let state= new AppState(null,new Date(),"official offer refused",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();

      Swal.fire({
        title: 'You have successufly refused the official offer',
        icon:'success',
        confirmButtonColor: '#07294d'
         })

    })
  }


  AcceptRequest(app:CandidateApp){
    let state= new AppState(null,new Date(),"pending",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();
      Swal.fire({
        title: 'You have successufly accepted the job request',
        icon:'success',
        confirmButtonColor: '#07294d'
         })
    })
  }

  RefuseRequest(app:CandidateApp){
    let state= new AppState(null,new Date(),"Job rquest refused",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();

      Swal.fire({
        title: 'You have successufly refused the job request',
        icon:'success',
        confirmButtonColor: '#07294d'
         })

    })
  }



  
  getLength(obj:any)
  {
    if((obj===null)|| (obj === undefined))
      {
        return 0;
      }
      else {
        return Object.keys(obj).length;
      }
    
    
  }

 

/*
  GetJobById(idJob:any){
    this.JobsService.GetJobById(idJob).subscribe(res=>
       {this.JobOffer=res;
      console.log(this.JobOffer);
      }
      )
  }
*/

  LoadPdf(state:AppState){

    if(state.offerDoc){
    this.AppService.GetPdf(state.offerDoc).subscribe((res: any)=>
      {
        this.file=res
         this.file = new Blob([res],  {type: 'application/pdf'});        
         this.fileUrl = URL.createObjectURL(this.file);
         window.open(this.fileUrl);
        
      })
  }
}


//View Job request
Details(idJob:any){
  this.JobsService.GetJobById(idJob).subscribe(res=>{
    this.currentJob=res
  })
}


/*GetBusiness(id:any){
  this.businessAuthService.GetUserById(id).subscribe(res=>{
    this.currentJob.business=res;
  })

}*/


OpenMeet(link:string){
  window.open( "https://"+link, "_blank");
}

}
