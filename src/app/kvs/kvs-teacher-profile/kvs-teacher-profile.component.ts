import { Component, OnInit } from '@angular/core';
import {DataService}  from 'src/app/service/data.service'

@Component({
  selector: 'app-kvs-teacher-profile',
  templateUrl: './kvs-teacher-profile.component.html',
  styleUrls: ['./kvs-teacher-profile.component.css']
})
export class KvsTeacherProfileComponent implements OnInit {

  constructor(private dataService:DataService) { }
teacherData:any;
genderMale:any;
genderFemale:any;
  ngOnInit(): void {
  this.getTeacherByMobile();
  }


  getTeacherByMobile(){
    
    const data={'teacherMobile':JSON.parse(sessionStorage.getItem('logedInUserDetails')).mobile}
    // this.dataService.getKVTeacherByMobile(data).subscribe(res => {
      this.dataService.getTeacherByMobile(data).subscribe(res => {
    
        
        
this.teacherData=res[0];


if(this.teacherData.teacherGender==1){
  this.genderMale=1
}else if(this.teacherData.teacherGender==2){
  this.genderFemale=1
}
      // this.schoolProfile=res.data.result;
  
      
  
      },
        error => {
          // this.ngxLoader.stop();
        })
  }

}
