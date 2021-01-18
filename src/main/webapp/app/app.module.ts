import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EohAssignmentSharedModule } from 'app/shared/shared.module';
import { EohAssignmentCoreModule } from 'app/core/core.module';
import { EohAssignmentAppRoutingModule } from './app-routing.module';
import { EohAssignmentHomeModule } from './home/home.module';
import { EohAssignmentEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EohAssignmentSharedModule,
    EohAssignmentCoreModule,
    EohAssignmentHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EohAssignmentEntityModule,
    EohAssignmentAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class EohAssignmentAppModule {}
