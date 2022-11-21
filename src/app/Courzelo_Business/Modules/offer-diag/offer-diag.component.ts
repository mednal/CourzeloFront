import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppState } from '../../Shared/entities/CandidateApp';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { FileUploadService } from '../../Shared/services/file-upload.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-offer-diag',
  templateUrl: './offer-diag.component.html',
  styleUrls: ['./offer-diag.component.css']
})
export class OfferDiagComponent implements OnInit {

  file:any
  Form!: FormGroup;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;
  constructor(private uploadService: FileUploadService,private fb: FormBuilder,public dialogRef: MatDialogRef<OfferDiagComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private AppService:CandidateAppService,) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      offerDoc : ['',  Validators.required],
    })

    this.fileInfos = this.uploadService.getFiles();
  }


  AddState(){
    console.log(this.data.message)
    
    var  state= new AppState(null,new Date(),"Job offer",this.data.message.currentState.step+1,0,'',"","",null,false,"");
    this.AppService.AddState(state,this.data.message.idCandidateApp).subscribe(res=>{
        const formData = new FormData();
        formData.append('file', this.file);
        this.AppService.SaveOffer(res.idCandidateApp,res.candidateState[res.candidateState.length-1].idCandidateState,formData).subscribe(r=>
          {
            console.log(r)
            Swal.fire({
              title: 'Offer is send to candidate',
              icon:'success',
              confirmButtonColor: '#07294d'
               })

          })

      this.closeDialog()
    })
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      //console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  
  closeDialog() {
    this.dialogRef.close(false);
   
  }

  
  Reset() {
    this.Form.reset(); 
}

public hasError = (controlName: string, errorName: string) =>{
  
  return this.Form.controls[controlName].invalid ;
}




onFileSelect(event:Event) {
  const file = (event.target as HTMLInputElement).files?.item(0);   
  this.file=file;
  
  
}

}
