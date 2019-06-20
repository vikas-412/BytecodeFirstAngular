import {RouterModule, CanActivate} from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { InformationComponent } from './components/information/information.component';
import { AllinfoComponent } from './components/allinfo/allinfo.component';

import { AuthGuard } from './_services/_guard/auth.guard';

const appRoutes = RouterModule.forRoot([
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'info',
        component: InformationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'info?query=value',
        component: InformationComponent,
        canActivate: [AuthGuard]        
    },
    {
        path: 'allinfo',
        component: AllinfoComponent,
        canActivate: [AuthGuard]                
    }
])

export default appRoutes;