/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DrugsComponent } from './Drugs/Drugs.component';
import { PharmaComponent } from './Pharma/Pharma.component';

import { DCPLNetworkAdminComponent } from './DCPLNetworkAdmin/DCPLNetworkAdmin.component';
import { DCPLPersonnelComponent } from './DCPLPersonnel/DCPLPersonnel.component';
import { B2BPartnerComponent } from './B2BPartner/B2BPartner.component';

import { CreatePharmaComponent } from './CreatePharma/CreatePharma.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Drugs', component: DrugsComponent },
  { path: 'Pharma', component: PharmaComponent },
  { path: 'DCPLNetworkAdmin', component: DCPLNetworkAdminComponent },
  { path: 'DCPLPersonnel', component: DCPLPersonnelComponent },
  { path: 'B2BPartner', component: B2BPartnerComponent },
  { path: 'CreatePharma', component: CreatePharmaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
