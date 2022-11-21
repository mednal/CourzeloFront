import { LiveAnnouncer } from '@angular/cdk/a11y';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateApp, AppState } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { InterviewDiagComponent } from '../interview-diag/interview-diag.component';
import { OfferDiagComponent } from '../offer-diag/offer-diag.component';
import { SendTestComponent } from '../send-test/send-test.component';


@Component({
  selector: 'app-candidate-app',
  templateUrl: './candidate-app.component.html',
  styleUrls: ['./candidate-app.component.css']
})
export class CandidateAppComponent implements OnInit  {

  public radarChartOptions: ChartConfiguration['options'] = {responsive: true,  };
  public radarChartLabels= ['PHP', '.Net', 'Java', 'Android', 'Node.JS'];
  public radarChartData: ChartDataset[] = [{ data: [62, 59, 80, 81, 56], label: 'skills' }, ];
  public radarChartType: ChartType = 'radar';

  fileUrl:any
  file:any
  currentBusiness:any;
  jobs!:JobOffers[]
  appByJob!:CandidateApp[];
  candidateApps!: CandidateApp[];
  public dataSource= new  MatTableDataSource<CandidateApp>();
  displayedColumns = ['applicationDate','candidateState','Job'];
  JobOffer!:JobOffers;
  currentApp:any
  Form!: FormGroup;
  search=new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;


  constructor(private diag: MatDialog,private fb: FormBuilder, private businesstokenStorage: BusinessTokenStorageService,private JobsService:JobOffersService,private AppService:CandidateAppService) { }


  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    //this.GetApps();
    this.GetAppsByBusiness(this.currentBusiness.idBusiness)
     //this.dataSource.data=this.candidateApps as CandidateApp[]
    this.Form = this.fb.group({
      state : []
    
    })
    

    
    
  }





  public doFilter (value: string)  {
    if(value){
      this.dataSource.data=this.candidateApps as CandidateApp[]
      this.dataSource.data= this.dataSource.data.filter(e=>((e.idCandidateApp as string).includes(value)) || ((e.job.title as string).includes(value)) || ((e.job.idJob as string).includes(value))|| ((e.currentState.label as string).includes(value)))
    }
    else{
      this.dataSource.data=this.candidateApps as CandidateApp[]
    }
  }

      
  GetApps(candidateApp:CandidateApp[]){
    candidateApp.forEach(item=> {
       if(this.getLength(item.candidateState)!=0)
        {
        if (this.getLength(item.candidateState)!=0){
          this.AppService.GetCurrentState(item.idCandidateApp).subscribe(data=>{
           item.currentState=data;
          // console.log(item)  
          })
         }
        }
     })

    //console.log(this.dataSource.data)
   // console.log(this.candidateApps)
      
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

 

   GetAppsByBusiness(idBusiness:any){
     
    this.AppService.GetApplicationByBusiness(idBusiness).subscribe(res=>{
      this.candidateApps=res as CandidateApp[]
      this.dataSource.data=this.candidateApps

      this.GetApps(this.candidateApps)
    })
  }
  

  updState(app:CandidateApp){
    var  state= new AppState(null,new Date(),"screening",app.currentState.step+1,0,'',"",'',new Date(),false,"");
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>
      {
        console.log(res);
        this.Form.enable()
        this.GetApps(this.candidateApps)
      
      })
    
  }
 

  onSelectionChange(e:any){
    console.log(e)
    this.currentApp=e
    this.Loadcv()


    if(this.currentApp.currentState.label=='pending'){
      this.Form.disable();
    }
    else this.Form.enable()
  }


  moveTo(e:any,app:any){
    console.log(e.value)
    if(e.value=="Hired"){
      
      var  state= new AppState(null,new Date(),"hired",app.currentState.step+1,0,'',"",'',new Date(),false,"");
      this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
        console.log(res)
        this.GetApps(this.candidateApps)
      })

    }

    else if(e.value=="Interview"){
      const newMsg = Object.assign({}, app);
      const diagref = this.diag.open(InterviewDiagComponent, {
        width: '900px',
        height: '450px',
        data:
        {
          message:newMsg,
        },
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
       this.GetApps(this.candidateApps)
      
      }));;
     
      
    }

    else if(e.value=="Send test"){
      const newMsg = Object.assign({}, app);
      const diagref = this.diag.open(SendTestComponent, {
        width: '100px',
        height: '250px',
        data:
        {
          message:newMsg,
        },
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
       this.GetApps(this.candidateApps)
      
      }));;
     
      
    }


    else if(e.value=="Send offer"){
      const newMsg = Object.assign({}, app);
      const diagref = this.diag.open(OfferDiagComponent, {
        width: '900px',
        height: '380px',
        data:
        {
          message:newMsg,
        },
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
        this.GetApps(this.candidateApps)
      
      
      }));;
     

    }
    
  }

  Reject(app:any){
    var  state= new AppState(null,new Date(),"rejected",app.currentState.step+1,0,'',"",'',new Date(),false,"");
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps(this.candidateApps)
    })
  }


  Loadcv(){
    if(this.currentApp.cv){
    this.AppService.GetPdf(this.currentApp.cv).subscribe((res: any)=>
      {
        this.file=res
         this.file = new Blob([res], { type: 'blob' });   
         //console.log(this.file)         
         this.fileUrl = URL.createObjectURL(this.file);
         console.log(this.fileUrl)
        //window.open(this.fileUrl);
        
      })
  }
  else 
  {
    this.fileUrl=null
  }
}


OpenMeet(link:string){
  window.open( "https://"+link, "_blank");
}

}
