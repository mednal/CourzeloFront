import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomhomeComponent } from './classroomhome.component';

const routes: Routes = [
  { path: 'classroomSpace', component: ClassroomhomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomhomeComponentRoutingModule { }
