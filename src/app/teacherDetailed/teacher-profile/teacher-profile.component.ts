
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service'
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { environment } from 'src/environments/environment';

// import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare const loadScroller: any;
declare const nextClickCalled: any;
declare const onNextClick:any;
declare const onPreviousClick:any;

import * as moment from 'moment';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TeacherAppPdfService } from 'src/app/makePDF/teacher-app-pdf.service';
import { DatePipe } from '@angular/common';

interface SubjectData {
  subNameCode: string;
  subjectCode: string;
}

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile-updated.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  @ViewChild('verifyProfile', { static: true }) verifyProfile: TemplateRef<any>;
  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSpouseStationModal', { static: true }) selectSpouseStationModal: TemplateRef<any>;
  @ViewChild('schoolRemarksModal', { static: true }) schoolRemarksModal: TemplateRef<any>;
  @ViewChild('processFlow', { static: true }) processFlow: TemplateRef<any>;

  @ViewChild('pdfTable') pdfTable: ElementRef;

  flagUpdatedList: any;
  teacherForm: FormGroup;
  correctionProfile: FormGroup;
  tempTeacherId: any;
  isVisible: boolean = false;
  responseData: any;
  stationNameCode: any;
  kvNameCode: any;
  profQualMasterList: any;
  acadQualMasterList: any;
  subjectListQual: any[] = [];
  subjectListQualP: any[] = [];
  acdQualList: any;
  year: any = 'Enter year';
  find: any;
  public sh: boolean = true;
  public sh1: boolean = true;
  public sh2: boolean = true;
  public sh3: boolean = true;
  public sh4: boolean = true;
  public sh5: boolean = true;
  public sh6: boolean = true;
  public sh7: boolean = true;
  public sh8: boolean = true;

  public sh21: boolean = true;
  public sh22: boolean = true;
  public sh23: boolean = true;
  public sh24: boolean = true;
  public sh25: boolean = true;
  public sh26: boolean = true;
  public sh27: boolean = true;
  public sh28: boolean = true;

  currentDateTime: any;
  regionList: any;
  stationList: any
  kvSchoolList: any;
  selectedUdiseCode: any;
  indexNew: any;
  spouseNone: boolean = false;
  spouseKVSStation: boolean = false;
  marriedStatusYN: boolean = false;

  selectedSpouseStation: any;

  declaration1: boolean = false;
  declaration2: boolean = false;

  codeList: any;
  allowEdit: any;
  teacherTypeData: any;
  kvCode: any;
  subjectList: any;
  newTeacherEntry: any;
  addType: any;


  isVisibleBirth: boolean = false;
  isBirth: boolean = true;
  isVisibleTet: any;
  isSelectedTet: boolean = true;
  onvalid;
  teacherData: any;
  genderMale: any;
  genderFemale;
  genderOther;
  kvSchoolDetails: any;
  stationCode: any;
  teacherTypeDataNameCode: any = [];
  subjectListNameCode: any = [];
  formStatusLocale: any;

  subjectListNameCode1: SubjectData[] = [];
  subjectListNameCode2: any[] = [];

  tchExpList: any;

  applicationId: any;
  kvicons: any;
  kvIfConditions: boolean = false;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  awardsList: any;
  trainingList: any;

  workExpId: any;
  tchPromotionList: any;
  profQualList: any;
  formDataList: any;
  stateMasterList: any;
  districListByStateIdC: any;
  districListByStateIdP: any;

  documentUploadArray: any[] = [];
  enableUploadButton0: boolean = false;
  enableUploadButton1: boolean = false;
  enableUploadButton2: boolean = false;
  enableUploadButton3: boolean = false;
  enableUploadButton4: boolean = false;

  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate4: boolean = true;

  lastPromotionId: any;
  confirmEnable: boolean = false;

  verifyTchTeacherProfileData: any;
  verifyTchTeacherAcdQualification: any;
  verifyTchTeacherProfQualification: any;
  verifyTchTeacherAward: any;
  verifyTchTeacherTraining: any;
  verifyTchTeacherWorkExp: any;
  transferGroundList: any;

  hashId: any;
  gender: any;

  shiftYN: any;

  stationType:any;

  myAppointmnet(event) {
    if (event.target.value == "1") {
      this.onvalid = event.target.value;
    }
    else if (event.target.value == "0") {
      this.onvalid = event.target.value;
    }
  }


  toppings = new FormControl();
  toppingList: string[] = [];


  onClickDisability(val) {
    if (val == 'yes') {
      this.isVisible = true;
    } else if (val == 'no') {
      this.isVisible = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          disabilityType: '',
          disabilityFromBirthYN: '',
          disabilityDate: '',
          disabilityPercentage: '',
          disabilityCertAuth: '',
          disabilityCertNo: '',
        }
      })
    } else if (val == 'yesBirth') {
      this.isVisibleBirth = false;
    } else if (val == 'noBirth') {
      this.isVisibleBirth = true;
    }
  }

  nextClick(index) {
    onNextClick(index);
  }

  onPreviousClick(index){
    onPreviousClick(index);
  }

  constructor(private date: DatePipe, private dataService: DataService, private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private pdfServive: TeacherAppPdfService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('displayPopUp') == 'true'){
      this.modalService.open(this.processFlow, { size: 'xl', backdrop: 'static', keyboard: false })
    }
    
    // loadScroller(6);
    this.getDocumentByTeacherId();
    setTimeout(function () {
      loadScroller(6);
    }, 1000);

    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround
    this.getAllMaster();

    this.newTeacherEntry = false;

    this.teacherForm = new FormGroup({
      profileForm: new FormGroup({
        'empCode': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        'fullName': new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z ]*$")]),
        'gender': new FormControl('', Validators.required),
        'genderP': new FormControl('', Validators.required),
        'dob': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'socialCat': new FormControl(''),
        'religion': new FormControl(''),
        'nationality': new FormControl('', Validators.required),
        'mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
        'email': new FormControl('', [Validators.email, Validators.required]),
        'presentStationName': new FormControl('', Validators.required),
        'presentStationPostDate': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'presentKvName': new FormControl('', Validators.required),
        'presentKvDate': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'presentPostName': new FormControl('', Validators.required),
        'presentPostDate': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
        'presentSubjectName': new FormControl('', Validators.required),
        'tariningJnKvs': new FormControl(''),
        'staffType': new FormControl('', Validators.required),
        'staffTypeP': new FormControl('', Validators.required),
        'natureOfAptmnt': new FormControl('', Validators.required),

        'maritalStatusF': new FormControl('', Validators.required)
      }),
      disabilityForm: new FormGroup({
        'disabilityYN': new FormControl('', Validators.required),
        'disabilityType': new FormControl('', Validators.required),
        'disabilityFromBirthYN': new FormControl('', Validators.required),
        'disabilityDate': new FormControl('', Validators.required),
        'disabilityPercentage': new FormControl('', Validators.required),
        'disabilityCertAuth': new FormControl('', Validators.required),
        'disabilityCertNo': new FormControl('', Validators.required),
      }),
      personalInfoForm: new FormGroup({
        'disabilityYN': new FormControl('', Validators.required),
        'disabilityYNP': new FormControl(''),
        'disabilityType': new FormControl('', Validators.required),
        'disabilityFromBirthYN': new FormControl(''),
        'disabilityFromBirthYNP': new FormControl(''),
        'disabilityDate': new FormControl(''),
        'disabilityPercentage': new FormControl(''),
        'disabilityCertAuth': new FormControl(''),
        'disabilityCertNo': new FormControl(''),
        'bloodGroup': new FormControl(''),
        'crspndncAddress': new FormControl(''),
        'crspndncState': new FormControl(''),
        'crspndncDistrict': new FormControl(''),
        'crspndncPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
        'prmntAddress': new FormControl(''),
        'prmntState': new FormControl(''),
        'prmntDistrict': new FormControl(''),
        'prmntPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
        'personalIdNo': new FormControl(''),
        'aadhaarNo': new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(14), Validators.maxLength(14)]),
        'panNo': new FormControl('', [Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.minLength(10), Validators.maxLength(10)]),
        'passportNo': new FormControl('', [Validators.pattern("^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$")]),
        'spouseStatusF': new FormControl('', Validators.required),
        'spouseEmpCode': new FormControl('', Validators.required),
        'spouseName': new FormControl('', Validators.required),
        'spousePost': new FormControl('', Validators.required),

        'spouseStationCode': new FormControl(''),
        'spouseStationName': new FormControl('', Validators.required),

        'spouseStatusKVS': new FormControl('', Validators.required),
        'spouseStatusCentral': new FormControl('', Validators.required),
        'spouseStatusState': new FormControl('', Validators.required),
        'spouseStatusNone': new FormControl('', Validators.required),
        'sameAbove': new FormControl(),
      }),
      'detailsOfPosting': new FormArray([]),
      'subAndClassTaught': new FormArray([]),
      'promotionDetails': new FormArray([]),
      'acadProfQual': new FormArray([]),
      'profQual': new FormArray([]),
      'awardReceived': new FormArray([]),
      'trainingReceived': new FormArray([]),
      'subjectTaught': new FormArray([])
    })

    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails.length; i++) {
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].business_unit_type_code;
      if (JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.hashId != null) {
        this.hashId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.hashId;
      }

    }

    if (this.hashId != null) {
      this.getTeacherById(this.hashId);
    }

    // this.getSchoolDetailsByKvCode();

    if (this.kvicons?.includes(this.applicationId)) {
      this.kvIfConditions = true;
    } else {
      this.kvIfConditions = false;
    }
    this.getKvRegion();
  }




  //New --Start

  //Add and Remove Posting Form --Start
  detailsOfPosting(): FormArray {
    return this.teacherForm.get("detailsOfPosting") as FormArray
  }
  newQuantity(data): FormGroup {

    if (data != undefined) {
      return this.fb.group({
        teacherId: data.teacherId,
        workExperienceId: data.workExperienceId,
        shiftType: data.shiftType,
        groundForTransfer: data.groundForTransfer,
        currentlyActiveYn: data.currentlyActiveYn,
        shiftYn: data.shift_yn,
        udiseSchoolName: [data.udiseSchoolName, [Validators.required]],
        udiseSchCode: [data.udiseSchCode, [Validators.required]],
        workStartDate: [data.workStartDate, [Validators.required]],
        workEndDate: [data.workEndDate, [Validators.required]],
        natureOfAppointment: [data.natureOfAppointment, [Validators.required]],
        positionType: [data.positionType, [Validators.required]],
        appointedForSubject: [data.appointedForSubject, [Validators.required]],
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        workExperienceId: '',
        shiftType: ["", [Validators.required]],
        groundForTransfer: ["", [Validators.required]],
        currentlyActiveYn: '',
        udiseSchoolName: ["", [Validators.required]],
        udiseSchCode: ["", [Validators.required]],
        workStartDate: ["", [Validators.required]],
        workEndDate: ["", [Validators.required]],
        natureOfAppointment: ["", [Validators.required]],
        positionType: ["", [Validators.required]],
        appointedForSubject: ["", [Validators.required]],
        shiftYn: '',
      })
    }

  }
  addQuantity(data) {
    this.detailsOfPosting().push(this.newQuantity(data));
  }
  removeQuantity(val) {

    if(this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA'|| this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES'){
      return
    }else{
    let deletedData = this.teacherForm.value.detailsOfPosting[val]
    var data = {
      "workExperienceId": deletedData.workExperienceId
    }

    if (this.workExpId == data.workExperienceId) {
      Swal.fire(
        'Alert !',
        'This record cannot be deleted !',
        'error'
      )
    } else {
      this.detailsOfPosting().removeAt(val)
      this.outSideService.deleteExpByWorkExpId(data).subscribe((response) => {
        if (response) {
          Swal.fire(
            'This record has been deleted !',
            '',
            'success'
          )
        }
      })
    }
    }



    // this.detailsOfPosting().removeAt();
  }

  getTchExpByTchId() {
    (this.teacherForm.controls['detailsOfPosting'] as FormArray).clear();
    this.tchExpList = [];
    this.subjectListNameCode2 = [];
    if (this.tempTeacherId) {
      this.outSideService.fetchTchExpByTchId(this.tempTeacherId).subscribe((res) => {
        this.tchExpList = res.response;
        for (let i = 0; i < this.tchExpList.length; i++) {
          var data = {
            "applicationId": this.applicationId,
            "teacherTypeId": this.tchExpList[i].positionType
          }

          if (this.tchExpList[i].workEndDate != null && this.tchExpList[i].workEndDate != "null") {
            this.tchExpList[i].workEndDate = this.date.transform(new Date(this.tchExpList[i].workEndDate * 1), 'yyyy-MM-dd')
          }
          this.tchExpList[i].workStartDate = this.date.transform(new Date(this.tchExpList[i].workStartDate * 1), 'yyyy-MM-dd')

          this.addQuantity(this.tchExpList[i])
          this.getSubjectByTchTypeExp(data, i)

          this.tempTeacherId = this.tchExpList[i].teacherId;
        }
        for (let i = 0; i < this.tchExpList.length; i++) {
          if (this.tchExpList[i].workExperienceId == this.workExpId) {
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('workEndDate').disable();
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('groundForTransfer').disable();
            if (sessionStorage.getItem('shiftAvailable') == '0') {
              ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('shiftType').disable();
            }
          }
          if (this.tchExpList[i].shift_yn == '0') {
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('shiftType').disable();
          } else if (this.tchExpList[i].shift_yn == '0') {
            ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('shiftType').enable();
          }

        }
      })
    } else {
    }

  }
  //Add and Remove Posting Form --Start 

  //Add and Remove Promotion Details -- Start
  addQuantityPromotion(data) {
    this.promotionDetails().push(this.newQuantityPromotion(data));
  }
  promotionDetails(): FormArray {
    return this.teacherForm.get("promotionDetails") as FormArray
  }
  newQuantityPromotion(data): FormGroup {

    if (data != undefined) {
      return this.fb.group({
        promotionId: data.promotionId,
        teacherId: this.tempTeacherId,
        udiseSchCode: data.udiseSchCode,
        schoolId: data.schoolId,
        businessUnitCode: data.businessUnitCode,
        businessUnitTypeId: data.businessUnitTypeId,
        currentlyWorkingYn: data.currentlyWorkingYn,
        workStartDate: [data.workStartDate, [Validators.required]],
        workEndDate: data.workEndDate,
        positionType: [data.positionType, [Validators.required]],
        natureOfAppontment: data.natureOfAppontment
      })
    } else {
      return this.fb.group({
        promotionId: '',
        teacherId: this.tempTeacherId,
        udiseSchCode: '',
        schoolId: '',
        businessUnitCode: '',
        businessUnitTypeId: '',
        currentlyWorkingYn: '',
        workStartDate: ["", [Validators.required]],
        workEndDate: '',
        positionType: ["", [Validators.required]],
        natureOfAppontment: ''
      })
    }
  }
  removeQuantityPromotion(val) {
    let deletedData = this.teacherForm.value.promotionDetails[val]

    if (deletedData.promotionId == this.lastPromotionId) {

      Swal.fire(
        'Alert !',
        'This record cannot be deleted !',
        'error'

      )
    } else {
      this.promotionDetails().removeAt(val)
      this.outSideService.deletePromotion(deletedData.promotionId).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'This record has been deleted !',
            '',
            'success'
          )
        }
      })
    }

  }
  getPromotionByTchId() {
    (this.teacherForm.controls['promotionDetails'] as FormArray).clear();
    this.tchPromotionList = [];
    if (this.tempTeacherId) {
      this.outSideService.fetchPromotionByTchId(this.tempTeacherId).subscribe((res) => {
        this.tchPromotionList = res.response;
        for (let i = 0; i < this.tchPromotionList.length; i++) {
          this.addQuantityPromotion(this.tchPromotionList[i])
        }
      })
    } else {
    }

  }
  //Add and Remove Promotion Details -- End

  //Add and Remove Academic Qualification-- Start
  addAcadProfQual(data) {
    this.acadProfQual().push(this.newAcadProfQual(data));
  }
  newAcadProfQual(data) {

    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherEducationalQualificationId: data.teacherEducationalQualificationId,
        qualificationDegreeId: [data.qualificationDegreeId, [Validators.required]],
        qualificationDegreeMajorList: [data.qualificationDegreeMajorList, [Validators.required]],
        qualificationDegreeMinorList: [data.qualificationDegreeMinorList, [Validators.required]],
        boardUniversity: [data.boardUniversity, [Validators.required]],
        institution: [data.institution, [Validators.required]],
        yearOfPassing: [data.yearOfPassing, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [data.totalMarks],
        marksObtaioned: [data.marksObtaioned]
      })
    } else {

      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherEducationalQualificationId: '',
        qualificationDegreeId: ["", [Validators.required]],
        qualificationDegreeMajorList: ["", [Validators.required]],
        qualificationDegreeMinorList: ["", [Validators.required]],
        boardUniversity: ["", [Validators.required]],
        institution: ["", [Validators.required]],
        yearOfPassing: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [""],
        marksObtaioned: [""]
      })
    }
  }
  acadProfQual() {
    return this.teacherForm.get("acadProfQual") as FormArray
  }
  removeAcadQual(val) {

    if(this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA'|| this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES'){
      return
    }else{
      let deletedData = this.teacherForm.value.acadProfQual[val]
      this.acadProfQual().removeAt(val)
  
      this.outSideService.deteleEducationalQualification(deletedData.teacherEducationalQualificationId).subscribe((response) => {
        if (response.status == '1') {
          Swal.fire(
            'Record has been successfully deleted!',
            '',
            'success'
          )
        }
      })
    }   
  }
  getAcdQualList() {

    this.acdQualList = [];
    (this.teacherForm.controls['acadProfQual'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchAcdQual(this.tempTeacherId).subscribe((res) => {

        this.acdQualList = res.response;
        for (let i = 0; i < this.acdQualList.length; i++) {

          this.getSubjectByQualAll(this.acdQualList[i].qualificationDegreeId, 'A', i)
        }
      })
    } else {
    }

  }



  //Add and Remove Academic Qualification -- End

  //Add and Remove Academic Professional Form -- Start
  addProfQual(data) {
    this.profQual().push(this.newProfQual(data));
  }
  newProfQual(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherProfessionalQualificationId: data.teacherProfessionalQualificationId,
        qualificationDegreeId: [data.qualificationDegreeId, [Validators.required]],
        qualificationDegreeMajorList: [data.qualificationDegreeMajorList, [Validators.required]],
        boardUniversity: [data.boardUniversity, [Validators.required]],
        institution: [data.institution, [Validators.required]],
        yearOfPassing: [data.yearOfPassing, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [data.totalMarks],
        marksObtaioned: [data.marksObtaioned]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        teacherProfessionalQualificationId: '',
        qualificationDegreeId: ["", [Validators.required]],
        qualificationDegreeMajorList: ["", [Validators.required]],
        boardUniversity: ["", [Validators.required]],
        institution: ["", [Validators.required]],
        yearOfPassing: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
        totalMarks: [""],
        marksObtaioned: [""]
      })
    }
  }
  profQual() {
    return this.teacherForm.get("profQual") as FormArray
  }
  removeProfQual(val) {

    if(this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA'|| this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES'){
      return
    }else{
    let deletedData = this.teacherForm.value.profQual[val]
    this.profQual().removeAt(val)

    this.outSideService.deleteProfessionalQualification(deletedData.teacherProfessionalQualificationId).subscribe((response) => {
      if (response.status == '1') {
        Swal.fire(
          'This record has been deleted !',
          '',
          'success'
        )
      }
    })
  }
  }
  getProfQualList() {

    this.profQualList = [];
    (this.teacherForm.controls['profQual'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchProfQual(this.tempTeacherId).subscribe((res) => {

        this.profQualList = res.response;

        for (let i = 0; i < this.profQualList.length; i++) {
          this.getSubjectByQualAll(this.profQualList[i].qualificationDegreeId, 'P', i)
        }
      })
    } else {
    }

  }
  //Add and Remove Academic Professional Form -- End



  //Add and Remove Award Received Form --Start
  addawardReceived(data) {
    this.awardReceived().push(this.newawardReceived(data));
  }
  newawardReceived(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: data.id,
        awardId: data.awardId,
        awardName: [data.awardName, [Validators.required]],
        awardYear: [data.awardYear, [Validators.required]],
        awardBy: [data.awardBy, [Validators.required]],
        remarks: [data.remarks]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: '',
        awardName: ["", [Validators.required]],
        awardId: ["", [Validators.required]],
        awardYear: ["", [Validators.required]],
        awardBy: ["", [Validators.required]],
        remarks: [""]
      })
    }
  }
  awardReceived() {
    return this.teacherForm.get("awardReceived") as FormArray
  }
  removeAwardReceived(val) {

    if(this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA'|| this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES'){
      return
    }else{
    let deletedData = this.teacherForm.value.awardReceived[val]
    this.awardReceived().removeAt(val)

    this.outSideService.deleteAwards(deletedData.id).subscribe((response) => {
      if (response.status == '1') {
        Swal.fire(
          'This record has been deleted !',
          '',
          'success'
        )
      }
    })
  }
  }
  getAwardsByTchId() {
    this.awardsList = [];
    (this.teacherForm.controls['awardReceived'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchAwardsByTchId(this.tempTeacherId).subscribe((res) => {
        this.awardsList = res.response;
        for (let i = 0; i < this.awardsList.length; i++) {
          this.addawardReceived(this.awardsList[i])
        }
      })
    } else {
    }

  }
  //Add and Remove Award Received Form --End

  //Training Received Form --Start
  addtrainingReceived(data) {
    this.trainingReceived().push(this.newtrainingReceived(data));


  }
  newtrainingReceived(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        place: [data.place, [Validators.required]],
        id: data.id,
        trainingOrganizedBy: [data.trainingOrganizedBy, [Validators.required]],
        trainingName: [data.trainingName, [Validators.required]],
        trainingYear: [data.trainingYear, [Validators.required]]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        place: ["", [Validators.required]],
        id: '',
        trainingOrganizedBy: ["", [Validators.required]],
        trainingName: ["", [Validators.required]],
        trainingYear: ["", [Validators.required]]
      })
    }
  }
  trainingReceived() {
    return this.teacherForm.get("trainingReceived") as FormArray
  }
  removeTrainingReceived(val) {

    if(this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA'|| this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES'){
      return
    }else{
    let deletedData = this.teacherForm.value.trainingReceived[val]
    this.trainingReceived().removeAt(val)

    this.outSideService.deleteTraning(deletedData.id).subscribe((response) => {
      if (response.status == '1') {
        Swal.fire(
          'This record has been deleted !',
          '',
          'success'
        )
      }
    })
  }
  }
  getTrainingByTchId() {
    this.awardsList = [];
    (this.teacherForm.controls['trainingReceived'] as FormArray).clear();
    if (this.tempTeacherId) {
      this.outSideService.fetchTrainingList(this.tempTeacherId).subscribe((res) => {
        this.trainingList = res.response;
        for (let i = 0; i < this.trainingList.length; i++) {
          this.addtrainingReceived(this.trainingList[i])
        }
      })
    } else {
    }

  }
  //Training Received Form --End


  //Class Taught and Subject -- Start
  addsubjectTaught(data) {
    this.subjectTaught().push(this.newsubjectTaught(data));


  }
  newsubjectTaught(data) {
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: data.id,
        classTaught: [data.classTaught, [Validators.required]],
        subjectTaught: [data.subjectTaught, [Validators.required]],
        moiTaught: [data.moiTaught, [Validators.required]]
      })
    } else {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id: '',
        classTaught: ["", [Validators.required]],
        subjectTaught: ["", [Validators.required]],
        moiTaught: ["", [Validators.required]]
      })
    }
  }
  subjectTaught() {
    return this.teacherForm.get("subjectTaught") as FormArray
  }
  removesubjectTaught(val) {
    if(this.formStatusLocale == 'TA' || this.formStatusLocale == 'SEM' || this.formStatusLocale == 'SA'|| this.formStatusLocale == 'SE' || this.formStatusLocale == 'SES'){
      return
    }else{
    this.subjectTaught().removeAt(val)
    }
  }

  genderValueConvt(event) {
    this.genderValueConvtFinal(event.target.value);
  }

  genderValueConvtFinal(val) {

    if (val == '1') {

      this.teacherForm.patchValue({
        profileForm: ({
          genderP: 'Male'
        })
      })

    } else if (val == '2') {
      this.teacherForm.patchValue({
        profileForm: ({
          genderP: 'Female'
        })
      })
    } else if (val == '3') {
      this.teacherForm.patchValue({
        profileForm: ({
          genderP: 'Others'
        })
      })
    }
  }

  getFlagStatus(tchId) {
    this.outSideService.getUpdatedFlag(tchId).subscribe((res) => {
      this.flagUpdatedList = res.response

    }, (error) => {

    })
  }

  onSubmit(event: Event) {
    var activeButton = document.activeElement.id;
    if (activeButton == "submit1") {
      this.responseData.lastPromotionId = this.lastPromotionId;
      this.responseData.workExperienceIdPresentKv = this.workExpId;
      this.responseData.udiseSchoolName = this.schName;
      this.responseData.currentUdiseSchCode = this.udiseSchCode;
      this.responseData.teacherId = this.tempTeacherId;
      this.responseData.teacherDob = this.teacherForm.value.profileForm.dob;
      this.responseData.teacherEmail = this.teacherForm.value.profileForm.email;
      this.responseData.teacherEmployeeCode = this.teacherForm.value.profileForm.empCode;
      this.responseData.teacherGender = this.teacherForm.value.profileForm.gender;
      this.responseData.teacherMobile = this.teacherForm.value.profileForm.mobile;
      this.responseData.teacherName = this.teacherForm.value.profileForm.fullName;
      this.responseData.teacherNationality = this.teacherForm.value.profileForm.nationality;
      this.responseData.teacherReligion = this.teacherForm.value.profileForm.religion;
      this.responseData.teacherSocialCategory = this.teacherForm.value.profileForm.socialCat;
      this.responseData.workExperienceAppointedForSubject = this.teacherForm.value.profileForm.presentSubjectName;
      this.responseData.workExperiencePositionTypePresentStationStartDate = this.teacherForm.value.profileForm.presentStationPostDate;
      this.responseData.workExperienceWorkStartDatePresentKv = this.teacherForm.value.profileForm.presentKvDate;
      this.responseData.lastPromotionPositionType = this.teacherForm.value.profileForm.presentPostName;
      this.responseData.lastPromotionPositionDate = this.teacherForm.value.profileForm.presentPostDate;
      this.responseData.teachingNonteaching = this.teacherForm.value.profileForm.staffType;
      this.responseData.natureOfAppointment = this.teacherForm.value.profileForm.natureOfAptmnt;

      this.responseData.teacherSystemGeneratedCode = sessionStorage.getItem('systemTeacherCode');
      this.responseData.teacherAccountId = this.responseData.teacherAccountId;


      this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
        this.responseData = JSON.parse(JSON.stringify(res)).response;
        this.flagUpdatedList.form1Status = 'TI'
        this.flagUpdatedList.finalStatus = 'TI'
        sessionStorage.setItem('finalStatus', 'TI')
        this.formStatusLocale = 'TI'
        this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
          this.flagUpdatedList = res.response
        })

        sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
        this.tempTeacherId = this.responseData.teacherId;
        this.workExpId = this.responseData.workExperienceIdPresentKv;
        this.lastPromotionId = this.responseData.lastPromotionId;
        // sessionStorage.setItem('workExpId', this.workExpId)
        Swal.fire(
          'Your Data has been saved Successfully!',
          '',
          'success'
        )
        this.nextClick(2)
      })
    } else if (activeButton == "submit2") {
      this.responseData.teacherDisabilityYn = this.teacherForm.value.disabilityForm.disabilityYN;
      this.responseData.teacherDisabilityType = this.teacherForm.value.disabilityForm.disabilityType;
      this.responseData.teacherDisabilityPrcnt = this.teacherForm.value.disabilityForm.disabilityPercentage;
      this.responseData.teacherDisabilityFromBirthYn = this.teacherForm.value.disabilityForm.disabilityFromBirthYN;
      this.responseData.teacherDisabilityDate = this.teacherForm.value.disabilityForm.disabilityDate;
      this.responseData.teacherDisabilityCertNumber = this.teacherForm.value.disabilityForm.disabilityCertNo;
      this.responseData.teacherDisabilityCertAuthority = this.teacherForm.value.disabilityForm.disabilityCertAuth;

      this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
        this.responseData = JSON.parse(JSON.stringify(res)).response;
        sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
        this.tempTeacherId = this.responseData.teacherId;
        this.workExpId = this.responseData.workExperienceIdPresentKv;
        Swal.fire(
          'Your Data has been saved Successfully!',
          '',
          'success'
        )
        this.nextClick(2)
      })
    } else if (activeButton == "submit3") {
      
      if (this.teacherForm.value.personalInfoForm.disabilityYN == '1') {
        if (this.documentUploadArray[4].docName == 'Physically_Handicap_Certificate.pdf') {
          this.responseData.teacherDisabilityYn = this.teacherForm.value.personalInfoForm.disabilityYN;
          this.responseData.teacherDisabilityType = this.teacherForm.value.personalInfoForm.disabilityType;
          this.responseData.teacherDisabilityPrcnt = this.teacherForm.value.personalInfoForm.disabilityPercentage;
          this.responseData.teacherDisabilityFromBirthYn = this.teacherForm.value.personalInfoForm.disabilityFromBirthYN;
          this.responseData.teacherDisabilityDate = this.teacherForm.value.personalInfoForm.disabilityDate;
          this.responseData.teacherDisabilityCertNumber = this.teacherForm.value.personalInfoForm.disabilityCertNo;
          this.responseData.teacherDisabilityCertAuthority = this.teacherForm.value.personalInfoForm.disabilityCertAuth;
          this.responseData.teacherBloodGroup = this.teacherForm.value.personalInfoForm.bloodGroup
          this.responseData.teacherCorrespondenceAddress = this.teacherForm.value.personalInfoForm.crspndncAddress
          this.responseData.teacherCorrespondenceDistrict = this.teacherForm.value.personalInfoForm.crspndncDistrict
          this.responseData.teacherCorrespondencePin = this.teacherForm.value.personalInfoForm.crspndncPinCode
          this.responseData.teacherCorrespondenceState = this.teacherForm.value.personalInfoForm.crspndncState
          if(this.teacherForm.value.personalInfoForm.sameAbove == true){
            this.responseData.teacherParmanentState = this.teacherForm.getRawValue().personalInfoForm.prmntState
          }else{
            this.responseData.teacherParmanentState = this.teacherForm.value.personalInfoForm.prmntState
          }
          if(this.teacherForm.value.personalInfoForm.sameAbove == true){
            this.responseData.teacherPermanentAddress = this.teacherForm.getRawValue().personalInfoForm.prmntAddress
          }else{
            this.responseData.teacherPermanentAddress = this.teacherForm.value.personalInfoForm.prmntAddress
          }
          if(this.teacherForm.value.personalInfoForm.sameAbove == true){
            this.responseData.teacherPermanentDistrict = this.teacherForm.getRawValue().personalInfoForm.prmntDistrict
          }else{
            this.responseData.teacherPermanentDistrict = this.teacherForm.value.personalInfoForm.prmntDistrict
          }
          if(this.teacherForm.value.personalInfoForm.sameAbove == true){
            this.responseData.teacherPermanentPin = this.teacherForm.getRawValue().personalInfoForm.prmntPinCode
          }else{
            this.responseData.teacherPermanentPin = this.teacherForm.value.personalInfoForm.prmntPinCode
          }
          this.responseData.teacherPanNumber = this.teacherForm.value.personalInfoForm.panNo
          this.responseData.teacherAadhaarNumber = this.teacherForm.value.personalInfoForm.aadhaarNo
          this.responseData.teacherPassportNumber = this.teacherForm.value.personalInfoForm.passportNo
          this.responseData.teacherPersonnelIdentification = this.teacherForm.value.personalInfoForm.personalIdNo


          this.responseData.spouseStatus = this.teacherForm.value.personalInfoForm.spouseStatusF
          this.responseData.spouseEmpCode = this.teacherForm.value.personalInfoForm.spouseEmpCode
          this.responseData.spouseName = this.teacherForm.value.personalInfoForm.spouseName
          this.responseData.spousePost = this.teacherForm.value.personalInfoForm.spousePost
          this.responseData.spouseStationCode = this.teacherForm.value.personalInfoForm.spouseStationCode
          this.responseData.spouseStationName = this.teacherForm.value.personalInfoForm.spouseStationName
          this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
            this.responseData = JSON.parse(JSON.stringify(res)).response;

            this.flagUpdatedList.form3Status = 'TI'
            this.flagUpdatedList.finalStatus = 'TI'
            sessionStorage.setItem('finalStatus', 'TI')
            this.formStatusLocale = 'TI'
            this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
              this.flagUpdatedList = res.response
            })

            sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
            this.tempTeacherId = this.responseData.teacherId;

            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )
            this.nextClick(3)
          })
        } else {
          Swal.fire(
            'Please upload the PH Certificate!',
            '',
            'error'
          )
        }
      } else {
        this.responseData.teacherDisabilityYn = this.teacherForm.value.personalInfoForm.disabilityYN;
        this.responseData.teacherDisabilityType = this.teacherForm.value.personalInfoForm.disabilityType;
        this.responseData.teacherDisabilityPrcnt = this.teacherForm.value.personalInfoForm.disabilityPercentage;
        this.responseData.teacherDisabilityFromBirthYn = this.teacherForm.value.personalInfoForm.disabilityFromBirthYN;
        this.responseData.teacherDisabilityDate = this.teacherForm.value.personalInfoForm.disabilityDate;
        this.responseData.teacherDisabilityCertNumber = this.teacherForm.value.personalInfoForm.disabilityCertNo;
        this.responseData.teacherDisabilityCertAuthority = this.teacherForm.value.personalInfoForm.disabilityCertAuth;
        this.responseData.teacherBloodGroup = this.teacherForm.value.personalInfoForm.bloodGroup
        this.responseData.teacherCorrespondenceAddress = this.teacherForm.value.personalInfoForm.crspndncAddress
        this.responseData.teacherCorrespondenceDistrict = this.teacherForm.value.personalInfoForm.crspndncDistrict
        this.responseData.teacherCorrespondencePin = this.teacherForm.value.personalInfoForm.crspndncPinCode
        this.responseData.teacherCorrespondenceState = this.teacherForm.value.personalInfoForm.crspndncState
        if(this.teacherForm.value.personalInfoForm.sameAbove == true){
          this.responseData.teacherParmanentState = this.teacherForm.getRawValue().personalInfoForm.prmntState
        }else{
          this.responseData.teacherParmanentState = this.teacherForm.value.personalInfoForm.prmntState
        }
        if(this.teacherForm.value.personalInfoForm.sameAbove == true){
          this.responseData.teacherPermanentAddress = this.teacherForm.getRawValue().personalInfoForm.prmntAddress
        }else{
          this.responseData.teacherPermanentAddress = this.teacherForm.value.personalInfoForm.prmntAddress
        }
        if(this.teacherForm.value.personalInfoForm.sameAbove == true){
          this.responseData.teacherPermanentDistrict = this.teacherForm.getRawValue().personalInfoForm.prmntDistrict
        }else{
          this.responseData.teacherPermanentDistrict = this.teacherForm.value.personalInfoForm.prmntDistrict
        }
        if(this.teacherForm.value.personalInfoForm.sameAbove == true){
          this.responseData.teacherPermanentPin = this.teacherForm.getRawValue().personalInfoForm.prmntPinCode
        }else{
          this.responseData.teacherPermanentPin = this.teacherForm.value.personalInfoForm.prmntPinCode
        }
        this.responseData.teacherPanNumber = this.teacherForm.value.personalInfoForm.panNo
        this.responseData.teacherAadhaarNumber = this.teacherForm.value.personalInfoForm.aadhaarNo
        this.responseData.teacherPassportNumber = this.teacherForm.value.personalInfoForm.passportNo
        this.responseData.teacherPersonnelIdentification = this.teacherForm.value.personalInfoForm.personalIdNo


        this.responseData.spouseStatus = this.teacherForm.value.personalInfoForm.spouseStatusF
        this.responseData.spouseEmpCode = this.teacherForm.value.personalInfoForm.spouseEmpCode
        this.responseData.spouseName = this.teacherForm.value.personalInfoForm.spouseName
        this.responseData.spousePost = this.teacherForm.value.personalInfoForm.spousePost
        this.responseData.spouseStationCode = this.teacherForm.value.personalInfoForm.spouseStationCode
        this.responseData.spouseStationName = this.teacherForm.value.personalInfoForm.spouseStationName
        this.outSideService.saveSingleTeacher(this.responseData).subscribe((res) => {
          this.responseData = JSON.parse(JSON.stringify(res)).response;

          this.flagUpdatedList.form3Status = 'TI'
          this.flagUpdatedList.finalStatus = 'TI'
          sessionStorage.setItem('finalStatus', 'TI')
          this.formStatusLocale = 'TI'
          this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
            this.flagUpdatedList = res.response
          })

          sessionStorage.setItem('responseData', JSON.stringify(this.responseData))
          this.tempTeacherId = this.responseData.teacherId;

          Swal.fire(
            'Your Data has been saved Successfully!',
            '',
            'success'
          )
          this.nextClick(3)
        })
      }


    } else if (activeButton == "submit33") {
      if (this.teacherForm.controls.profileForm.status == 'VALID') {
        if (this.teacherForm.controls.acadProfQual.status == 'VALID') {
          if (this.teacherForm.controls.profQual.status == 'VALID') {
            if (this.teacherForm.controls.awardReceived.status == 'VALID') {
              if (this.teacherForm.controls.trainingReceived.status == 'VALID') {
                if (this.teacherForm.controls.detailsOfPosting.status == 'VALID') {
                  if (this.teacherForm.value.personalInfoForm.disabilityYN == '1') {
                    for (let i = 0; i < this.documentUploadArray.length; i++) {
                      if (this.documentUploadArray[i].docName == 'Physically_Handicap_Certificate.pdf') {
                        this.flagUpdatedList.finalStatus = 'TA'
                        sessionStorage.setItem('finalStatus', 'TA')
                        this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
                          this.flagUpdatedList = res.response
                          this.formStatusLocale = 'TA'
                          Swal.fire(
                            'Your Data has been saved for verification!',
                            '',
                            'success'
                          )
                        })
                        const flagData = {
                          'teacherId': this.tempTeacherId,
                          'form1Status': this.flagUpdatedList.form1Status,
                          'form2Status': this.flagUpdatedList.form1Status,
                          'form3Status': this.flagUpdatedList.form1Status,
                          'form4Status': this.flagUpdatedList.form1Status,
                          'form5Status': this.flagUpdatedList.form1Status,
                          'form6Status': this.flagUpdatedList.form1Status,
                          'form7Status': this.flagUpdatedList.form1Status,
                          'finalStatus': 'TA',
                        }
                        this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
                        })
                      } else {
                        Swal.fire(
                          'Kindly upload PH Certificate !',
                          '',
                          'error'
                        )
                      }
                    }
                  } else {
                    this.flagUpdatedList.finalStatus = 'TA'
                    sessionStorage.setItem('finalStatus', 'TA')
                    this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
                      this.flagUpdatedList = res.response
                      this.formStatusLocale = 'TA';
                      Swal.fire(
                        'Your Data has been saved and sent for Verification!',
                        '',
                        'success'
                      )
                    })
                    const flagData = {
                      'teacherId': this.tempTeacherId,
                      'form1Status': this.flagUpdatedList.form1Status,
                      'form2Status': this.flagUpdatedList.form1Status,
                      'form3Status': this.flagUpdatedList.form1Status,
                      'form4Status': this.flagUpdatedList.form1Status,
                      'form5Status': this.flagUpdatedList.form1Status,
                      'form6Status': this.flagUpdatedList.form1Status,
                      'form7Status': this.flagUpdatedList.form1Status,
                      'finalStatus': 'TA',
                    }
                    this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
                    })
                  }
                } else {
                  Swal.fire(
                    'Kindly complete your Experience Profile!',
                    '',
                    'error'
                  )
                }
              } else {
                Swal.fire(
                  'Kindly complete your Training Profile!',
                  '',
                  'error'
                )
              }
            } else {
              Swal.fire(
                'Kindly complete your Award Profile!',
                '',
                'error'
              )
            }
          } else {
            Swal.fire(
              'Kindly complete your Qualification Profile!',
              '',
              'error'
            )
          }
        } else {
          Swal.fire(
            'Kindly complete your Qualification Profile!',
            '',
            'error'
          )
        }
      }
      else {
        Swal.fire(
          'Kindly complete your Basic Profile!',
          '',
          'error'
        )
      }
    } else if (activeButton == "submit4") {

      for (let i = 0; i < this.teacherForm.value.acadProfQual.length; i++) {
        this.teacherForm.value.acadProfQual[i].teacherId = this.tempTeacherId
      }
      for (let i = 0; i < this.teacherForm.value.profQual.length; i++) {
        this.teacherForm.value.profQual[i].teacherId = this.tempTeacherId
      }

      if (this.teacherForm.controls.profQual.status == 'VALID' &&
        this.teacherForm.controls.acadProfQual.status == 'VALID') {

        this.outSideService.saveTchAcadQual(this.teacherForm.value.acadProfQual).subscribe((res) => {


          this.flagUpdatedList.form1Status = 'TI'
          this.flagUpdatedList.finalStatus = 'TI'
          sessionStorage.setItem('finalStatus', 'TI')
          this.formStatusLocale = 'TI'
          this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
            this.flagUpdatedList = res.response
          })
        })

        this.outSideService.saveTchProfQual(this.teacherForm.value.profQual).subscribe((res) => {


          this.flagUpdatedList.form1Status = 'TI'
          this.flagUpdatedList.finalStatus = 'TI'
          sessionStorage.setItem('finalStatus', 'TI')
          this.formStatusLocale = 'TI'
          this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {
            this.flagUpdatedList = res.response
          })

          Swal.fire(
            'Your Data has been saved Successfully!',
            '',
            'success'
          )
          this.nextClick(4)
          if (JSON.parse(JSON.stringify(res)).response.length > 0) {
            this.getProfQualList();
            this.getAcdQualList();
          }

        })
      } else {
        Swal.fire(
          'Please fill the required data!',
          '',
          'error'
        )
      }



    } else if (activeButton == "submit5") {

      for (let i = 0; i < this.teacherForm.value.awardReceived.length; i++) {
        this.teacherForm.value.awardReceived[i].teacherId = this.tempTeacherId
      }
      for (let i = 0; i < this.teacherForm.value.trainingReceived.length; i++) {
        this.teacherForm.value.trainingReceived[i].teacherId = this.tempTeacherId
      }

      if (this.teacherForm.controls.awardReceived.status == 'VALID' &&
        this.teacherForm.controls.trainingReceived.status == 'VALID') {

        this.outSideService.saveAwards(this.teacherForm.value.awardReceived).subscribe((res) => {
          if (res.status == '1') {
            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )

            this.flagUpdatedList.form1Status = 'TI'
            this.flagUpdatedList.finalStatus = 'TI'
            sessionStorage.setItem('finalStatus', 'TI')
            this.formStatusLocale = 'TI'
            this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {

              this.flagUpdatedList = res.response
            })

          } else if (res.status == '0') {
            Swal.fire(
              res.message
            )
          }
        })
        this.outSideService.saveTraining(this.teacherForm.value.trainingReceived).subscribe((res) => {
          if (res.status == '1') {
            this.getAwardsByTchId();
            this.getTrainingByTchId();
            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )
            this.nextClick(5)
            this.flagUpdatedList.form1Status = 'TI'
            this.flagUpdatedList.finalStatus = 'TI'
            sessionStorage.setItem('finalStatus', 'TI')
            this.formStatusLocale = 'TI'
            this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {

              this.flagUpdatedList = res.response
            })
          } else if (res.status == '0') {
            Swal.fire(
              res.message
            )
          }
        })

      } else {
        Swal.fire(
          'Please fill the required data!',
          '',
          'error'
        )
      }
    } else if (activeButton == "submit6") {

      for (let i = 0; i < this.teacherForm.value.detailsOfPosting.length; i++) {
        this.teacherForm.value.detailsOfPosting[i].teacherId = this.tempTeacherId
        if (this.teacherForm.value.detailsOfPosting[i].workExperienceId == this.workExpId) {
          this.teacherForm.value.detailsOfPosting[i].currentlyActiveYn = '1';
        } else {
          this.teacherForm.value.detailsOfPosting[i].currentlyActiveYn = '0';
        }
      }
      for (let i = 0; i < this.teacherForm.value.promotionDetails.length; i++) {
        this.teacherForm.value.promotionDetails[i].teacherId = this.tempTeacherId
      }

      if (this.teacherForm.controls.detailsOfPosting.status == 'VALID') {
        this.outSideService.saveTchExperience(this.teacherForm.value.detailsOfPosting).subscribe((res) => {

          var responsePosting = res.status;
          if (responsePosting == '1') {
            this.onVerifyClick();
            Swal.fire(
              'Your Data has been saved Successfully!',
              '',
              'success'
            )
            this.nextClick(6)
            this.flagUpdatedList.form1Status = 'TI'
            this.flagUpdatedList.finalStatus = 'TI'
            sessionStorage.setItem('finalStatus', 'TI')
            this.formStatusLocale = 'TI'
            this.outSideService.updateFormStatusFlag(this.flagUpdatedList).subscribe((res) => {

              this.flagUpdatedList = res.response
            })

            this.getTchExpByTchId();
          } else if (responsePosting == '0') {
            Swal.fire(
              res.message
            )
          }
        })
        this.outSideService.savePromotion(this.teacherForm.value.promotionDetails).subscribe((res) => {
        })
      } else {
        Swal.fire(
          'Please enter the required data!',
          '',
          'error'
        )
      }
    }
  }

  onCorrectionFormSubmit() {

    this.outSideService.saveCorrectionFormProfile(this.correctionProfile.value).subscribe((res) => {

    })
  }

  onSpouseClick(event) {
    this.spouseValueConvt(event.target.value)
    if (event.target.value == '1') {
      this.spouseNone = true;
      this.spouseKVSStation = true;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });

    } else if (event.target.value == '2') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });
    } else if (event.target.value == '3') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });
    } else if (event.target.value == '5') {
      this.spouseNone = false;
      this.spouseKVSStation = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
        }
      });
    }
  }

  spouseValueConvt(val) {
    if (val == '1') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'Yes',
          spouseStatusCentral: 'No',
          spouseStatusState: 'No',
          spouseStatusNone: 'No'
        }
      })
    } else if (val == '2') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'No',
          spouseStatusCentral: 'Yes',
          spouseStatusState: 'No',
          spouseStatusNone: 'No'
        }
      })
    } else if (val == '3') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'No',
          spouseStatusCentral: 'No',
          spouseStatusState: 'Yes',
          spouseStatusNone: 'No'
        }
      })
    } else if (val == '5') {
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStatusKVS: 'No',
          spouseStatusCentral: 'No',
          spouseStatusState: 'No',
          spouseStatusNone: 'Yes'
        }
      })
    }
  }

  maritalStatusCheck(event) {

    if (event.target.value == '1') {
      this.responseData.maritalStatus = '1'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = true;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
        }
      })

    } else if (event.target.value == '4') {
      this.responseData.maritalStatus = '4'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
        }
      })



      if (this.teacherForm.value.profileForm.gender == '2') {
        this.responseData.spouseStatus = '4'
        this.teacherForm.patchValue({
          personalInfoForm: {
            spouseStationName: '',
            spousePost: '',
            spouseStationCode: '',
            spouseName: '',
            spouseEmpCode: '',
            spouseStatusF: '4'
          }
        })
      }

    }
  }

  getSpouseDetails(event) {

    this.teacherForm.patchValue({
      personalInfoForm: {
        spouseStationName: '',
        spousePost: '',
        spouseStationCode: '',
        spouseName: ''
      }
    })

    this.outSideService.fetchSpouseByEmpCode(event.target.value).subscribe((res) => {

      if (res.status == '0') {
        
      }
      this.teacherForm.patchValue({
        personalInfoForm: {
          spouseStationName: res.response?.stationName,
          spousePost: res.response?.lastPromotionPositionType,
          spouseStationCode: res.response?.stationCode
        }
      })

      if (res.status == '1') {
        this.outSideService.fetchTeacherByTeacherId(res.response?.teacherId).subscribe((res) => {
          this.teacherForm.patchValue({
            personalInfoForm: {
              spouseName: res.response?.teacherName
            }
          })
        })
      }
    })
  }

  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationType = this.kvSchoolDetails.rowValue[i].school_type;
        this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
        this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code
        sessionStorage.setItem('shiftYn', this.kvSchoolDetails.rowValue[i].shift_yn)
        sessionStorage.setItem('stationCode', this.kvSchoolDetails.rowValue[i].station_code)

        this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
        this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";

        this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
        this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
        this.stationName = this.kvSchoolDetails.rowValue[i].station_name;
      }
      sessionStorage.removeItem('isZiet');
      if(this.stationType){
        sessionStorage.setItem('isZiet', (this.responseData?.teachingNonteaching == '1' && this.stationType == '2')?'1':'0')
      }
    })
  }

  teacherTypeSelect(event) {
    if(event.target.value != 22 && event.target.value != 23 && event.target.value != 24 && event.target.value != '22' && event.target.value != '23' && event.target.value != '24'){
      this.teacherForm.patchValue({
        profileForm:{
          staffType: '2'
        }
      });
    }else{
      this.teacherForm.patchValue({
        profileForm:{
          staffType: '1'
        }
      });
    }
    this.subjectListNameCode = [];
    this.responseData.workExperienceAppointedForSubject = '';
    this.teacherForm.patchValue({
      profileForm:{
        presentSubjectName:''
      }
    });
    var data = {
      "applicationId": this.applicationId,
      "teacherTypeId": event.target.value
    }
    this.getSubjectByTchType(data);
  }

  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_code + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }


  getAllMaster() {

    this.outSideService.fetchAllMaster(6).subscribe((res) => {

      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {

        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].orgTeacherTypeCode + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
      }
    })
  }

  getQualMasterByTchType() {
    this.outSideService.fetchQualByType("A").subscribe((res) => {
      this.acadQualMasterList = res.response;
      this.outSideService.fetchQualByType("P").subscribe((res) => {
        this.profQualMasterList = res.response;
      })
    })
  }

  getSubjectByQual(event, val, index) {
    this.outSideService.fetchSubByQual(event.target.value).subscribe((res) => {

      if (val == 'A') {
        this.subjectListQual[index] = res.response.rowValue;
      } else if (val == 'P') {
        this.subjectListQualP[index] = res.response.rowValue;
      }

    })
  }

  getSubjectByQualAll(event, val, index) {
    this.outSideService.fetchSubByQual(event).subscribe((res) => {
      if (val == 'A') {
        this.subjectListQual[index] = res.response.rowValue;
        this.addAcadProfQual(this.acdQualList[index])
      } else if (val == 'P') {
        this.subjectListQualP[index] = res.response.rowValue;
        this.addProfQual(this.profQualList[index]);
      }
    })
  }

  public saveCode(e, i): void {
    this.find = this.codeList.find(x => x?.awardName === e.target.value);
    this.setAwardId(i, this.find.awardId)
  }

  setAwardId(index, awardId) {
    ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardId').patchValue(awardId);
  }

  getAwardsList() {
    this.outSideService.fetchAwardsList("a").subscribe((res) => {
      this.codeList = res.response;
    })
  }

  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      this.stateMasterList = res.response.rowValue;

    })
  }

  getDistrictListByStateId(event, data) {

    this.addType = data;
    if (data == 'C') {
      this.districListByStateIdC = [];
      this.teacherForm.patchValue({
        personalInfoForm: {
          crspndncPinCode: '',
          sameAbove: false
        }
      });
      this.enableDisableAddress('enable');
    } else if (data == 'P') {
      this.districListByStateIdP = [];
      this.teacherForm.patchValue({
        personalInfoForm: {
          prmntPinCode: ''
        }
      })
    }
    this.getDistrictByStateId(event.target.value, data);
  }

  getDistrictByStateId(stateId, data) {

    this.outSideService.fetchDistrictByStateId(stateId).subscribe((res) => {
      if (data == 'C') {
        this.districListByStateIdC = res.response.rowValue

      } else if (data == 'P') {
        this.districListByStateIdP = res.response.rowValue

      }

    })
  }

  onNewEntry() {
    sessionStorage.removeItem('singleTeacherList')
    this.allowEdit = false;
    this.newTeacherEntry = true;
    this.teacherForm.reset();
  }

  getTeacherById(id) {

    this.outSideService.fetchTeacherById(id).subscribe((res) => {

      this.responseData = res.response;
      this.lastPromotionId = this.responseData?.lastPromotionId;
      this.workExpId = this.responseData?.workExperienceIdPresentKv;
      this.getSchoolDetailsByKvCode();
      sessionStorage.setItem('finalStatus', this.responseData.verifyFlag)
      this.formStatusLocale = this.responseData.verifyFlag
      this.genderValueConvtFinal(this.responseData?.teacherGender)
      this.staffTypeConvtFinal(this.responseData?.teachingNonteaching)
      this.spouseValueConvt(this.responseData?.spouseStatus)

      sessionStorage.setItem('systemTeacherCode', this.responseData.teacherSystemGeneratedCode)
      this.tempTeacherId = this.responseData.teacherId;

      this.getFlagStatus(this.tempTeacherId)

      if (this.responseData?.teacherDisabilityYn == "1") {
        this.isVisible = true;
        if (this.responseData?.teacherDisabilityFromBirthYn == "0") {
          this.isVisibleBirth = true;
        }
      }

      if (this.responseData?.maritalStatus == '1') {
        this.marriedStatusYN = true;
      } else if (this.responseData?.maritalStatus == '4') {
        this.marriedStatusYN = false;
      }

      if (this.responseData?.spouseStatus == '1') {
        this.spouseNone = true;
        this.spouseKVSStation = true;
      } else if (this.responseData?.spouseStatus == '2' || this.responseData?.spouseStatus == '3') {
        this.spouseNone = true;
        this.spouseKVSStation = false;
      } else if (this.responseData?.spouseStatus == '5') {
        this.spouseNone = false;
        this.spouseKVSStation = false;
      }

      var data = {
        "applicationId": environment.applicationId,
        "teacherTypeId": this.responseData.lastPromotionPositionType
      }
      this.getSubjectByTchType(data);
      this.getDistrictByStateId(this.responseData.teacherCorrespondenceState, "C")
      this.getDistrictByStateId(this.responseData.teacherParmanentState, "P")

      this.tempTeacherId = this.responseData.teacherId;
      this.getStateMaster();
      this.getTrainingByTchId();
      this.getAwardsList();
      this.getAwardsByTchId();
      this.getAcdQualList();
      this.getProfQualList();
      this.getTchExpByTchId();
      this.getPromotionByTchId();
      this.getQualMasterByTchType();
    })
  }

  teacherTypeSelectExp(event, index) {
    var data = {
      "applicationId": this.applicationId,
      "teacherTypeId": event.target.value
    }
    this.getSubjectByTchTypeExp(data, index);
  }

  getSubjectByTchTypeExp(data, index) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      this.subjectListNameCode1 = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_code + ")";
        data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        };
        this.subjectListNameCode1.push(data);

      }
      this.subjectListNameCode2[index] = this.subjectListNameCode1;

    })
  }

  staffTypeConvt(event) {
    this.staffTypeConvtFinal(event.target.value)
  }

  staffTypeConvtFinal(val) {
    if (val == '1') {
      this.teacherForm.patchValue({
        profileForm: ({
          staffTypeP: 'Teaching'
        })
      })
    } else if (val == '2') {
      this.teacherForm.patchValue({
        profileForm: ({
          staffTypeP: 'Non-Teaching'
        })
      })
    }

  }

  verifyModal() {
    this.correctionProfile = new FormGroup({
      'id': new FormControl(),
      'teacherId': new FormControl(),
      'teacherEmployeeCode': new FormControl({ value: '', disabled: true }),
      'teacherEmployeeCodeNew': new FormControl('', Validators.required),
      'teacherName': new FormControl(),
      'teacherNameNew': new FormControl('', Validators.required),
      'teacherGender': new FormControl(),
      'teacherGenderNew': new FormControl('', Validators.required),
      'teacherDob': new FormControl(),
      'teacherDobNew': new FormControl('', Validators.required),
      'teacherSocialCategory': new FormControl(),
      'teacherSocialCategoryNew': new FormControl('', Validators.required),
      'teacherReligion': new FormControl(),
      'teacherReligionNew': new FormControl('', Validators.required),
      'teacherNationality': new FormControl(),
      'teacherNationalityNew': new FormControl('', Validators.required),
      'teacherMobile': new FormControl(),
      'teacherMobileNew': new FormControl('', Validators.required),
      'teacherEmail': new FormControl(),
      'teacherEmailNew': new FormControl('', Validators.required),
      'workExperiencePositionTypePresentStationStartDate': new FormControl(),
      'workExperiencePositionTypePresentStationStartDateNew': new FormControl('', Validators.required),
      'workExperienceWorkStartDatePresentKv': new FormControl(),
      'workExperienceWorkStartDatePresentKvNew': new FormControl('', Validators.required),
      'lastPromotionPositionType': new FormControl(),
      'lastPromotionPositionTypeNew': new FormControl('', Validators.required),
      'lastPromotionPositionDate': new FormControl(),
      'lastPromotionPositionDateNew': new FormControl('', Validators.required),
      'workExperienceAppointedForSubject': new FormControl(),
      'workExperienceAppointedForSubjectNew': new FormControl('', Validators.required),
      'remarks': new FormControl('', Validators.required),
      'queryInitiateDate': new FormControl('', Validators.required)
    })

    this.correctionProfile.patchValue({
      teacherId: this.responseData.teacherId,
      teacherEmployeeCode: this.responseData.teacherEmployeeCode,
      teacherName: this.responseData.teacherName,
      teacherGender: this.responseData.teacherGender,
      teacherDob: this.responseData.teacherDob,
      teacherSocialCategory: this.responseData.teacherSocialCategory,
      teacherReligion: this.responseData.teacherReligion,
      teacherNationality: this.responseData.teacherNationality,
      teacherMobile: this.responseData.teacherMobile,
      teacherEmail: this.responseData.teacherEmail,
      workExperiencePositionTypePresentStationStartDate: this.responseData.workExperiencePositionTypePresentStationStartDate,
      workExperienceWorkStartDatePresentKv: this.responseData.workExperienceWorkStartDatePresentKv,
      lastPromotionPositionType: this.responseData.lastPromotionPositionType,
      lastPromotionPositionDate: this.responseData.lastPromotionPositionDate,
      workExperienceAppointedForSubject: this.responseData.workExperienceAppointedForSubject,
    })
    this.modalService.open(this.verifyProfile, { size: 'full', backdrop: 'static', keyboard: false })
  }

  correctionForm(data, val) {

    if (data == 'sh') {
      if (val == '1') {
        this.sh = true;
      } else if (val == '0') {
        this.sh = false;
      }
    } else if (data == 'sh1') {
      if (val == '1') {
        this.sh1 = true;
      } else if (val == '0') {
        this.sh1 = false;
      }
    } else if (data == 'sh2') {
      if (val == '1') {
        this.sh2 = true;
      } else if (val == '0') {
        this.sh2 = false;
      }
    } else if (data == 'sh3') {
      if (val == '1') {
        this.sh3 = true;
      } else if (val == '0') {
        this.sh3 = false;
      }
    } else if (data == 'sh4') {
      if (val == '1') {
        this.sh4 = true;
      } else if (val == '0') {
        this.sh4 = false;
      }
    } else if (data == 'sh5') {
      if (val == '1') {
        this.sh5 = true;
      } else if (val == '0') {
        this.sh5 = false;
      }
    } else if (data == 'sh6') {
      if (val == '1') {
        this.sh6 = true;
      } else if (val == '0') {
        this.sh6 = false;
      }
    } else if (data == 'sh7') {
      if (val == '1') {
        this.sh7 = true;
      } else if (val == '0') {
        this.sh7 = false;
      }
    } else if (data == 'sh8') {
      if (val == '1') {
        this.sh8 = true;
      } else if (val == '0') {
        this.sh8 = false;
      }
    } else if (data == 'sh21') {
      if (val == '1') {
        this.sh21 = true;
      } else if (val == '0') {
        this.sh21 = false;
      }
    } else if (data == 'sh22') {
      if (val == '1') {
        this.sh22 = true;
      } else if (val == '0') {
        this.sh22 = false;
      }
    } else if (data == 'sh23') {
      if (val == '1') {
        this.sh23 = true;
      } else if (val == '0') {
        this.sh23 = false;
      }
    } else if (data == 'sh24') {
      if (val == '1') {
        this.sh24 = true;
      } else if (val == '0') {
        this.sh24 = false;
      }
    } else if (data == 'sh25') {
      if (val == '1') {
        this.sh25 = true;
      } else if (val == '0') {
        this.sh25 = false;
      }
    } else if (data == 'sh26') {
      if (val == '1') {
        this.sh26 = true;
      } else if (val == '0') {
        this.sh26 = false;
      }
    } else if (data == 'sh27') {
      if (val == '1') {
        this.sh27 = true;
      } else if (val == '0') {
        this.sh27 = false;
      }
    }

  }

  dateDifferenceFnc(control: FormControl): { [s: string]: boolean } {

    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today) == false) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  getKvRegion() {
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response;

    })
  }

  getStationByRegionId(event) {
    this.selectedUdiseCode = '';
    this.outSideService.fetchStationByRegionId(event.target.value).subscribe((res) => {
      this.stationList = res.response;

    })
  }

  getKvSchoolByStationId(event) {
    this.selectedUdiseCode = '';
    this.outSideService.fetchKvSchoolByStationCode(event.target.value).subscribe((res) => {
      this.kvSchoolList = res.response;

    })
  }

  selectSchoolByUdise() {


    for (let i = 0; i < this.kvSchoolList.length; i++) {

      if (this.kvSchoolList[i].udiseSchCode == this.selectedUdiseCode) {
        this.shiftYN = this.kvSchoolList[i].shiftYn
        this.setTeacherPostingData(this.kvSchoolList[i].kvName, this.kvSchoolList[i].udiseSchCode)
      }
    }
  }

  setTeacherPostingData(name, udiseCode) {
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchoolName').patchValue(name);
    ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('udiseSchCode').patchValue(udiseCode);

    if (this.shiftYN == '0' || this.shiftYN == 0) {
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftYn').patchValue('0');
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftType').disable();
    } else if (this.shiftYN == '1' || this.shiftYN == 1) {
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftYn').patchValue('1');
      ((this.teacherForm.get('detailsOfPosting') as FormArray).at(this.indexNew) as FormGroup).get('shiftType').enable();
    }
  }

  selectSchool(val) {
    this.selectedUdiseCode = '';
    this.indexNew = val;
    this.modalService.open(this.selectSchoolModal, { size: 'xl', backdrop: 'static', keyboard: false })
  }

  profileDeclaration(e, id) {

    if (e.target.checked) {
      if (id == '1') {
        this.declaration1 = true;
        if (this.declaration1 == true && this.declaration2 == true) {
          this.confirmEnable = true;
        }
      } else if (id == '2') {
        this.declaration2 = true;
        if (this.declaration1 == true && this.declaration2 == true) {
          this.confirmEnable = true;
        }
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        this.declaration1 = false;
        this.confirmEnable = false;
      } else if (id == '2') {
        this.declaration2 = false;
        this.confirmEnable = false;
      }
    }
  }

  schoolRemarks() {
    this.modalService.open(this.schoolRemarksModal, { size: 'small', backdrop: 'static', keyboard: false })
  }

  experienceDataManagement(event, index) {
    for (let i = 0; i < this.teacherForm.value.detailsOfPosting.length - 1; i++) {
      var dateFrom = this.teacherForm.value.detailsOfPosting[i].workStartDate;
      var dateTo = this.teacherForm.value.detailsOfPosting[i].workEndDate;
      var dateCheck = event.target.value;
      var returnType
      if (dateTo == null || dateTo == 'null') {
        returnType = this.dateGreater(dateFrom, dateCheck);
      } else {
        returnType = this.dateCheck(dateFrom, dateTo, dateCheck);
      }
      if (returnType == 0) {
        Swal.fire(
          'Date lies between previous experience !',
          '',
          'error'
        );
        (<HTMLInputElement>document.getElementById("wordStartDate-" + index)).value = "";
        (<HTMLInputElement>document.getElementById("wordEndDate-" + index)).value = "";
        this.teacherForm.value.detailsOfPosting[index].workStartDate = "";
        this.teacherForm.value.detailsOfPosting[index].workEndDate = "";
      }
    }
    return false;
  }

  dateCheck(dateFrom, dateTo, dateCheck) {
    var from = new Date(dateFrom).getTime();
    var to = new Date(dateTo).getTime();
    var check = new Date(dateCheck).getTime();
    if (check > from && check < to) {
      return 0
    } else {
      return 1;
    }
  }

  dateGreater(dateFrom, dateCheck) {
    var from = new Date(dateFrom).getTime();
    var check = new Date(dateCheck).getTime();
    if (check > from) {
      return 0
    } else {
      return 1;
    }
  }

  profileDateManagement(event, val) {

    var date1 = event.target.value
    var date2 = this.teacherForm.value.profileForm.dob;
    var Time = new Date(date1).getTime() - new Date(date2).getTime();
    var Days = Time / (1000 * 3600 * 24); //Diference in Days

    if (val == 'a') {
      var dateA = event.target.value
      var dateB = this.teacherForm.value.profileForm.presentStationPostDate
      var dateC = this.teacherForm.value.profileForm.presentPostDate
      var returnType
      if (dateB == undefined || dateB == '' || dateB == null && dateC == undefined || dateC == '' || dateC == null) {
        return true;
      } else if (dateB == undefined && dateC != undefined && dateB == '' && dateB == null && dateB == 'null') {
        returnType = this.check2ProfileDate(dateA, dateC);
      } else if (dateB != undefined && dateC == undefined && dateC == '' && dateC == null && dateC == 'null') {
        returnType = this.check2ProfileDate(dateA, dateB);
      } else if (dateB != undefined && dateC != undefined) {
        returnType = this.check3ProfileDate(dateC, dateB, dateA);
      }
    } else if (val == 'b') {
      var dateB = event.target.value
      var dateA = this.teacherForm.value.profileForm.presentKvDate
      var dateC = this.teacherForm.value.profileForm.presentPostDate
      var returnType
      if (dateA == undefined || dateA == '' || dateA == null && dateC == undefined || dateC == '' || dateC == null) {
        return true;
      } else if (dateA == undefined && dateC != undefined && dateA == '' && dateA == null && dateA == 'null') {
        returnType = this.check2ProfileDate(dateB, dateC);
      } else if (dateA != undefined && dateC == undefined && dateC == '' && dateC == null && dateC == 'null') {
        returnType = this.check2ProfileDate(dateA, dateB);
      } else if (dateA != undefined && dateC != undefined) {
        returnType = this.check3ProfileDate(dateC, dateB, dateA);
      }
    } else if (val == 'c') {
      if (Days * 1 >= 6570) {
        var dateC = event.target.value
        var dateA = this.teacherForm.value.profileForm.presentKvDate
        var dateB = this.teacherForm.value.profileForm.presentStationPostDate
        var returnType
        if (dateA == undefined || dateA == '' || dateA == null && dateB == undefined || dateB == '' || dateB == null) {
          return true;
        } else if (dateB == undefined && dateA != undefined && dateB == '' && dateB == null && dateB == 'null') {
          returnType = this.check2ProfileDate(dateA, dateC);
        } else if (dateB != undefined && dateA == undefined && dateA == '' && dateA == null && dateA == 'null') {
          returnType = this.check2ProfileDate(dateB, dateC);
        } else if (dateB != undefined && dateA != undefined) {
          returnType = this.check3ProfileDate(dateC, dateB, dateA);
        }
      } else {
        this.teacherForm.patchValue({
          profileForm: {
            presentPostDate: ''
          }
        })
        Swal.fire(
          'Please check DoB and posting year selected !',
          '',
          'error'
        )
      }
    }

    if (returnType == 0) {
      Swal.fire(
        'Dates provide in "Present KV in Present Post Date","Present Station in Present Post Date","Date of Joining in KVS in Present Post" are contradicting !',
        'Kindly enter the dates in correct sequence',
        'error'
      );
      if (val == 'a') {
        this.teacherForm.patchValue({
          profileForm: {
            presentKvDate: '',
            presentStationPostDate: '',
            presentPostDate: ''
          }
        })
      } else if (val == 'b') {
        this.teacherForm.patchValue({
          profileForm: {
            presentKvDate: '',
            presentStationPostDate: '',
            presentPostDate: ''
          }
        })
      } else if (val == 'c') {
        this.teacherForm.patchValue({
          profileForm: {
            presentKvDate: '',
            presentStationPostDate: '',
            presentPostDate: ''
          }
        })
      }
    }
  }

  check3ProfileDate(a, b, c) {

    var checkA = new Date(a).getTime();
    var checkB = new Date(b).getTime();
    var checkC = new Date(c).getTime();
    if (checkC >= checkB && checkC >= checkA && checkB >= checkA) {
      return 1;
    } else {
      return 0;
    }
  }

  check2ProfileDate(a, b) {

    var checkA = new Date(a).getTime();
    var checkB = new Date(b).getTime();
    if (checkA >= checkB) {
      return 1;
    } else {
      return 0;
    }
  }

  checkYearLength(event, index, type) {

    var dobYear = new Date(this.teacherForm.value.profileForm.dob).getFullYear()

    if (event.target.value.length < 4 || event.target.value.length > 4) {
      this.year = "Select a valid year";
      if (type == 'Prof') {
        ((this.teacherForm.get('profQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'Acd') {
        ((this.teacherForm.get('acadProfQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'award') {
        ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardYear').patchValue('');
      } else if (type == 'training') {
        ((this.teacherForm.get('trainingReceived') as FormArray).at(index) as FormGroup).get('trainingYear').patchValue('');
      }


    } else if (event.target.value > (new Date()).getFullYear()) {
      Swal.fire(
        'Entered year is after present year!',
        '',
        'error'
      )
      this.year = "Select a valid year";
      if (type == 'Prof') {
        ((this.teacherForm.get('profQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'Acd') {
        ((this.teacherForm.get('acadProfQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'award') {
        ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardYear').patchValue('');
      } else if (type == 'training') {
        ((this.teacherForm.get('trainingReceived') as FormArray).at(index) as FormGroup).get('trainingYear').patchValue('');
      }
    } else if (event.target.value < dobYear) {
      Swal.fire(
        'Entered year is before year of birth !',
        '',
        'error'
      )
      this.year = "Select a valid year";
      if (type == 'Prof') {
        ((this.teacherForm.get('profQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'Acd') {
        ((this.teacherForm.get('acadProfQual') as FormArray).at(index) as FormGroup).get('yearOfPassing').patchValue('');
      } else if (type == 'award') {
        ((this.teacherForm.get('awardReceived') as FormArray).at(index) as FormGroup).get('awardYear').patchValue('');
      } else if (type == 'training') {
        ((this.teacherForm.get('trainingReceived') as FormArray).at(index) as FormGroup).get('trainingYear').patchValue('');
      }
    }


  }

  selectSpouseStation() {
    this.modalService.open(this.selectSpouseStationModal, { size: 'small', backdrop: 'static', keyboard: false })
  }

  selectSpouseStationFn() {
    var str = this.selectedSpouseStation
    var splitted = str.split("-", 2);
    this.teacherForm.patchValue({
      personalInfoForm: {
        spouseStationName: splitted[1],
        spouseStationCode: splitted[0]
      }
    })

  }


  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {

    var data = files.item(0).name
    var splitted = data.split('.', 2)

    if (splitted[1] == 'pdf' || splitted[1] == 'PDF' || splitted[1] == 'Pdf') {
      if (files.item(0).size <= 204800) {
        this.fileToUpload = files.item(0);
        if (index == '0') {
          this.enableUploadButton0 = false;
        } else if (index == '1') {
          this.enableUploadButton1 = false;
        } else if (index == '2') {
          this.enableUploadButton2 = false;
        } else if (index == '3') {
          this.enableUploadButton3 = false;
        } else if (index == '4') {
          this.enableUploadButton4 = true;
        }
      } else {
        this.fileToUpload = null;
        Swal.fire(
          'File size allowed upto 200KB only !',
          '',
          'error'
        )
        if (index == '0') {
          this.enableUploadButton0 = true;
        } else if (index == '1') {
          this.enableUploadButton1 = true;
        } else if (index == '2') {
          this.enableUploadButton2 = true;
        } else if (index == '3') {
          this.enableUploadButton3 = true;
        } else if (index == '4') {
          this.enableUploadButton4 = true;
        }
      }

    } else {
      this.fileToUpload = null;
      Swal.fire(
        'Only PDF file can be uploaded',
        '',
        'error'
      )
      if (index == '0') {
        this.enableUploadButton0 = true;
      } else if (index == '1') {
        this.enableUploadButton1 = true;
      } else if (index == '2') {
        this.enableUploadButton2 = true;
      } else if (index == '3') {
        this.enableUploadButton3 = true;
      } else if (index == '4') {
        this.enableUploadButton4 = true;
      }
    }
  }



  documentUpload(index) {

    const formData = new FormData();

    if (this.fileToUpload != null) {
      formData.append('teacherId', this.responseData.teacherId);
      formData.append('file', this.fileToUpload);
      if (index == 0) {
        formData.append('filename', "Medical_Certificate");
      } else if (index == 1) {
        formData.append('filename', "Board_examination_Proof");
      } else if (index == 2) {
        formData.append('filename', "Disability_Certificate");
      } else if (index == 3) {
        formData.append('filename', "Differentially_Abled_Certificate");
      } else if (index == 4) {
        formData.append('filename', "Physically_Handicap_Certificate");
      }


      this.outSideService.uploadDocument(formData).subscribe((res) => {

        Swal.fire(
          'Document Upload Sucessfully',
          '',
          'success'
        )
        this.documentUploadArray[index] = { "docName": res.response.docName, "url": res.response.url };

        if (index == 0) {
          this.deleteDocUpdate0 = false
        } else if (index == 1) {
          this.deleteDocUpdate1 = false
        } else if (index == 2) {
          this.deleteDocUpdate2 = false
        } else if (index == 3) {
          this.deleteDocUpdate3 = false
        } else if (index == 4) {
          this.deleteDocUpdate4 = false
        }
        this.getDocumentByTeacherId()
      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
  }

  deleteDocumentUploaded(documentName) {
    for (let i = 0; i < this.documentUploadArray.length; i++) {
      if (this.documentUploadArray[i].docName == documentName) {
        this.documentUploadArray[i] = {}
      }
    }
    var data = {
      "teacherId": this.responseData.teacherId,
      "docName": documentName
    }

    this.outSideService.deleteUploadedDoc(data).subscribe((res) => {
      Swal.fire(
        'Deleted !',
        '',
        'success'
      )
    })
  }

  getDocumentByTeacherId() {
    this.outSideService.fetchUploadedDoc(JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name).subscribe((res) => {

      this.documentUploadArray = res;

      for (let i = 0; i < res.length; i++) {

        if (res[i].docName == 'Medical_Certificate.pdf') {
          this.deleteDocUpdate0 = false;
        }
        if (res[i].docName == 'Board_examination_Proof.pdf') {
          this.deleteDocUpdate1 = false;
        }
        if (res[i].docName == 'Disability_Certificate.pdf') {
          this.deleteDocUpdate2 = false;
        }
        if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
          this.deleteDocUpdate3 = false;
        }
      }
    })
  }

  checkMobileNumber(event) {
    this.outSideService.fetchTchDuplicateMobile(event.target.value).subscribe((res) => {
      if (res.response.status == 1) {
      }
      else if (res.response.status == 0) {
        Swal.fire(
          'Mobile number already exist',
          '',
          'error'
        )
        this.teacherForm.patchValue({
          profileForm: {
            mobile: ''
          }
        })
      }
    })
  }

  onVerifyClick() {

    this.outSideService.getUpdatedFlag(this.tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    }, error => {

    })
    this.outSideService.fetchConfirmedTchDetails(this.responseData.teacherId).subscribe((res) => {
      this.verifyTchTeacherProfileData = res.response.teacherProfile
      this.verifyTchTeacherAcdQualification = res.response.educationalQualification
      this.verifyTchTeacherProfQualification = res.response.profestinalQualification
      this.verifyTchTeacherAward = res.response.awards
      this.verifyTchTeacherTraining = res.response.training
      for (let i = 0; i < res.response.experience.length; i++) {
        if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
          res.response.experience[i].workEndDate = this.date.transform(new Date(res.response.experience[i].workEndDate * 1), 'yyyy-MM-dd')
        }
        res.response.experience[i].workStartDate = this.date.transform(new Date(res.response.experience[i].workStartDate * 1), 'yyyy-MM-dd')
      }
      this.verifyTchTeacherWorkExp = res.response.experience
    })
  }

  setUdiseCode(event) {

    this.selectedUdiseCode = event.target.value;
  }

  teacherPdf() {
    this.onVerifyClick();
    setTimeout(() => {
      this.pdfServive.testFnc(this.verifyTchTeacherProfileData, this.kvNameCode, this.stationNameCode, this.verifyTchTeacherAcdQualification,
        this.verifyTchTeacherProfQualification, this.verifyTchTeacherAward, this.verifyTchTeacherTraining, this.verifyTchTeacherWorkExp);
    }, 1000);

  }

  cDistrictChange(value) {
    this.teacherForm.patchValue({
      personalInfoForm: {
        crspndncPinCode: '',
        sameAbove: false
      }
    })
    this.responseData.teacherCorrespondenceDistrict = value;
    this.enableDisableAddress('enable');
  }
  pDistrictChange(value) {

    this.responseData.teacherPermanentDistrict = value;
  }

  sameAsAbove(event) {

    this.districListByStateIdP = [];
    this.getDistrictByStateId(this.teacherForm.value.personalInfoForm.crspndncState, 'P');
    if (event.target.checked) {
      this.enableDisableAddress('disable')
      this.teacherForm.patchValue({
        personalInfoForm: {
          prmntAddress: this.teacherForm.value.personalInfoForm.crspndncAddress,
          prmntState: this.teacherForm.value.personalInfoForm.crspndncState,
          prmntDistrict: this.teacherForm.value.personalInfoForm.crspndncDistrict,
          prmntPinCode: this.teacherForm.value.personalInfoForm.crspndncPinCode
        }
      });

    } else if (!event.target.checked) {
      this.teacherForm.patchValue({
        personalInfoForm: {
          prmntAddress: '',
          prmntState: '',
          prmntDistrict: '',
          prmntPinCode: ''
        }
      });
      this.enableDisableAddress('enable')
    }
  }

  addOrPinChange(val) {
    this.teacherForm.patchValue({
      personalInfoForm: {
        sameAbove: false
      }
    });
    this.enableDisableAddress('enable')
  }

  enableDisableAddress(val) {
    if (val == 'disable') {
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntAddress').disable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntState').disable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntDistrict').disable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntPinCode').disable();
    } else if (val == 'enable') {
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntAddress').enable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntState').enable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntDistrict').enable();
      (this.teacherForm.get('personalInfoForm') as FormGroup).get('prmntPinCode').enable();
    }
  }

}
