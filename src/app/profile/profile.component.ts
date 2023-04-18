import { Component, OnInit } from '@angular/core';
import{DataService} from 'src/app/service/data.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService:DataService) { }
schoolProfile:any;
  ngOnInit(): void {
    this.getSchoolProfile();
  }

  getSchoolProfile(){
    this.dataService.getSchoolProfileByUdiseCode('01010100101').subscribe(res => {
    

    this.schoolProfile=res.data.result;


    },
      error => {
        // this.ngxLoader.stop();
      })
  }

}
