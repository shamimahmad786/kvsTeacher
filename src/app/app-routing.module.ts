import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './credentials/change-password/change-password.component';
import { AuthGuard } from './guard/AuthGuard';
import { KvsTeacherProfileComponent } from './kvs/kvs-teacher-profile/kvs-teacher-profile.component';
import { KvsTeacherTransferComponent } from './kvs/kvs-teacher-transfer/kvs-teacher-transfer.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './tDashboard/main-page/main-page.component';
import { TDashboardComponent } from './tDashboard/t-dashboard/t-dashboard.component';
import { TeacherProfileComponent } from './teacherDetailed/teacher-profile/teacher-profile.component';
import { TeacherComponent } from './teacherEntryForm/teacher.component';
import { ApplicationFlowComponent } from './utilities/instructions/application-flow/application-flow.component';


const routes: Routes = [
  {path:'', component: TDashboardComponent},
  {path:'loginuser', component:LoginuserComponent},
  {path:'registration', component:RegistrationComponent},

  {path: 'teacher', component:TeacherComponent,canActivate: [AuthGuard], children:[
      {path: 'mainPage', component:MainPageComponent},
      {path:'profile',component:TeacherProfileComponent}, 
      {path:'kvsteacherprofile', component:KvsTeacherProfileComponent},
      {path:'kvsteachertransfer', component:KvsTeacherTransferComponent},
      {path:'changePassword', component:ChangePasswordComponent}
      // {path:'appFlow',component:ApplicationFlowComponent}
    ]},  
    
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash:false, scrollPositionRestoration: 'enabled' })],
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
