import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  imageData: any = "";
  firstName: any;
  lastName: any;
  teacherId:any;
  constructor(private outSideService: OutsideServicesService) { }

  public ngOnInit(): void {

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails.length; i++) {
      this.firstName = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.firstname;
      this.lastName = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.lastname;
      this.teacherId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
    }
    
    this.getProfileImage();

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#imageUpload").change(function () {
      readURL(this);
    });
  }

  fileToUpload: File | null = null;
  documentUpload(index) {
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('teacherId', JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name);
      formData.append('file', this.fileToUpload);
      formData.append('filename', "ProfilePic");

      this.outSideService.uploadProfileImage(formData).subscribe((res) => {
        this.getProfileImage();
      })
    } else {

    }
  }


  handleFileInput(files: FileList, index) {    
    var data = files.item(0).name
    var splitted = data.split('.', 2)
    if (splitted[1] == 'jpg' || splitted[1] == 'jpeg' || splitted[1] == 'PNG' || splitted[1] == 'png') {
      if (files.item(0).size <= 204800) {
        this.fileToUpload = files.item(0);
        this.documentUpload(0);
      }
    }
  }

  getProfileImage() {

    this.outSideService.getProfileImage(JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name).subscribe((res) => {
          if(res.status == '1' || res.status == '1'){
            this.imageData = "data:image/jpg;base64," + res.data;
          }else if(res.status == '0' || res.status == '0'){
            this.imageData = 'assets/assets/img/download.jpg';
          }
      
    },
      error => {
        this.imageData = 'assets/assets/img/download.jpg';
      })
  }



}
