import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from "angular-6-datatable";

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { InformationComponent } from './components/information/information.component';
import { AllinfoComponent } from './components/allinfo/allinfo.component';
import { DataFilterPipe } from "./data-filter.pipe";

import appRoutes from './app.routing';

import { httpInterceptorProviders} from './_services/interceptor'
import { ServerApiHitService } from './_services/server-api-hit.service';
import { RolesService } from './_services/roles.service';
import { AuthGuard } from './_services/_guard/auth.guard';
import { AssignRoleComponent } from './components/assignrole/assignrole.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    InformationComponent,
    AllinfoComponent,
    DataFilterPipe,
    AssignRoleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTableModule,
    appRoutes,
    FormsModule
  ],
  providers: [
    ServerApiHitService,
    AuthGuard,
    httpInterceptorProviders,
    RolesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
