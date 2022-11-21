import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourzeloCorehomeComponent } from './courzelo-corehome.component';
import { CourzeloCorehomeRoutingModule } from './courzelo-corehome-routing.module';
import { SharedCoreModule } from '../../Shared/shared-core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../Shared/Interceptor/auth.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from '../../Modules/login/login.component';
import { RegisterComponent } from '../../Modules/register/register.component';
import { HomeComponent } from '../../Modules/home/home.component';
import { ForgetPasswordComponent } from '../../Modules/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../Modules/reset-password/reset-password.component';
import { ProfileComponent } from '../../Modules/profile/profile.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesPerCategoryComponent } from '../../Modules/courses-per-category/courses-per-category.component';
import { SingleCourseDetailComponent } from '../../Modules/single-course-detail/single-course-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AccueilComponent } from '../../Modules/accueil/accueil.component';
import { AccueilclassesComponent } from '../../Modules/accueilclasses/accueilclasses.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CartComponent } from '../../Modules/cart/cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../Shared/header/header.component';
import { MylearningComponent } from '../../Modules/mylearning/mylearning.component';
import { PaymentsuccessComponent } from '../../Modules/paymentsuccess/paymentsuccess.component';
import { SearchusersComponent } from '../../Modules/searchusers/searchusers.component';
import { SinglePostComponent } from '../../Modules/single-post/single-post.component';
import { ProfilingComponent } from '../../Modules/profiling/profiling.component';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { TrainerModule } from 'src/app/Courzelo_Trainer/Courzelo_Trainer_layouts/courzelo-trainerhome/trainer.module';
import { RoomComponent } from '../../Modules/room/room.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    CourzeloCorehomeComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    CoursesPerCategoryComponent,
    SingleCourseDetailComponent,
    AccueilComponent,
    AccueilclassesComponent,
    CartComponent,
    MylearningComponent,
    PaymentsuccessComponent,
    SearchusersComponent,
    SinglePostComponent,
    ProfilingComponent,
    RoomComponent
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CourzeloCorehomeRoutingModule,
    MatTabsModule,
    IvyCarouselModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    SharedCoreModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    NgxFileDragDropModule,
    TrainerModule,
    NgChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  exports:[
    CourzeloCorehomeComponent,
    SharedCoreModule
  ]
})
export class CourzeloCorehomeModule { }
