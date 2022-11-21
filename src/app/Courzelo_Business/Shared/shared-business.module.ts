import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideBarComponent } from './side-bar/side-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent
    

    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule
   
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideBarComponent
    
  ]
})
export class SharedBusinessModule { }
