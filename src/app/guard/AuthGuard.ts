import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service'
import { environment } from 'src/environments/environment';
declare const getCredential: any;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authCode: any;
  authDetails: any;
  resposeType: any;
  letsContinue = false;
  kvicons: any;
  businessUnitTypeId: any;
  expirationTime:any;

  constructor(private router: Router, private dataService: DataService) {

  }
  canActivate() {
    if (sessionStorage.getItem("authTeacherDetails") == null) {
      var returnType = getCredential();
      if (sessionStorage.getItem("authTeacherDetails") != null && JSON.parse(sessionStorage.getItem("authTeacherDetails")).status !=0) {
    
        // this.displayInstruction();

        for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails.length; i++) {
          this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].application_id + ",";
          this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].business_unit_type_id;
        }
        if (this.businessUnitTypeId == '6') {
          this.router.navigate(['/teacher/profile']);
        } else{
          // window.location.href='https://kvsdemo.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsdemo.udiseplus.gov.in/school'
          // window.location.href='https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school'
          // this.router.navigate(['/teacher']);
          sessionStorage.removeItem('authTeacherDetails')
          sessionStorage.removeItem('mappingData')
          sessionStorage.removeItem('shiftYn')
          sessionStorage.removeItem('shiftAvailable')
          sessionStorage.removeItem('singleKvTeacher')
          sessionStorage.removeItem('systemTeacherCode')
          window.location.href = environment.AUTH_GUARD_HREF1
          sessionStorage.clear();
        }

          return true;
      } else {
        // window.location.href='https://kvsdemo.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsdemo.udiseplus.gov.in/school'
        // window.location.href='https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school'
        // this.router.navigate(['/teacher']);
        sessionStorage.removeItem('authTeacherDetails')
        sessionStorage.removeItem('mappingData')
        sessionStorage.removeItem('shiftYn')
        sessionStorage.removeItem('shiftAvailable')
        sessionStorage.removeItem('singleKvTeacher')
        sessionStorage.removeItem('systemTeacherCode')
        window.location.href = environment.AUTH_GUARD_HREF1
        return false;

      }

    } else if (JSON.parse(sessionStorage.getItem("authTeacherDetails")).status !=0) {
   
      this.displayInstruction();
      for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails.length; i++) {
        this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].application_id + ",";
        this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].business_unit_type_id;
        this.expirationTime = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.exp
      }
      if (this.businessUnitTypeId == '2') {
        return false;
        // this.router.navigate(['/teacher/nationalDashboard']);
      } else if (this.businessUnitTypeId == '3') {
        return false;
        // this.router.navigate(['/teacher/regionDashboard']);
      } else if (this.businessUnitTypeId == '4') {
        return false;
        // this.router.navigate(['/teacher/stationDashboard']);
      } else if (this.businessUnitTypeId == '5') {
        // this.router.navigate(['/teacher/profile']);
        return false;
      }else if (this.businessUnitTypeId == '6') {
        // this.router.navigate(['/teacher/profile']);
        return true;
      } else {
        return false;
      }



      this.router.navigate(['/teacher']);
      return false;
    }else{

      alert("Session Expired");
      sessionStorage.removeItem('authTeacherDetails')
      sessionStorage.removeItem('mappingData')
      sessionStorage.removeItem('shiftYn')
      sessionStorage.removeItem('shiftAvailable')
      sessionStorage.removeItem('singleKvTeacher')
      sessionStorage.removeItem('systemTeacherCode')
      window.location.href=environment.AUTH_GUARD_HREF1
      // window.location.href='http://10.25.26.251:8385/meauth/logout?returnTo=http://10.25.26.251:4200'
      // this.router.navigate(['/teacher']);
      // return false;
    }
  }

  displayInstruction(){
    if(sessionStorage.getItem('displayPopUp') == undefined || sessionStorage.getItem('displayPopUp') == null){
      sessionStorage.setItem('displayPopUp', 'true')
    }else{
      sessionStorage.setItem('displayPopUp', 'false')
    }
  }
}
