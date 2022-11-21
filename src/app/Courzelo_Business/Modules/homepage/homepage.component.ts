import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  Form!: FormGroup;
  currentBusiness:any
  jobOffers!:JobOffers[]
  job!:JobOffers
  state= new AppState(null,new Date(),"pre-selected",1,0,'',"",'',null,false,"");
  app=new CandidateApp(null,new Date(),[],"",[],this.state,this.job,null) ;
  constructor(private fb: FormBuilder,private JobsService:JobOffersService,private businesstokenStorage: BusinessTokenStorageService,private AppService:CandidateAppService) { }

  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    this.Form = this.fb.group({
     
      search: [''],
      job: ['']
    })

    this.Getjobs()
  }


  Getjobs(){
    
    this.JobsService.GetJobsByBusinessAndState(this.currentBusiness.idBusiness,'Active').subscribe(data=>{
      this.jobOffers=data;
       },err=>{
      console.log(err);
    })}


   


    AddApp(idUser:any){
      if(this.Form.get('job')?.value){

      this.app.candidateState.push(this.state)
      this.AppService.PostApp(this.app,this.Form.get('job')?.value,idUser).subscribe(res => 
        { 
         
        //console.log(res);
        Swal.fire({
          title: 'Candidate has been selected successufly',
          icon:'success',
          confirmButtonColor: '#07294d'
           })
        },
        err=>
        {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ' + err.error.text,
            
          })
        })
  
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select a job first! ' ,
        
      })
    }
  }

  }

