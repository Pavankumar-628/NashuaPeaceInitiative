import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegionComponent } from './components/region/region.component';
import { PeacebuildingComponent } from './components/peacebuilding/peacebuilding.component';
import { FirstProjectComponent } from './components/first-project/first-project.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { NgoRegistrationComponent } from './components/ngo-registration/ngo-registration.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RegionComponent,
    PeacebuildingComponent,
    FirstProjectComponent,
    PartnershipsComponent,
    OrganizationComponent,
    DocumentsComponent,
    NgoRegistrationComponent,
    GetInvolvedComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
