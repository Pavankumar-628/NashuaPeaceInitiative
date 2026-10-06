import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'region', component: RegionComponent },
  { path: 'peacebuilding', component: PeacebuildingComponent },
  { path: 'projects', component: FirstProjectComponent },
  { path: 'partnerships', component: PartnershipsComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'ngo-registration', component: NgoRegistrationComponent },
  { path: 'get-involved', component: GetInvolvedComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
