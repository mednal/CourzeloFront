import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomhomeComponent } from './classroomhome.component';
import { ClassroomhomeComponentRoutingModule } from './classroomhome-routing.module';
import { SharedClassroomModule } from '../../Shared/shared-classroom.module';


@NgModule({
  declarations: [
    ClassroomhomeComponent
  ],
  imports: [
    CommonModule,
    ClassroomhomeComponentRoutingModule,
    SharedClassroomModule

  ],
  exports:[
    ClassroomhomeComponent
  ]
})
export class ClassroomhomeModule { }
