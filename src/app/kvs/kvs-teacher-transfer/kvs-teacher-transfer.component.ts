import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';
import { TeacherTransferPdfService } from 'src/app/makePDF/teacher-transfer-pdf.service';
import { DataService } from 'src/app/service/data.service'
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare const loadScroller: any;
declare const nextClickCalled: any;
declare const nextTempClick: any;
declare const onNextClick: any;
declare const onPreviousClick: any;

@Component({
  selector: 'app-kvs-teacher-transfer',
  templateUrl: './kvs-teacher-transfer.component.html',
  styleUrls: ['./kvs-teacher-transfer.component.css']
})
export class KvsTeacherTransferComponent implements OnInit {

  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSchoolModalInterStation', { static: true }) selectSchoolModalInterStation: TemplateRef<any>;

  transferForm: FormGroup;

  showMe: boolean = true
  responseDataTransfer: any = {}
  sh: any;
  gkFile: any;
  gkFile11: any;
  gkFile12: any;
  gkFilebenefit: boolean = false;
  gkFilemMedical: boolean = false;
  spGround: boolean = false;
  dfpGround: boolean = false;
  boardExam: boolean = false;
  careGiver: boolean = false;
  abledChild: boolean = false;
  isChecked: boolean = true;
  panelOpenState = false;
  step = 0;
  tempTeacherId: any;
  isCheckedNew: any;
  proceed: boolean;
  teacherTypeData: any;
  teacherTypeDataNameCode: any;
  stationList: any;
  tempFalse: boolean = false;


  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  kvCode: any;
  existingTransferId: any;

  subjectList: any;
  subjectListNameCode: any;

  stateMasterList: any;
  noAward: boolean = false;
  regionalAward: boolean = false;
  nationalAward: boolean = false;
  presidentAward: boolean = false;

  responseData: any;
  appG1: any;
  appG2: any;

  showStationChoice18B: boolean = false;
  showStationChoice18C: boolean = false;
  showStationChoice18: boolean = false;
  show18BOption: boolean = false;
  show18COption: boolean = false;
  profileData: any;
  districListByStateIdP: any;
  teacherExperienceData: any;

  kvSchoolList: any;
  kvSchoolListP1: any;
  kvSchoolListP2: any;
  kvSchoolListP3: any;
  kvSchoolListP4: any;
  kvSchoolListP5: any;
  showMe11: boolean = true;

  regionList: any;
  selectedUdiseCode: any;
  position: any;

  sameStationSchool1: any;
  sameStationSchool2: any;
  sameStationSchool3: any;
  sameStationSchool4: any;
  sameStationSchool5: any;

  absence1: number = 0;
  absence2: number = 0;
  totalWorkingDaysF: number = 0;
  totalWorkingDaysTC: number = 0;
  show18BOptionCheckBox = null;

  disableShiftType: boolean = false;
  preferenceStationList: any = [];
  preferenceSchoolList: any;
  reponseDataForPdf: any;

  absenceTc: number = 0;
  transfer5b: boolean = true;
  transfer7b: boolean = true;
  documentUploadArray: any[] = [];
  enableUploadButton0: boolean = false;
  enableUploadButton1: boolean = false;
  enableUploadButton2: boolean = false;
  enableUploadButton3: boolean = false;
  enableUploadButton5: boolean = false;
  enableUploadButton6: boolean = false;
  enableUploadButton7: boolean = false;
  enableUploadButton8: boolean = false;

  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate5: boolean = true;
  deleteDocUpdate6: boolean = true;
  deleteDocUpdate7: boolean = true;
  deleteDocUpdate8: boolean = true;
  fromStatus: any;

  employeeType: any = "Regular"
  transferApplicationNumberVal: any;
  enableTransferFormYn: boolean = true;
  enableTransferFormYnVal: any;
  transferStatusOperation: any;

  memJCM: boolean = false;
  formStatusLocale: any;

  formDataList: any;
  transferGroundList: any

  imageData: any;

  disableLTR: boolean = false;
  disableDFP: boolean = false;
  disableMDG: boolean = false;
  disableSP: boolean = false;
  disableWidow: boolean = false;

  isZiet:any;


  constructor(private date: DatePipe, private formData: FormDataService, private dataService: DataService, private outSideService: OutsideServicesService, private fb: FormBuilder, private modalService: NgbModal,
    private transferPdfService: TeacherTransferPdfService) {

    // this.onNextClick(2);
  }

  nextClick(index) {

    nextClickCalled(index);
  }

  onNextClick(index) {
    onNextClick(index);
  }

  onPreviousClick(index) {
    onPreviousClick(index);
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  appraisalAvg() {

    var appG1Value = 0;
    var appG2Value = 0;
    var total = 0;
    if (this.appG1 * 1 >= 0 && this.appG1 * 1 <= 3.9 || this.appG2 * 1 >= 0 && this.appG2 * 1 <= 3.9) {

      if (this.appG1 != null && this.appG1 * 1 >= 0 && this.appG1 * 1 <= 3.9) {
        appG1Value = 2;
      }
      if (this.appG2 != null && this.appG2 * 1 >= 0 && this.appG2 * 1 <= 3.9) {
        appG2Value = 2;
      }

      var total = (appG1Value * 1 + appG2Value * 1)

      if (total < 5) {
        this.transferForm.patchValue({
          displacementCount: {
            q2DPt: total
          }
        })
      }
    } else {
      this.transferForm.patchValue({
        displacementCount: {
          q2DPt: 0
        }
      })
    }
    this.appraisalAvgT();
  }

  appraisalAvgT() {
    var appG1ValueT = 0;
    var appG2ValueT = 0;
    var totalT = 0;
    if (this.appG1 * 1 >= 8 || this.appG2 * 1 >= 8) {

      if (this.appG1 != null && this.appG1 * 1 >= 8) {
        appG1ValueT = 2;
      }
      if (this.appG2 != null && this.appG2 * 1 >= 8) {
        appG2ValueT = 2;
      }
      var totalT = (appG1ValueT * 1 + appG2ValueT * 1)
      if (totalT < 5) {
        this.transferForm.patchValue({
          transferCount: {
            q2TPt: totalT
          }
        })
      }
    } else {
      this.transferForm.patchValue({
        transferCount: {
          q2TPt: 0
        }
      })
    }
  }

  pHEmployee(val) {
    if (val == '1') {
      this.transferForm.patchValue({
        displacementCount: {
          q9DPt: -60
        }
      })
    } else if (val == '0') {
      this.transferForm.patchValue({
        displacementCount: {
          q9DPt: 0
        }
      })
    }
  }

  associatedMember(val) {
    if (val == '1') {
      this.memJCM = true;
      this.transferForm.patchValue({
        displacementCount: {
          q10DPt: -25
        },
        declaration: {
          memberJCM: '1'
        },
        transferCount: {
          associationMemberYnT: '1'
        }
      })
    } else if (val == '2') {
      this.memJCM = true;
      this.transferForm.patchValue({
        displacementCount: {
          q10DPt: -25
        },
        declaration: {
          memberJCM: '1'
        },
        transferCount: {
          associationMemberYnT: '2'
        }
      })
    } else if (val == '0') {
      this.memJCM = false;
      this.transferForm.patchValue({
        displacementCount: {
          q10DPt: 0
        },
        declaration: {
          memberJCM: '0'
        },
        transferCount: {
          associationMemberYnT: '3'
        }
      })
    }
  }

  prevStep() {
    this.step--;
  }
  toogleTag() {
    this.showMe = !this.showMe
  }
  showMe1: boolean = true
  toogleTag1() {
    this.showMe1 = !this.showMe1
  }
  showMe2: boolean = true
  toogleTag2() {
    this.showMe2 = !this.showMe2
  }
  showMe3: boolean = true
  toogleTag3() {
    this.showMe3 = !this.showMe3
  }
  showMe4: boolean = true
  toogleTag4() {
    this.showMe4 = !this.showMe4
  }
  showMe5: boolean = true
  toogleTag5() {
    this.showMe5 = !this.showMe5
  }
  showMe6: boolean = true
  toogleTag6() {
    this.showMe6 = !this.showMe6
  }
  showMe7: boolean = true
  toogleTag7() {
    this.showMe7 = !this.showMe7
  }
  showMe8: boolean = true
  toogleTag8() {
    this.showMe8 = !this.showMe8
  }
  showMe9: boolean = true
  toogleTag9() {
    this.showMe9 = !this.showMe9
  }
  showMe10: boolean = true
  toogleTag10() {
    this.showMe10 = !this.showMe10
  }
  toogleTag11() {
    this.showMe11 = !this.showMe11
  }

  ngOnInit(): void {

    this.isZiet = sessionStorage.getItem('isZiet');

    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround;
    this.fromStatus = sessionStorage.getItem('finalStatus')
    this.disableShiftType = ((sessionStorage.getItem('shiftYn')) == '0') ? true : false;
    this.getAllMaster();
    this.getStateMaster();

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails.length; i++) {
      this.tempTeacherId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.ApplicationDetails[i].business_unit_type_code;
      this.getTransferBasicProfileByTchId()
      this.getSchoolDetailsByKvCode();
    }

    setTimeout(function () {
      onNextClick(1);
    }, 1000);

    this.transferForm = new FormGroup({
      basicDetails: new FormGroup({
        'teacherName': new FormControl,
        'teacherEmployeeCode': new FormControl,
        'teacherDob': new FormControl,
        'teacherParmanentState': new FormControl,
        'teacherGender': new FormControl,
        'teacherPermanentDistrict': new FormControl,
        'lastPromotionPositionType': new FormControl,
        'lastPromotionPositionDate': new FormControl,
        'workExperiencePositionTypePresentStationStartDate': new FormControl,
        'workExperienceWorkStartDatePresentKv': new FormControl,
        'presentStationName': new FormControl,
        'currentSchoolName': new FormControl,
        'workExperienceAppointedForSubject': new FormControl,
        'natureOfAppointment': new FormControl,
        'teacherId': new FormControl
      }),
      stationChoice: new FormGroup({
        'recruitedSpclDriveNer': new FormControl('', Validators.required),
        'shiftChangeSameSchool': new FormControl('', Validators.required),
        'choiceKv1UdiseCodePresentStation': new FormControl('', Validators.required),
        'choiceKv2UdiseCodePresentStation': new FormControl,
        'choiceKv3UdiseCodePresentStation': new FormControl,
        'choiceKv4UdiseCodePresentStation': new FormControl,
        'choiceKv5UdiseCodePresentStation': new FormControl,
        'choiceKv1StationCode': new FormControl('', Validators.required),
        'choiceKv2StationCode': new FormControl,
        'choiceKv3StationCode': new FormControl,
        'choiceKv4StationCode': new FormControl,
        'choiceKv5StationCode': new FormControl,
        'displacement1StationCode': new FormControl('', Validators.required),
        'displacement2StationCode': new FormControl,
        'displacement3StationCode': new FormControl,
        'displacement4StationCode': new FormControl,
        'displacement5StationCode': new FormControl,
        'transferApplicationNumber': new FormControl,
        'choiceKv1UdiseNamePresentStation': new FormControl('', Validators.required),
        'choiceKv2UdiseNamePresentStation': new FormControl,
        'choiceKv3UdiseNamePresentStation': new FormControl,
        'choiceKv4UdiseNamePresentStation': new FormControl,
        'choiceKv5UdiseNamePresentStation': new FormControl,
        'choiceKv1StationName': new FormControl('', Validators.required),
        'choiceKv2StationName': new FormControl,
        'choiceKv3StationName': new FormControl,
        'choiceKv4StationName': new FormControl,
        'choiceKv5StationName': new FormControl,
        'displacement1StationName': new FormControl('', Validators.required),
        'displacement2StationName': new FormControl,
        'displacement3StationName': new FormControl,
        'displacement4StationName': new FormControl,
        'displacement5StationName': new FormControl,

        'choiceKv1StationCodeUdiseCode1': new FormControl(),
        'choiceKv1StationCodeUdiseCode2': new FormControl(),
        'choiceKv1StationCodeUdiseCode3': new FormControl(),
        'choiceKv2StationCodeUdiseCode1': new FormControl(),
        'choiceKv2StationCodeUdiseCode2': new FormControl(),
        'choiceKv2StationCodeUdiseCode3': new FormControl(),
        'choiceKv3StationCodeUdiseCode1': new FormControl(),
        'choiceKv3StationCodeUdiseCode2': new FormControl(),
        'choiceKv3StationCodeUdiseCode3': new FormControl(),
        'choiceKv4StationCodeUdiseCode1': new FormControl(),
        'choiceKv4StationCodeUdiseCode2': new FormControl(),
        'choiceKv4StationCodeUdiseCode3': new FormControl(),
        'choiceKv5StationCodeUdiseCode1': new FormControl(),
        'choiceKv5StationCodeUdiseCode2': new FormControl(),
        'choiceKv5StationCodeUdiseCode3': new FormControl(),

        'choiceKv1StationCodeUdiseName1': new FormControl(),
        'choiceKv1StationCodeUdiseName2': new FormControl(),
        'choiceKv1StationCodeUdiseName3': new FormControl(),
        'choiceKv2StationCodeUdiseName1': new FormControl(),
        'choiceKv2StationCodeUdiseName2': new FormControl(),
        'choiceKv2StationCodeUdiseName3': new FormControl(),
        'choiceKv3StationCodeUdiseName1': new FormControl(),
        'choiceKv3StationCodeUdiseName2': new FormControl(),
        'choiceKv3StationCodeUdiseName3': new FormControl(),
        'choiceKv4StationCodeUdiseName1': new FormControl(),
        'choiceKv4StationCodeUdiseName2': new FormControl(),
        'choiceKv4StationCodeUdiseName3': new FormControl(),
        'choiceKv5StationCodeUdiseName1': new FormControl(),
        'choiceKv5StationCodeUdiseName2': new FormControl(),
        'choiceKv5StationCodeUdiseName3': new FormControl(),

        'stationWithin100km1': new FormControl(),
        'stationWithin100km2': new FormControl(),
        'stationWithin100km3': new FormControl(),
        'stationWithin100km4': new FormControl(),
        'stationWithin100km5': new FormControl(),
      }),
      displacementCount: new FormGroup({
        'numberOfWorkingDays': new FormControl(),//1
        'absenceDaysOne': new FormControl(''),//1
        'absenceDaysTwo': new FormControl('', [Validators.required]),//1
        'actualNumberOfWorkingDays': new FormControl(),//1
        'workExperiencePositionTypePresentStationStartDate': new FormControl(), //1
        'presentStationName': new FormControl(), //1
        'presentStationCode': new FormControl(), //1
        'q1DPt': new FormControl(),//1
        'apprGradeYr1': new FormControl(), //2
        'apprGrade1': new FormControl('', [Validators.required, Validators.max(10), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]), //2
        'apprGradeYr2': new FormControl(), //2
        'apprGrade2': new FormControl('', [Validators.required, Validators.max(10), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]), //2
        'q2DPt': new FormControl(),
        'teacherDob': new FormControl,//3
        'hardStationCode': new FormControl(), //3
        'hardStationName': new FormControl(), //3
        'hardStationWorkStartDate': new FormControl(), //3
        'hardStationWorkEndDate': new FormControl(), //3
        'q3DYn': new FormControl(),//3
        'q3DPt': new FormControl(),//3
        'personalStatus': new FormControl('', [Validators.required]), //4
        'personalStatusLtrDc': new FormControl(), //4
        'personalStatusDfpDc': new FormControl(), //4
        'personalStatusMdgDc': new FormControl(), //4
        'personalStatusWidDc': new FormControl(), //4
        'personalStatusSpDc': new FormControl(), //4
        'personalStatusDefaultDc': new FormControl(),
        'q4DPt': new FormControl(),
        'spouseStatus': new FormControl(),//5
        'spouseKvsYn': new FormControl(),//5
        'spouseStateGvotYn': new FormControl(),//5
        'spouseCentralGvotYn': new FormControl(),//5
        'unmarriedWomanYn': new FormControl(),//5
        'spouseNa': new FormControl(),//5
        'q5DPt': new FormControl(),//5
        'teacherDisabilityYn': new FormControl(), //6
        'q9DPt': new FormControl(),//6
        'associationMemberYn': new FormControl('', [Validators.required]), //7
        'q10DPt': new FormControl(),//7   
        'presidentAward': new FormControl(), //8
        'nationalAward': new FormControl(), //8
        'regionalAward': new FormControl(), //8
        'q11DPt': new FormControl(),//8
        'child_10_12_yn': new FormControl('', [Validators.required]), //9
        'q12DPt': new FormControl(),//9
        'careGiverYn': new FormControl('', [Validators.required]), //10
        'q13DPt': new FormControl(), //10
        'totalDisplacementCount': new FormControl(),
        'stationWithin100kmDispYn': new FormControl('', Validators.required),
        'spouseStatusDisplacement': new FormControl()
      }),
      transferCount: new FormGroup({
        'applyTransferYn': new FormControl('', Validators.required),
        'numberOfWorkingDays': new FormControl(),//1
        'absenceDaysTcone': new FormControl('', [Validators.required, Validators.min(0), RxwebValidators.numeric({ allowDecimal: false, isFormat: false })]),
        'absenceDaysOne': new FormControl(),//1
        'absenceDaysTwo': new FormControl(),//1
        'actualNumberOfWorkingTcdays': new FormControl(),//1
        'workExperiencePositionTypePresentStationStartDate': new FormControl(), //1
        'presentStationName': new FormControl(), //1
        'presentStationCode': new FormControl(), //1
        'q1TPt': new FormControl(),//1
        'apprGradeYr1': new FormControl(), //2
        'apprGrade1': new FormControl(), //2
        'apprGradeYr2': new FormControl(), //2
        'apprGrade2': new FormControl(), //2
        'q2TPt': new FormControl(),//2
        'presidentAward': new FormControl(), //3
        'nationalAward': new FormControl(), //3
        'regionalAward': new FormControl(), //3
        'q3TPt': new FormControl(),//3
        'tSpouseStatus': new FormControl(),
        'spouseKvsYn': new FormControl(),//5
        'spouseStateGvotYn': new FormControl(),//4
        'spouseCentralGvotYn': new FormControl(),//4
        'unmarriedWomanYn': new FormControl(),//4
        'spouseNa': new FormControl(),
        'q4TPt': new FormControl(),//4
        'personalStatusLtr': new FormControl(), //6
        'personalStatusDfp': new FormControl(), //6
        'personalStatusMdg': new FormControl(), //6
        'personalStatusWid': new FormControl(), //6
        'personalStatusSp': new FormControl(), //6
        'personalStatusDefault': new FormControl(),//6
        'isLastTransferGroundPersonalStatusYn': new FormControl(''),//6
        'q6TPt': new FormControl(),//6
        'q6TYyn': new FormControl(),//6
        'personalStatus': new FormControl(), //6
        'teacherDob': new FormControl,//7
        'hardStationCode': new FormControl(), //7
        'hardStationName': new FormControl(), //7
        'hardStationWorkStartDate': new FormControl(), //7
        'hardStationWorkEndDate': new FormControl(), //7
        'q9TPt': new FormControl(),
        'q7TPt': new FormControl(),
        'q7TYyn': new FormControl(),
        'q8TPt': new FormControl(),
        'q8TYyn': new FormControl(),
        'q10TPt': new FormControl(),
        'q10TYyn': new FormControl(),
        'childDifferentAbleYn': new FormControl('', Validators.required),
        'teacherDisabilityYnT': new FormControl(),
        'isLastTransferGroundTeacherDisabilityYn': new FormControl(''),
        'associationMemberYnT': new FormControl(),
        'totalTransferCount': new FormControl(),
        'spouseStatusTransfer': new FormControl(),

        'doptStationOneCode': new FormControl(),
        'doptStationOneName': new FormControl(),
        'doptStationTwoCode': new FormControl(),
        'doptStationTwoName': new FormControl(),
      }),
      declaration: new FormGroup({
        'spouseKvsYnD': new FormControl(),
        'personalStatusMdgD': new FormControl(),
        'personalStatusSpD': new FormControl(),
        'personalStatusDfpD': new FormControl(),
        'memberJCM': new FormControl(),
        'child_10_12_ynD': new FormControl(),
        'careGiverYnD': new FormControl(),
        'childDifferentAbleYnD': new FormControl(),

        'spouseEmpCode': new FormControl(''),
        'spousePost': new FormControl(''),
        'spouseStationName': new FormControl(''),

        'patientName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientAilment': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientHospital': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientMedicalOfficerName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'patientMedicalOfficerDesignation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),

        'child_10_12_name': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'child_10_12_class': new FormControl('', Validators.required),
        'child_10_12_school': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'child_10_12_board': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),

        'careGiverName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'careGiverRelation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'careGiverDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'careGiverDisabilityPrcnt': new FormControl('', [Validators.required, Validators.maxLength(3), Validators.min(0), Validators.max(100), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),

        'childDifferentName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
        'childDifferentDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
        'childDifferentDisabilityPrcnt': new FormControl('', [Validators.required, Validators.min(0), Validators.max(100), Validators.maxLength(3), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),
      }),
      'previousPostingDetails': new FormArray([]),
    })
  }

  //Add Posting Form --Start
  previousPostingDetails(): FormArray {
    return this.transferForm.get("previousPostingDetails") as FormArray
  }
  newQuantity(data): FormGroup {
    return this.fb.group({
      teacherId: data.teacherId,
      workExperienceId: data.workExperienceId,
      stationName: data.stationName,
      udiseSchoolName: [data.udiseSchoolName, [Validators.required]],
      kvCode: [data.kvCode, [Validators.required]],
      workStartDate: [data.workStartDate, [Validators.required]],
      workEndDate: [data.workEndDate, [Validators.required]],
      natureOfAppointment: [data.natureOfAppointment, [Validators.required]],
      positionType: [data.positionType, [Validators.required]],
      // appointedForSubject: [data.appointedForSubject, [Validators.required]],
      stationType: [data.stationType, [Validators.required]],
      groundForTransfer: [data.groundForTransfer],
      shiftType: [data.shiftType, [Validators.required]],
      udiseSchCode: [data.udiseSchCode]
    })
  }
  addQuantity(data) {
    this.previousPostingDetails().push(this.newQuantity(data));
  }

  //Add Posting Form --Start

  getTransferBasicProfileByTchId() {
    this.outSideService.fetchTransferBasicProfileByTchId(this.tempTeacherId).subscribe((res) => {

      this.profileData = res.response.profileDetails
      this.responseData = res.response.profileDetails;
      this.reponseDataForPdf = this.responseData

      this.teacherExperienceData = res.response.teacherExperience;
      this.transferStatusOperation = res.response.profileDetails.transferStatus;
      this.formStatusLocale = res.response.profileDetails.transferStatus;

      if (this.responseData.hasOwnProperty('transferApplicationNumber')) {
        this.transferApplicationNumberVal = this.responseData?.transferApplicationNumber;
      } else {
        this.transferApplicationNumberVal = 'Transfer Not Initiated';
      }

      if ((this.responseData.tpersonalStatusLtr == null || this.responseData.tpersonalStatusLtr == undefined) && (this.responseData.tpersonalStatusDfp == null || this.responseData.tpersonalStatusDfp == undefined) &&
        (this.responseData.tpersonalStatusMdg == null || this.responseData.tpersonalStatusMdg == undefined) && (this.responseData.tpersonalStatusWid == null
          || this.responseData.tpersonalStatusWid == undefined) && (this.responseData.tpersonalStatusSp == null || this.responseData.tpersonalStatusSp == undefined)) {

        this.transferForm.patchValue({
          displacementCount: {
            personalStatus: '1',
            personalStatusDefault: '1'
          }
        })
      }

      setTimeout(() => {
        this.getDistrictByStateId(this.profileData.teacherParmanentState)
      }, 300);

      this.setReceivedData(this.responseData)
      this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
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
    })
  }

  getInitiatedTeacherDetails() {
    this.outSideService.fetchInitiateTeacherTransfer(this.tempTeacherId).subscribe((res) => {
      this.responseData = res.response;
      this.existingTransferId = this.responseData.transferApplicationNumber

    })
  }

  setReceivedData(setData) {
    const data = {
      "applicationId": environment.applicationId,
      "teacherTypeId": setData.lastPromotionPositionType
    }
    setTimeout(() => {
      this.getSubjectByTchType(data);
      if (this.kvSchoolList == "" || this.kvSchoolList == undefined) {
        var intraStationCond = {
          "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
          "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
        }
        this.getKvSchoolByStationId(intraStationCond);
      }

    }, 300);
    if (setData != null) {
      this.absenceTc = setData.absenceDaysTcone;
      sessionStorage.setItem('q5DPt', setData.q5DPt)
      sessionStorage.setItem('spouseStatus', setData.spouseStatus)

      if (setData.spouseStatusTransfer == '1' || setData.spouseStatusTransfer == '2' || setData.spouseStatusTransfer == '3') {
        if (setData?.stationWithin100km1 != '1' && setData?.stationWithin100km2 != '1' && setData?.stationWithin100km3 != '1' && setData?.stationWithin100km4 != '1' && setData?.stationWithin100km5 != '1') {
          var temp_q4TPt = 0;
          if (setData.teacherGender == '2' || setData.teacherGender == 2) {
            var temp_q9TPt = '20';
            var temp_unmarriedWomanYn = '4';
          } else {
            temp_q9TPt = setData.q9TPt;
            temp_unmarriedWomanYn = setData.unmarriedWomanYn;
          }
        } else {
          if (setData.spouseStatusTransfer == '1') {
            temp_q4TPt = 50;
            temp_q9TPt = '0';
            temp_unmarriedWomanYn = '0';
          } else if (setData.spouseStatusTransfer == '2') {
            temp_q4TPt = 40;
            temp_q9TPt = '0';
            temp_unmarriedWomanYn = '0';
          } else if (setData.spouseStatusTransfer == '3') {
            temp_q4TPt = 30;
            temp_q9TPt = '0';
            temp_unmarriedWomanYn = '0';
          }
        }
      } else if (setData.spouseStatusTransfer == '4') {
        temp_q4TPt = setData.q4TPt;
        temp_q9TPt = setData.q9TPt;
        temp_unmarriedWomanYn = setData.unmarriedWomanYn;
      } else if (setData.spouseStatusTransfer == '5') {
        temp_q4TPt = setData.q4TPt;
        temp_q9TPt = setData.q9TPt;
        temp_unmarriedWomanYn = setData.unmarriedWomanYn;
      }

      sessionStorage.setItem('q9TPt', temp_q9TPt == null ? '0' : temp_q9TPt == 'null' ? '0' : temp_q9TPt)
      sessionStorage.setItem('unmarriedWomanYn', temp_unmarriedWomanYn)

      if (setData.personalStatusSp == '1' || setData.personalStatusWid == '1') {
        temp_q9TPt = '0';
        temp_unmarriedWomanYn = '0';
      }

      if ((moment().diff(setData.teacherDob, 'years')) < 57) {
        this.transferForm.get('displacementCount').get('personalStatusLtrDc').disable();
      }

      if (setData.personalStatusLtr == '9' || ((moment().diff(setData.teacherDob, 'years')) < 57)) {
        this.disableLTR = true;
        this.transferForm.get('transferCount').get('personalStatusLtr').disable();
      }
      if (setData.personalStatusDfp == '9') {
        this.disableDFP = true;
        this.transferForm.get('transferCount').get('personalStatusDfp').disable();
      }
      if (setData.personalStatusMdg == '9') {
        this.disableMDG = true;
        this.transferForm.get('transferCount').get('personalStatusMdg').disable();
      }
      if (setData.personalStatusSp == '9') {
        this.disableSP = true;
        this.transferForm.get('transferCount').get('personalStatusSp').disable();
      }
      if (setData.personalStatusWid == '9') {
        this.disableWidow = true;
        this.transferForm.get('transferCount').get('personalStatusWid').disable();
      }
      if (setData.teacherDisabilityYn == '0') {
        this.transfer7b = true;
      } else {
        this.transfer7b = false;
      }
      if (setData.applyTransferYn == '1') {
        this.enableTransferFormYn = true;
        this.enableTransferFormYnVal = '1'
      } else if (setData.applyTransferYn == '0') {
        this.enableTransferFormYn = false;
        this.enableTransferFormYnVal = '0'
      } else {
        this.enableTransferFormYn = true;
        this.enableTransferFormYnVal = ''
      }
      if (setData.q6TPt == '0' || setData.q6TPt == 0) {
        this.transfer5b = true;
      } else {
        this.transfer5b = false;
      }
      if (setData.choiceKv1StationCode != null && setData.choiceKv1StationCode != "") {
        this.preferenceStationList.push(setData.choiceKv1StationCode)
      }
      if (setData.choiceKv2StationCode != null && setData.choiceKv2StationCode != "") {
        this.preferenceStationList.push(setData.choiceKv2StationCode)
      }
      if (setData.choiceKv3StationCode != null && setData.choiceKv3StationCode != "") {
        this.preferenceStationList.push(setData.choiceKv3StationCode)
      }
      if (setData.choiceKv4StationCode != null && setData.choiceKv4StationCode != "") {
        this.preferenceStationList.push(setData.choiceKv4StationCode)
      }
      if (setData.choiceKv5StationCode != null && setData.choiceKv5StationCode != "") {
        this.preferenceStationList.push(setData.choiceKv5StationCode)
      }
      var finalList = {
        "stationList": this.preferenceStationList,
      }
      if (setData.presidentAward == '1') {
        this.presidentAward = true;
        this.noAward = false;
      }
      if (setData.nationalAward == '1') {
        this.nationalAward = true;
        this.noAward = false;
      }
      if (setData.regionalAward == '1') {
        this.regionalAward = true;
        this.noAward = false;
      }
      if (setData.spouseKvsYnd == '1' || setData.spouseKvsYn == '1') {
        this.gkFilebenefit = true

      } if (setData?.personalStatusMdgD == '1' || setData?.personalStatusMdg == '1') {
        this.gkFilemMedical = true

      } if (setData?.personalStatusSpD == '1' || setData?.personalStatusSp == '1') {
        this.spGround = true

      } if (setData?.personalStatusDfpD == '1' || setData?.personalStatusDfp == '1') {
        this.dfpGround = true

      } if (setData?.associationMemberYn == '1' || setData?.associationMemberYn == '2') {
        this.memJCM = true

      } if (setData?.childDifferentAbleYnD == '1' || setData?.childDifferentAbleYn == '1') {
        this.abledChild = true

      } if (setData?.child_10_12_yn == '1') {
        this.boardExam = true

      } if (setData?.child_10_12_yn == '0') {
        this.boardExam = false

      } if (setData?.careGiverYn == '1') {
        this.careGiver = true

      } if (setData?.childDifferentAbleYn == '1') {
        this.abledChild = true
      }
      if (setData.presidentAward != '1' && setData.nationalAward != '1' && setData.regionalAward != '1') {
        this.noAward = true;
      }
      if (setData.shiftChangeSameSchool == '2') {
        // this.showStationChoice18 = true;

      }
      if ((setData.choiceKv1UdiseCodePresentStation != null && setData.choiceKv1UdiseCodePresentStation != 'null'
        && setData.choiceKv1UdiseCodePresentStation != '' || setData.choiceKv2UdiseCodePresentStation != null && setData.choiceKv2UdiseCodePresentStation != 'null'
        && setData.choiceKv2UdiseCodePresentStation != '') || setData.shiftChangeSameSchool == '2') {

        this.showStationChoice18B = true;

      } if (setData.choiceKv1StationCode != null && setData.choiceKv1StationCode != 'null' &&
        setData.choiceKv1StationCode != '' || setData.shiftChangeSameSchool == '3') {
        this.showStationChoice18C = true;
      }

      if (setData.presidentAward == '1') {
        var awardPoint = -6
      } else if (setData.presidentAward == '1' && setData.nationalAward == '1' && setData.regionalAward == '1') {
        var awardPoint = -6
      } else if (setData.presidentAward != '1' && setData.nationalAward == '1' && setData.regionalAward == '1') {
        var awardPoint = -6
      } else if (setData.presidentAward != '1' && setData.nationalAward == '1' && setData.regionalAward != '1') {
        var awardPoint = -4
      } else if (setData.presidentAward != '1' && setData.nationalAward != '1' && setData.regionalAward == '1') {
        var awardPoint = -2
      } else {
        var awardPoint = 0;
      }
    }




    this.transferForm.patchValue({
      basicDetails: {
        teacherId: setData.teacherId,
        teacherName: setData.teacherName,
        teacherEmployeeCode: setData.teacherEmployeeCode,
        teacherDob: setData.teacherDob,
        teacherParmanentState: setData.teacherParmanentState,
        teacherPermanentDistrict: setData.teacherPermanentDistrict,
        teacherGender: setData.teacherGender,
        lastPromotionPositionType: setData.lastPromotionPositionType,
        lastPromotionPositionDate: setData.lastPromotionPositionDate,
        workExperiencePositionTypePresentStationStartDate: setData.workExperiencePositionTypePresentStationStartDate,
        workExperienceWorkStartDatePresentKv: setData.workExperienceWorkStartDatePresentKv,
        workExperienceAppointedForSubject: setData.workExperienceAppointedForSubject,
        natureOfAppointment: setData.natureOfAppointment
      },
      stationChoice: {
        recruitedSpclDriveNer: setData.recruitedSpclDriveNer,
        shiftChangeSameSchool: setData.shiftChangeSameSchool,
        choiceKv1UdiseCodePresentStation: setData.choiceKv1UdiseCodePresentStation,
        choiceKv2UdiseCodePresentStation: setData.choiceKv2UdiseCodePresentStation,
        choiceKv3UdiseCodePresentStation: setData.choiceKv3UdiseCodePresentStation,
        choiceKv4UdiseCodePresentStation: setData.choiceKv4UdiseCodePresentStation,
        choiceKv5UdiseCodePresentStation: setData.choiceKv5UdiseCodePresentStation,
        choiceKv1StationCode: setData.choiceKv1StationCode,
        choiceKv2StationCode: setData.choiceKv2StationCode,
        choiceKv3StationCode: setData.choiceKv3StationCode,
        choiceKv4StationCode: setData.choiceKv4StationCode,
        choiceKv5StationCode: setData.choiceKv5StationCode,
        displacement1StationCode: setData.displacement1StationCode,
        displacement2StationCode: setData.displacement2StationCode,
        displacement3StationCode: setData.displacement3StationCode,
        displacement4StationCode: setData.displacement4StationCode,
        displacement5StationCode: setData.displacement5StationCode,
        transferApplicationNumber: setData.transferApplicationNumber,
        choiceKv1UdiseNamePresentStation: setData.choiceKv1UdiseNamePresentStation,
        choiceKv2UdiseNamePresentStation: setData.choiceKv2UdiseNamePresentStation,
        choiceKv3UdiseNamePresentStation: setData.choiceKv3UdiseNamePresentStation,
        choiceKv4UdiseNamePresentStation: setData.choiceKv4UdiseNamePresentStation,
        choiceKv5UdiseNamePresentStation: setData.choiceKv5UdiseNamePresentStation,
        choiceKv1StationName: setData.choiceKv1StationName,
        choiceKv2StationName: setData.choiceKv2StationName,
        choiceKv3StationName: setData.choiceKv3StationName,
        choiceKv4StationName: setData.choiceKv4StationName,
        choiceKv5StationName: setData.choiceKv5StationName,
        displacement1StationName: setData.displacement1StationName,
        displacement2StationName: setData.displacement2StationName,
        displacement3StationName: setData.displacement3StationName,
        displacement4StationName: setData.displacement4StationName,
        displacement5StationName: setData.displacement5StationName,
        choiceKv1StationCodeUdiseCode1: setData.choiceKv1StationCodeUdiseCode1,
        choiceKv1StationCodeUdiseCode2: setData.choiceKv1StationCodeUdiseCode2,
        choiceKv1StationCodeUdiseCode3: setData.choiceKv1StationCodeUdiseCode3,
        choiceKv2StationCodeUdiseCode1: setData.choiceKv2StationCodeUdiseCode1,
        choiceKv2StationCodeUdiseCode2: setData.choiceKv2StationCodeUdiseCode2,
        choiceKv2StationCodeUdiseCode3: setData.choiceKv2StationCodeUdiseCode3,
        choiceKv3StationCodeUdiseCode1: setData.choiceKv3StationCodeUdiseCode1,
        choiceKv3StationCodeUdiseCode2: setData.choiceKv3StationCodeUdiseCode2,
        choiceKv3StationCodeUdiseCode3: setData.choiceKv3StationCodeUdiseCode3,
        choiceKv4StationCodeUdiseCode1: setData.choiceKv4StationCodeUdiseCode1,
        choiceKv4StationCodeUdiseCode2: setData.choiceKv4StationCodeUdiseCode2,
        choiceKv4StationCodeUdiseCode3: setData.choiceKv4StationCodeUdiseCode3,
        choiceKv5StationCodeUdiseCode1: setData.choiceKv5StationCodeUdiseCode1,
        choiceKv5StationCodeUdiseCode2: setData.choiceKv5StationCodeUdiseCode2,
        choiceKv5StationCodeUdiseCode3: setData.choiceKv5StationCodeUdiseCode3,
        choiceKv1StationCodeUdiseName1: setData.choiceKv1StationCodeUdiseName1,
        choiceKv1StationCodeUdiseName2: setData.choiceKv1StationCodeUdiseName2,
        choiceKv1StationCodeUdiseName3: setData.choiceKv1StationCodeUdiseName3,
        choiceKv2StationCodeUdiseName1: setData.choiceKv2StationCodeUdiseName1,
        choiceKv2StationCodeUdiseName2: setData.choiceKv2StationCodeUdiseName2,
        choiceKv2StationCodeUdiseName3: setData.choiceKv2StationCodeUdiseName3,
        choiceKv3StationCodeUdiseName1: setData.choiceKv3StationCodeUdiseName1,
        choiceKv3StationCodeUdiseName2: setData.choiceKv3StationCodeUdiseName2,
        choiceKv3StationCodeUdiseName3: setData.choiceKv3StationCodeUdiseName3,
        choiceKv4StationCodeUdiseName1: setData.choiceKv4StationCodeUdiseName1,
        choiceKv4StationCodeUdiseName2: setData.choiceKv4StationCodeUdiseName2,
        choiceKv4StationCodeUdiseName3: setData.choiceKv4StationCodeUdiseName3,
        choiceKv5StationCodeUdiseName1: setData.choiceKv5StationCodeUdiseName1,
        choiceKv5StationCodeUdiseName2: setData.choiceKv5StationCodeUdiseName2,
        choiceKv5StationCodeUdiseName3: setData.choiceKv5StationCodeUdiseName3,

        stationWithin100km1: setData.stationWithin100km1,
        stationWithin100km2: setData.stationWithin100km2,
        stationWithin100km3: setData.stationWithin100km3,
        stationWithin100km4: setData.stationWithin100km4,
        stationWithin100km5: setData.stationWithin100km5,
      },
      displacementCount: {
        numberOfWorkingDays: setData.numberOfWorkingDays,//1
        absenceDaysOne: setData.absenceDaysOne,//1
        absenceDaysTwo: setData.absenceDaysTwo,//1
        actualNumberOfWorkingDays: setData.actualNumberOfWorkingDays,//1
        workExperiencePositionTypePresentStationStartDate: setData?.workExperiencePositionTypePresentStationStartDate, //1
        presentStationName: setData.presentStationName, //1
        presentStationCode: setData.presentStationCode, //1
        q1DPt: setData.q1DPt,//1
        apprGradeYr1: setData.apprGradeYr1, //2
        apprGrade1: setData.apprGrade1, //2
        apprGradeYr2: setData.apprGradeYr2, //2
        apprGrade2: setData.apprGrade2, //2
        q2DPt: setData.q2DPt,//2
        teacherDob: setData?.teacherDob,//3
        hardStationCode: setData.hardStationCode, //3
        hardStationName: setData.hardStationName, //3
        hardStationWorkStartDate: setData?.hardStationWorkStartDate, //3
        hardStationWorkEndDate: setData?.hardStationWorkEndDate, //3
        q3DYn: setData.q3DYn, //3
        q3DPt: setData.q3DPt,//3
        personalStatus: '1', //4
        personalStatusLtrDc: setData.personalStatusLtrDc, //4
        personalStatusDfpDc: setData.personalStatusDfpDc,//4
        personalStatusMdgDc: setData.personalStatusMdgDc, //4
        personalStatusWidDc: setData.personalStatusWidDc, //4
        personalStatusSpDc: setData.personalStatusSpDc, //4
        q4DPt: setData.q4DPt, //4
        spouseStatus: setData.spouseStatus, //5
        spouseKvsYn: setData.spouseKvsYn, //5
        spouseStateGvotYn: setData.spouseStateGvotYn, //5
        spouseCentralGvotYn: setData.spouseCentralGvotYn, //5
        unmarriedWomanYn: (setData.unmarriedWomanYn == '4') ? '4' : '0', //5
        spouseNa: setData.spouseNa,
        q5DPt: setData.q5DPt,//5
        teacherDisabilityYn: setData.teacherDisabilityYn,//6
        q9DPt: setData.q9DPt,//6
        associationMemberYn: setData.associationMemberYn, //7  
        q10DPt: setData.q10DPt,//7 
        presidentAward: setData.presidentAward, //8
        nationalAward: setData.nationalAward, //8
        regionalAward: setData.regionalAward, //8
        q11DPt: awardPoint,//8
        child_10_12_yn: setData.child_10_12_yn, //9
        q12DPt: setData.q12DPt,//9
        careGiverYn: setData.careGiverYn,  //10
        q13DPt: setData.q13DPt,//10
        totalDisplacementCount: setData.totalDisplacementCount,
        stationWithin100kmDispYn: setData?.stationWithin100kmDispYn,
        spouseStatusDisplacement: setData?.spouseStatusDisplacement,

        personalStatusDefaultDc: ((setData.personalStatusLtrDc == null || setData.personalStatusLtrDc == undefined || setData.personalStatusLtrDc == "9") &&
          (setData.personalStatusDfpDc == null || setData.personalStatusDfpDc == undefined || setData.personalStatusDfpDc == "9") &&
          (setData.personalStatusMdgDc == null || setData.personalStatusMdgDc == undefined || setData.personalStatusMdgDc == "9") &&
          (setData.personalStatusWidDc == null || setData.personalStatusWidDc == undefined || setData.personalStatusWidDc == "9") &&
          (setData.personalStatusSpDc == null || setData.personalStatusSpDc == undefined || setData.personalStatusSpDc == "9")) ? '1' : null
      },
      transferCount: {
        applyTransferYn: setData.applyTransferYn,
        numberOfWorkingDays: setData.numberOfWorkingDays,
        absenceDaysOne: setData.absenceDaysOne,
        absenceDaysTwo: setData.absenceDaysTwo,
        absenceDaysTcone: setData.absenceDaysTcone,
        actualNumberOfWorkingTcdays: setData.actualNumberOfWorkingTcdays,
        workExperiencePositionTypePresentStationStartDate: setData?.workExperiencePositionTypePresentStationStartDate,
        presentStationName: setData.presentStationName,
        presentStationCode: setData.presentStationCode,
        q1TPt: setData.q1TPt,
        apprGradeYr1: setData.apprGradeYr1,
        apprGrade1: setData.apprGrade1,
        apprGradeYr2: setData.apprGradeYr2,
        apprGrade2: setData.apprGrade2,
        q2TPt: setData.q2TPt,
        presidentAward: setData.presidentAward,
        nationalAward: setData.nationalAward,
        regionalAward: setData.regionalAward,
        q3TPt: setData.q3TPt,
        spouseStatusTransfer: setData.spouseStatusTransfer,
        tSpouseStatus: setData.spouseStatus,
        spouseKvsYn: setData.spouseKvsYn,
        spouseStateGvotYn: setData.spouseStateGvotYn,
        spouseCentralGvotYn: setData.spouseCentralGvotYn,
        unmarriedWomanYn: (temp_unmarriedWomanYn == '4') ? '4' : '0',
        spouseNa: setData.spouseNa,
        q4TPt: temp_q4TPt,
        personalStatusLtr: setData.personalStatusLtr,
        personalStatusDfp: setData.personalStatusDfp,
        personalStatusMdg: setData.personalStatusMdg,
        personalStatusWid: setData.personalStatusWid,
        personalStatusSp: setData.personalStatusSp,
        isLastTransferGroundPersonalStatusYn: setData.isLastTransferGroundPersonalStatusYn,
        q6TPt: setData.q6TPt,
        q6TYyn: setData.q6TYyn,
        personalStatus: setData.personalStatus,
        teacherDob: setData.teacherDob,
        hardStationCode: setData.hardStationCode,
        hardStationName: setData.hardStationName,
        hardStationWorkStartDate: setData.hardStationWorkStartDate,
        hardStationWorkEndDate: setData.hardStationWorkEndDate,
        q9TPt: temp_q9TPt,
        q7TPt: setData.q7TPt,
        q7TYyn: setData.q7TYyn,
        q8TPt: setData.q8TPt,
        q8TYyn: setData.q8TYyn,
        q10TPt: setData.q10TPt,
        q10TYyn: setData.q10TYyn,
        childDifferentAbleYn: setData.childDifferentAbleYn,
        teacherDisabilityYnT: setData.teacherDisabilityYn,
        isLastTransferGroundTeacherDisabilityYn: setData.isLastTransferGroundTeacherDisabilityYn,
        associationMemberYnT: setData.associationMemberYn,
        totalTransferCount: setData.totalTransferCount,

        doptStationOneCode: setData.doptStationOneCode,
        doptStationOneName: setData.doptStationOneName,
        doptStationTwoCode: setData.doptStationTwoCode,
        doptStationTwoName: setData.doptStationTwoName,

        personalStatusDefault: ((setData.personalStatusLtr == null || setData.personalStatusLtr == undefined || setData.personalStatusLtr == "9") &&
          (setData.personalStatusDfp == null || setData.personalStatusDfp == undefined || setData.personalStatusDfp == "9") &&
          (setData.personalStatusMdg == null || setData.personalStatusMdg == undefined || setData.personalStatusMdg == "9") &&
          (setData.personalStatusWid == null || setData.personalStatusWid == undefined || setData.personalStatusWid == "9") &&
          (setData.personalStatusSp == null || setData.personalStatusSp == undefined || setData.personalStatusSp == "9")) ? '1' : null

      },
      declaration: {
        spouseKvsYnD: setData.spouseKvsYnd,
        personalStatusMdgD: setData.personalStatusMdg == '1' ? '1' : '0',
        personalStatusSpD: setData.personalStatusSp == '1' ? '1' : '0',
        personalStatusDfpD: setData.personalStatusDfp == '1' ? '1' : '0',
        memberJCM: setData.associationMemberYn == '3' ? '0' : '1',
        child_10_12_ynD: setData.child_10_12_yn,
        careGiverYnD: setData.careGiverYn,
        childDifferentAbleYnD: setData.childDifferentAbleYn,

        spouseEmpCode: setData.spouseEmpCode,
        spousePost: setData.spousePost,
        spouseStationName: setData.spouseStationName,
        patientName: setData.patientName,
        patientAilment: setData.patientAilment,
        patientHospital: setData.patientHospital,
        patientMedicalOfficerName: setData.patientMedicalOfficerName,
        patientMedicalOfficerDesignation: setData.patientMedicalOfficerDesignation,
        child_10_12_name: setData.child1012Name,
        child_10_12_class: setData.child1012Class,
        child_10_12_school: setData.child1012School,
        child_10_12_board: setData.child1012Board,
        careGiverName: setData.careGiverName,
        careGiverRelation: setData.careGiverRelation,
        careGiverDisabilityName: setData.careGiverDisabilityName,
        careGiverDisabilityPrcnt: setData.careGiverDisabilityPrcnt,
        childDifferentName: setData.childDifferentName,
        childDifferentDisabilityName: setData.childDifferentDisabilityName,
        childDifferentDisabilityPrcnt: setData.childDifferentDisabilityPrcnt,
      }
    });
    this.displacementTotalPoint();
    this.transferTotalPoint();

    (this.transferForm.controls['previousPostingDetails'] as FormArray).clear();
    for (let i = 0; i < this.teacherExperienceData.length; i++) {
      const tempExpData = JSON.parse(JSON.stringify(this.teacherExperienceData[i]))
      if (tempExpData.workEndDate != null && tempExpData.workEndDate != "null") {
        tempExpData.workEndDate = this.date.transform(new Date(tempExpData.workEndDate * 1), 'yyyy-MM-dd')
      }
      tempExpData.workStartDate = this.date.transform(new Date(tempExpData.workStartDate * 1), 'yyyy-MM-dd')
      this.addQuantity(tempExpData)
    }
  }

  initiateTeacherTransfer() {
    if (this.responseData.hasOwnProperty('transferApplicationNumber')) {
      if (this.responseData?.transferApplicationNumber == null || this.responseData?.transferApplicationNumber == 'null'
        || this.responseData?.transferApplicationNumber == '') {

        this.outSideService.initiateTeacherTransfer(this.transferForm.value.previousPostingDetails).subscribe((res) => {
          this.responseData = res.response;
          this.transferStatusOperation = res.response.transferStatus;
          this.formStatusLocale = res.response.transferStatus;
          Swal.fire(
            'Your transfer application has been initiated!',
            'Application Number : ' + this.responseData.transferApplicationNumber,
            'success'
          )
        })
        this.getTransferBasicProfileByTchId();
      } else {
        // Swal.fire(
        //   'Transfer already initiated !',
        //   this.responseData.transferApplicationNumber
        // )
      }
    } else {
      this.outSideService.initiateTeacherTransfer(this.transferForm.value.previousPostingDetails).subscribe((res) => {

        this.responseData = res.response;
        this.transferStatusOperation = res.response.transferStatus;
        this.formStatusLocale = res.response.transferStatus;
        Swal.fire(
          'Your transfer application has been initiated!',
          'Application Number : ' + this.responseData.transferApplicationNumber,
          'success'
        )
        this.getTransferBasicProfileByTchId();

      })
    }
  }

  checkCheckBoxvalue(event) {
    this.proceed = event.checked;
  }

  onSubmit(event: Event) {
    this.displacementTotalPoint();
    this.transferTotalPoint();
    if (this.transferStatusOperation == 'TRA' || this.transferStatusOperation == 'TRE' || this.transferStatusOperation == 'TRS' || this.transferStatusOperation == 'TRR') {
      return;
    }
    var activeButton = document.activeElement.id;

    if (activeButton == 'submit3') {
      this.responseData.numberOfWorkingDays = this.transferForm.value.displacementCount.numberOfWorkingDays
      this.responseData.absenceDaysOne = this.transferForm.value.displacementCount.absenceDaysOne
      this.responseData.absenceDaysTwo = this.transferForm.value.displacementCount.absenceDaysTwo
      this.responseData.actualNumberOfWorkingDays = this.transferForm.value.displacementCount.actualNumberOfWorkingDays
      this.responseData.workExperiencePositionTypePresentStationStartDate = this.transferForm.value.displacementCount.workExperiencePositionTypePresentStationStartDate
      this.responseData.presentStationName = this.transferForm.value.displacementCount.presentStationName
      this.responseData.presentStationCode = this.transferForm.value.displacementCount.presentStationCode
      this.responseData.q1DPt = this.transferForm.value.displacementCount.q1DPt
      this.responseData.apprGradeYr1 = this.transferForm.value.displacementCount.apprGradeYr1
      this.responseData.apprGrade1 = this.transferForm.value.displacementCount.apprGrade1
      this.responseData.apprGradeYr2 = this.transferForm.value.displacementCount.apprGradeYr2
      this.responseData.apprGrade2 = this.transferForm.value.displacementCount.apprGrade2
      this.responseData.q2DPt = this.transferForm.value.displacementCount.q2DPt
      this.responseData.q2TPt = this.transferForm.value.transferCount.q2TPt
      this.responseData.teacherDob = this.transferForm.value.displacementCount.teacherDob
      this.responseData.hardStationCode = this.transferForm.value.displacementCount.hardStationCode
      this.responseData.hardStationName = this.transferForm.value.displacementCount.hardStationName
      this.responseData.hardStationWorkStartDate = this.transferForm.value.displacementCount.hardStationWorkStartDate
      this.responseData.hardStationWorkEndDate = this.transferForm.value.displacementCount.hardStationWorkEndDate
      this.responseData.q3DYn = this.transferForm.value.displacementCount.q3DYn
      this.responseData.q3DPt = this.transferForm.value.displacementCount.q3DPt
      this.responseData.personalStatus = this.transferForm.value.displacementCount.personalStatus
      this.responseData.personalStatusLtrDc = this.transferForm.value.displacementCount.personalStatusLtrDc
      this.responseData.personalStatusDfpDc = this.transferForm.value.displacementCount.personalStatusDfpDc
      this.responseData.personalStatusMdgDc = this.transferForm.value.displacementCount.personalStatusMdgDc
      this.responseData.personalStatusWidDc = this.transferForm.value.displacementCount.personalStatusWidDc
      this.responseData.personalStatusSpDc = this.transferForm.value.displacementCount.personalStatusSpDc
      this.responseData.q4DPt = this.transferForm.value.displacementCount.q4DPt
      this.responseData.spouseStatus = this.transferForm.value.displacementCount.spouseStatus
      this.responseData.spouseKvsYn = this.transferForm.value.displacementCount.spouseKvsYn
      this.responseData.spouseStateGvotYn = this.transferForm.value.displacementCount.spouseStateGvotYn
      this.responseData.spouseCentralGvotYn = this.transferForm.value.displacementCount.spouseCentralGvotYn
      this.responseData.unmarriedWomanYn = this.transferForm.value.displacementCount.unmarriedWomanYn
      this.responseData.q5DPt = this.transferForm.value.displacementCount.q5DPt
      this.responseData.teacherDisabilityYn = this.transferForm.value.displacementCount.teacherDisabilityYn
      this.responseData.q9DPt = this.transferForm.value.displacementCount.q9DPt
      this.responseData.associationMemberYn = this.transferForm.value.displacementCount.associationMemberYn
      this.responseData.q10DPt = this.transferForm.value.displacementCount.q10DPt
      this.responseData.presidentAward = this.transferForm.value.displacementCount.presidentAward
      this.responseData.nationalAward = this.transferForm.value.displacementCount.nationalAward
      this.responseData.regionalAward = this.transferForm.value.displacementCount.regionalAward
      this.responseData.q11DPt = this.transferForm.value.displacementCount.q11DPt
      this.responseData.child_10_12_yn = this.transferForm.value.displacementCount.child_10_12_yn
      this.responseData.q12DPt = this.transferForm.value.displacementCount.q12DPt
      this.responseData.careGiverYn = this.transferForm.value.displacementCount.careGiverYn
      this.responseData.q13DPt = this.transferForm.value.displacementCount.q13DPt
      this.responseData.totalDisplacementCount = this.transferForm.value.displacementCount.totalDisplacementCount
      this.responseData.stationWithin100kmDispYn = this.transferForm.value.displacementCount.stationWithin100kmDispYn
      this.responseData.spouseStatusDisplacement = this.transferForm.value.displacementCount.spouseStatusDisplacement
      this.responseData.transferStatus = 'TRI'

      this.outSideService.saveInitiatedTeacherTransfer(this.responseData).subscribe((res) => {
        if (res.status == 1 || res.status == '1') {
          this.responseData = res.response;
          this.transferStatusOperation = res.response.transferStatus;
          this.setReceivedData(this.responseData)
          // nextTempClick();
          this.formStatusLocale = 'TRI'
          Swal.fire(
            'Your data has been saved successfully!',
            '',
            'success'
          )
          this.onNextClick(3)
        } else {
          Swal.fire(
            'Data not saved',
            'Please go to previous page and retry',
            'error'
          )
        }
      })
    } else if (activeButton == 'submit4') {
      this.responseData.recruitedSpclDriveNer = this.transferForm.value.stationChoice.recruitedSpclDriveNer
      this.responseData.shiftChangeSameSchool = this.transferForm.value.stationChoice.shiftChangeSameSchool
      this.responseData.choiceKv1UdiseCodePresentStation = this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation
      this.responseData.choiceKv2UdiseCodePresentStation = this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation
      this.responseData.choiceKv3UdiseCodePresentStation = this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation
      this.responseData.choiceKv4UdiseCodePresentStation = this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation
      this.responseData.choiceKv5UdiseCodePresentStation = this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation
      this.responseData.choiceKv1StationCode = this.transferForm.value.stationChoice.choiceKv1StationCode
      this.responseData.choiceKv2StationCode = this.transferForm.value.stationChoice.choiceKv2StationCode
      this.responseData.choiceKv3StationCode = this.transferForm.value.stationChoice.choiceKv3StationCode
      this.responseData.choiceKv4StationCode = this.transferForm.value.stationChoice.choiceKv4StationCode
      this.responseData.choiceKv5StationCode = this.transferForm.value.stationChoice.choiceKv5StationCode
      this.responseData.displacement1StationCode = this.transferForm.value.stationChoice.displacement1StationCode
      this.responseData.displacement2StationCode = this.transferForm.value.stationChoice.displacement2StationCode
      this.responseData.displacement3StationCode = this.transferForm.value.stationChoice.displacement3StationCode
      this.responseData.displacement4StationCode = this.transferForm.value.stationChoice.displacement4StationCode
      this.responseData.displacement5StationCode = this.transferForm.value.stationChoice.displacement5StationCode
      this.responseData.transferApplicationNumber = this.transferForm.value.stationChoice.transferApplicationNumber
      this.responseData.choiceKv1UdiseNamePresentStation = this.transferForm.value.stationChoice.choiceKv1UdiseNamePresentStation
      this.responseData.choiceKv2UdiseNamePresentStation = this.transferForm.value.stationChoice.choiceKv2UdiseNamePresentStation
      this.responseData.choiceKv3UdiseNamePresentStation = this.transferForm.value.stationChoice.choiceKv3UdiseNamePresentStation
      this.responseData.choiceKv4UdiseNamePresentStation = this.transferForm.value.stationChoice.choiceKv4UdiseNamePresentStation
      this.responseData.choiceKv5UdiseNamePresentStation = this.transferForm.value.stationChoice.choiceKv5UdiseNamePresentStation
      this.responseData.choiceKv1StationName = this.transferForm.value.stationChoice.choiceKv1StationName
      this.responseData.choiceKv2StationName = this.transferForm.value.stationChoice.choiceKv2StationName
      this.responseData.choiceKv3StationName = this.transferForm.value.stationChoice.choiceKv3StationName
      this.responseData.choiceKv4StationName = this.transferForm.value.stationChoice.choiceKv4StationName
      this.responseData.choiceKv5StationName = this.transferForm.value.stationChoice.choiceKv5StationName
      this.responseData.displacement1StationName = this.transferForm.value.stationChoice.displacement1StationName
      this.responseData.displacement2StationName = this.transferForm.value.stationChoice.displacement2StationName
      this.responseData.displacement3StationName = this.transferForm.value.stationChoice.displacement3StationName
      this.responseData.displacement4StationName = this.transferForm.value.stationChoice.displacement4StationName
      this.responseData.displacement5StationName = this.transferForm.value.stationChoice.displacement5StationName

      this.responseData.choiceKv1StationCodeUdiseCode1 = this.transferForm.value.stationChoice.choiceKv1StationCodeUdiseCode1
      this.responseData.choiceKv1StationCodeUdiseCode2 = this.transferForm.value.stationChoice.choiceKv1StationCodeUdiseCode2
      this.responseData.choiceKv1StationCodeUdiseCode3 = this.transferForm.value.stationChoice.choiceKv1StationCodeUdiseCode3
      this.responseData.choiceKv2StationCodeUdiseCode1 = this.transferForm.value.stationChoice.choiceKv2StationCodeUdiseCode1
      this.responseData.choiceKv2StationCodeUdiseCode2 = this.transferForm.value.stationChoice.choiceKv2StationCodeUdiseCode2
      this.responseData.choiceKv2StationCodeUdiseCode3 = this.transferForm.value.stationChoice.choiceKv2StationCodeUdiseCode3
      this.responseData.choiceKv3StationCodeUdiseCode1 = this.transferForm.value.stationChoice.choiceKv3StationCodeUdiseCode1
      this.responseData.choiceKv3StationCodeUdiseCode2 = this.transferForm.value.stationChoice.choiceKv3StationCodeUdiseCode2
      this.responseData.choiceKv3StationCodeUdiseCode3 = this.transferForm.value.stationChoice.choiceKv3StationCodeUdiseCode3
      this.responseData.choiceKv4StationCodeUdiseCode1 = this.transferForm.value.stationChoice.choiceKv4StationCodeUdiseCode1
      this.responseData.choiceKv4StationCodeUdiseCode2 = this.transferForm.value.stationChoice.choiceKv4StationCodeUdiseCode2
      this.responseData.choiceKv4StationCodeUdiseCode3 = this.transferForm.value.stationChoice.choiceKv4StationCodeUdiseCode3
      this.responseData.choiceKv5StationCodeUdiseCode1 = this.transferForm.value.stationChoice.choiceKv5StationCodeUdiseCode1
      this.responseData.choiceKv5StationCodeUdiseCode2 = this.transferForm.value.stationChoice.choiceKv5StationCodeUdiseCode2
      this.responseData.choiceKv5StationCodeUdiseCode3 = this.transferForm.value.stationChoice.choiceKv5StationCodeUdiseCode3
      this.responseData.choiceKv1StationCodeUdiseName1 = this.transferForm.value.stationChoice.choiceKv1StationCodeUdiseName1
      this.responseData.choiceKv1StationCodeUdiseName2 = this.transferForm.value.stationChoice.choiceKv1StationCodeUdiseName2
      this.responseData.choiceKv1StationCodeUdiseName3 = this.transferForm.value.stationChoice.choiceKv1StationCodeUdiseName3
      this.responseData.choiceKv2StationCodeUdiseName1 = this.transferForm.value.stationChoice.choiceKv2StationCodeUdiseName1
      this.responseData.choiceKv2StationCodeUdiseName2 = this.transferForm.value.stationChoice.choiceKv2StationCodeUdiseName2
      this.responseData.choiceKv2StationCodeUdiseName3 = this.transferForm.value.stationChoice.choiceKv2StationCodeUdiseName3
      this.responseData.choiceKv3StationCodeUdiseName1 = this.transferForm.value.stationChoice.choiceKv3StationCodeUdiseName1
      this.responseData.choiceKv3StationCodeUdiseName2 = this.transferForm.value.stationChoice.choiceKv3StationCodeUdiseName2
      this.responseData.choiceKv3StationCodeUdiseName3 = this.transferForm.value.stationChoice.choiceKv3StationCodeUdiseName3
      this.responseData.choiceKv4StationCodeUdiseName1 = this.transferForm.value.stationChoice.choiceKv4StationCodeUdiseName1
      this.responseData.choiceKv4StationCodeUdiseName2 = this.transferForm.value.stationChoice.choiceKv4StationCodeUdiseName2
      this.responseData.choiceKv4StationCodeUdiseName3 = this.transferForm.value.stationChoice.choiceKv4StationCodeUdiseName3
      this.responseData.choiceKv5StationCodeUdiseName1 = this.transferForm.value.stationChoice.choiceKv5StationCodeUdiseName1
      this.responseData.choiceKv5StationCodeUdiseName2 = this.transferForm.value.stationChoice.choiceKv5StationCodeUdiseName2
      this.responseData.choiceKv5StationCodeUdiseName3 = this.transferForm.value.stationChoice.choiceKv5StationCodeUdiseName3
      this.responseData.stationWithin100km1 = this.transferForm.value.stationChoice.stationWithin100km1
      this.responseData.stationWithin100km2 = this.transferForm.value.stationChoice.stationWithin100km2
      this.responseData.stationWithin100km3 = this.transferForm.value.stationChoice.stationWithin100km3
      this.responseData.stationWithin100km4 = this.transferForm.value.stationChoice.stationWithin100km4
      this.responseData.stationWithin100km5 = this.transferForm.value.stationChoice.stationWithin100km5
      this.responseData.transferStatus = 'TRI'

      this.outSideService.saveInitiatedTeacherTransfer(this.responseData).subscribe((res) => {

        this.responseData = res.response;
        this.transferStatusOperation = res.response.transferStatus;
        this.setReceivedData(this.responseData)
        this.formStatusLocale = 'TRI'
        Swal.fire(
          'Your data has been saved successfully!',
          '',
          'success'
        )
        this.onNextClick(4)
      })
    } else if (activeButton == 'submit5') {

      this.responseData.applyTransferYn = this.transferForm.value.transferCount.applyTransferYn
      this.responseData.absenceDaysTcone = this.transferForm.value.transferCount.absenceDaysTcone
      this.responseData.actualNumberOfWorkingTcdays = this.transferForm.value.transferCount.actualNumberOfWorkingTcdays
      this.responseData.q1TPt = this.transferForm.value.transferCount.q1TPt
      this.responseData.q2TPt = this.transferForm.value.transferCount.q2TPt
      this.responseData.q3TPt = this.transferForm.value.transferCount.q3TPt
      this.responseData.spouseKvsYn = this.transferForm.value.transferCount.spouseKvsYn
      this.responseData.spouseStateGvotYn = this.transferForm.value.transferCount.spouseStateGvotYn
      this.responseData.spouseCentralGvotYn = this.transferForm.value.transferCount.spouseCentralGvotYn
      this.responseData.unmarriedWomanYn = this.transferForm.value.transferCount.unmarriedWomanYn
      this.responseData.q4TPt = this.transferForm.value.transferCount.q4TPt
      this.responseData.isLastTransferGroundPersonalStatusYn = this.transferForm.value.transferCount.isLastTransferGroundPersonalStatusYn
      this.responseData.q6TPt = this.transferForm.value.transferCount.q6TPt
      this.responseData.q6TYyn = this.transferForm.value.transferCount.q6TYyn
      this.responseData.personalStatus = this.transferForm.value.transferCount.personalStatus
      if (this.profileData.personalStatusLtr == '9') {
        this.responseData.personalStatusLtr = this.transferForm.getRawValue().transferCount.personalStatusLtr
      } else {
        this.responseData.personalStatusLtr = this.transferForm.value.transferCount.personalStatusLtr
      }

      if (this.profileData.personalStatusDfp == '9') {
        this.responseData.personalStatusDfp = this.transferForm.getRawValue().transferCount.personalStatusDfp
      } else {
        this.responseData.personalStatusDfp = this.transferForm.value.transferCount.personalStatusDfp
      }

      if (this.profileData.personalStatusMdg == '9') {
        this.responseData.personalStatusMdg = this.transferForm.getRawValue().transferCount.personalStatusMdg
      } else {
        this.responseData.personalStatusMdg = this.transferForm.value.transferCount.personalStatusMdg
      }

      if (this.profileData.personalStatusWid == '9') {
        this.responseData.personalStatusWid = this.transferForm.getRawValue().transferCount.personalStatusWid
      } else {
        this.responseData.personalStatusWid = this.transferForm.value.transferCount.personalStatusWid
      }

      if (this.profileData.personalStatusSp == '9') {
        this.responseData.personalStatusSp = this.transferForm.getRawValue().transferCount.personalStatusSp
      } else {
        this.responseData.personalStatusSp = this.transferForm.value.transferCount.personalStatusSp
      }
      this.responseData.q9TPt = this.transferForm.value.transferCount.q9TPt
      this.responseData.q7TPt = this.transferForm.value.transferCount.q7TPt
      this.responseData.q7TYyn = this.transferForm.value.transferCount.q7TYyn
      this.responseData.q8TPt = this.transferForm.value.transferCount.q8TPt
      this.responseData.q8TYyn = this.transferForm.value.transferCount.q8TYyn
      this.responseData.q10TPt = this.transferForm.value.transferCount.q10TPt
      this.responseData.q10TYyn = this.transferForm.value.transferCount.q10TYyn
      this.responseData.childDifferentAbleYn = this.transferForm.value.transferCount.childDifferentAbleYn
      this.responseData.isLastTransferGroundTeacherDisabilityYn = this.transferForm.value.transferCount.isLastTransferGroundTeacherDisabilityYn
      this.responseData.childDifferentDisabilityPrcnt = this.transferForm.value.declaration.childDifferentDisabilityPrcnt
      this.responseData.totalTransferCount = this.transferForm.value.transferCount.totalTransferCount
      this.responseData.doptStationOneCode = this.transferForm.value.transferCount.doptStationOneCode
      this.responseData.doptStationOneName = this.transferForm.value.transferCount.doptStationOneName
      this.responseData.doptStationTwoCode = this.transferForm.value.transferCount.doptStationTwoCode
      this.responseData.doptStationTwoName = this.transferForm.value.transferCount.doptStationTwoName
      this.responseData.transferStatus = 'TRI'

      this.outSideService.saveInitiatedTeacherTransfer(this.responseData).subscribe((res) => {

        this.responseData = res.response;
        this.transferStatusOperation = res.response.transferStatus;
        this.setReceivedData(this.responseData)
        this.formStatusLocale = 'TRI'
        Swal.fire(
          'Your data has been saved successfully!',
          '',
          'success'
        )
        this.onNextClick(5)
      })

    } else if (activeButton == 'submit6') {

      this.responseData.spouseEmpCode = this.transferForm.value.declaration.spouseEmpCode
      this.responseData.spousePost = this.transferForm.value.declaration.spousePost
      this.responseData.spouseStation = this.transferForm.value.declaration.spouseStation
      this.responseData.patientName = this.transferForm.value.declaration.patientName
      this.responseData.patientAilment = this.transferForm.value.declaration.patientAilment
      this.responseData.patientHospital = this.transferForm.value.declaration.patientHospital
      this.responseData.patientMedicalOfficerName = this.transferForm.value.declaration.patientMedicalOfficerName
      this.responseData.patientMedicalOfficerDesignation = this.transferForm.value.declaration.patientMedicalOfficerDesignation
      this.responseData.child1012Name = this.transferForm.value.declaration.child_10_12_name
      this.responseData.child1012Class = this.transferForm.value.declaration.child_10_12_class
      this.responseData.child1012School = this.transferForm.value.declaration.child_10_12_school
      this.responseData.child1012Board = this.transferForm.value.declaration.child_10_12_board
      this.responseData.careGiverName = this.transferForm.value.declaration.careGiverName
      this.responseData.careGiverRelation = this.transferForm.value.declaration.careGiverRelation
      this.responseData.careGiverDisabilityName = this.transferForm.value.declaration.careGiverDisabilityName
      this.responseData.careGiverDisabilityPrcnt = this.transferForm.value.declaration.careGiverDisabilityPrcnt
      this.responseData.childDifferentName = this.transferForm.value.declaration.childDifferentName
      this.responseData.childDifferentDisabilityName = this.transferForm.value.declaration.childDifferentDisabilityName
      this.responseData.childDifferentDisabilityPrcnt = this.transferForm.value.declaration.childDifferentDisabilityPrcnt
      this.responseData.transferStatus = 'TRS'


      var submitDeclaration0: boolean;
      var submitDeclaration1: boolean;
      var submitDeclaration2: boolean;
      var submitDeclaration3: boolean;
      var submitDeclaration5: boolean;
      var submitDeclaration6: boolean;
      var submitDeclaration7: boolean;
      var submitDeclaration8: boolean;
      var submitDeclarationFinal: boolean;

      if (this.gkFilemMedical) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "Medical_Certificate.pdf" || this.documentUploadArray[i].docName == "Medical_Certificate") {
            submitDeclaration0 = true;
            break;
          } else {
            submitDeclaration0 = false;
          }
        }
      }
      if (this.boardExam) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "Board_examination_Proof.pdf" || this.documentUploadArray[i].docName == "Board_examination_Proof") {
            submitDeclaration1 = true;
            break;
          } else {
            submitDeclaration1 = false;
          }
        }
      }
      if (this.careGiver) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "Disability_Certificate.pdf" || this.documentUploadArray[i].docName == "Disability_Certificate") {
            submitDeclaration2 = true;
            break;
          } else {
            submitDeclaration2 = false;
          }
        }
      }
      if (this.abledChild) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "Differentially_Abled_Certificate.pdf" || this.documentUploadArray[i].docName == "Differentially_Abled_Certificate") {
            submitDeclaration3 = true;
            break;
          } else {
            submitDeclaration3 = false;
          }
        }
      }
      if (this.gkFilebenefit) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "Spouse_Declaration.pdf" || this.documentUploadArray[i].docName == "Spouse_Declaration") {
            submitDeclaration5 = true;
            break;
          } else {
            submitDeclaration5 = false;
          }
        }
      }
      if (this.spGround) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "Single_Parent_Declaration.pdf" || this.documentUploadArray[i].docName == "Single_Parent_Declaration") {
            submitDeclaration6 = true;
            break;
          } else {
            submitDeclaration6 = false;
          }
        }
      }
      if (this.dfpGround) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "DFP_Declaration.pdf" || this.documentUploadArray[i].docName == "DFP_Declaration") {
            submitDeclaration7 = true;
            break;
          } else {
            submitDeclaration7 = false;
          }
        }
      }
      if (this.memJCM) {
        for (let i = 0; i < this.documentUploadArray.length; i++) {
          if (this.documentUploadArray[i].docName == "NJCM_RJCM_Declaration.pdf" || this.documentUploadArray[i].docName == "NJCM_RJCM_Declaration") {
            submitDeclaration8 = true;
            break;
          } else {
            submitDeclaration8 = false;
          }
        }
      }
      if (submitDeclaration0 == false || submitDeclaration1 == false || submitDeclaration2 == false || submitDeclaration8 == false ||
        submitDeclaration3 == false || submitDeclaration5 == false || submitDeclaration6 == false || submitDeclaration7 == false) {
        submitDeclarationFinal = false;
      } else {
        submitDeclarationFinal = true;
      }

      if (submitDeclarationFinal) {

        this.outSideService.saveInitiatedTeacherTransfer(this.responseData).subscribe((res) => {

          this.responseData = res.response;
          this.transferStatusOperation = res.response.transferStatus;
          this.setReceivedData(this.responseData)
          this.formStatusLocale = 'TRS'
          Swal.fire(
            'Your transfer application has been submitted successfully !',
            this.responseData.transferApplicationNumber,
            'success'
          )
        })
      } else {
        Swal.fire(
          'Kindly upload the required documents !',
          '',
          'error'
        )
      }
    }
  }

  getAllMaster() {
    this.outSideService.fetchAllMaster(6).subscribe((res) => {
      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {
        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].teacherTypeId + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
      }
    })
  }

  getSpouseDetails(event) {
    this.outSideService.fetchSpouseByEmpCode(event.target.value).subscribe((res) => {
      this.transferForm.patchValue({
        declaration: {
          spouseStation: res.response?.stationName,
          spousePost: res.response?.workExperienceIdPresentKv,
        }
      })
    })
  }

  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
        this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code

        this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
        this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";

        this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
        this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
        this.stationName = this.kvSchoolDetails.rowValue[i].station_name;
      }

      this.transferForm.patchValue({
        basicDetails: {
          currentSchoolName: this.kvNameCode,
          presentStationName: this.stationNameCode,
        }
      })
    })
  }

  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_id + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }

  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      this.stateMasterList = res.response.rowValue;
    })
  }

  getDistrictByStateId(stateId) {
    this.outSideService.fetchDistrictByStateId(stateId).subscribe((res) => {
      this.districListByStateIdP = res.response.rowValue
    })
  }

  updateSpouseValue(event) {
    var val = event.target.value
    if (val == '1') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -50,
          spouseKvsYn: '1',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          q4TPt: 50,
          spouseKvsYn: '1',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        }
      })
    } else if (val == '2') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -40,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '2',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          q4TPt: 40,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '2',
          spouseStateGvotYn: '0',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        }
      })
    } else if (val == '3') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -30,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '3',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          q4TPt: 30,
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '3',
          unmarriedWomanYn: '0',
          spouseNa: '0'
        }
      })
    } else if (val == '4') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: -20,
          unmarriedWomanYn: '4',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '0'
        },
        transferCount: {
          unmarriedWomanYn: '4',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '0',
          q4TPt: 0
        }
      })
    } else if (val == '5') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: 0,
          unmarriedWomanYn: '0',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '5'
        },
        transferCount: {
          q4TPt: 0,
          unmarriedWomanYn: '0',
          spouseKvsYn: '0',
          spouseCentralGvotYn: '0',
          spouseStateGvotYn: '0',
          spouseNa: '5'
        }
      })
    }
  }

  stationCoice(val) {

    if (val == '1') {
      this.showStationChoice18B = false;
      this.showStationChoice18C = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1UdiseCodePresentStation: '',
          choiceKv2UdiseCodePresentStation: '',
          choiceKv3UdiseCodePresentStation: '',
          choiceKv4UdiseCodePresentStation: '',
          choiceKv5UdiseCodePresentStation: '',
          choiceKv1StationCode: '',
          choiceKv2StationCode: '',
          choiceKv3StationCode: '',
          choiceKv4StationCode: '',
          choiceKv5StationCode: '',
          choiceKv1UdiseNamePresentStation: '',
          choiceKv2UdiseNamePresentStation: '',
          choiceKv3UdiseNamePresentStation: '',
          choiceKv4UdiseNamePresentStation: '',
          choiceKv5UdiseNamePresentStation: '',
          choiceKv1StationName: '',
          choiceKv2StationName: '',
          choiceKv3StationName: '',
          choiceKv4StationName: '',
          choiceKv5StationName: '',

          choiceKv1StationCodeUdiseCode1: '',
          choiceKv1StationCodeUdiseCode2: '',
          choiceKv1StationCodeUdiseCode3: '',
          choiceKv2StationCodeUdiseCode1: '',
          choiceKv2StationCodeUdiseCode2: '',
          choiceKv2StationCodeUdiseCode3: '',
          choiceKv3StationCodeUdiseCode1: '',
          choiceKv3StationCodeUdiseCode2: '',
          choiceKv3StationCodeUdiseCode3: '',
          choiceKv4StationCodeUdiseCode1: '',
          choiceKv4StationCodeUdiseCode2: '',
          choiceKv4StationCodeUdiseCode3: '',
          choiceKv5StationCodeUdiseCode1: '',
          choiceKv5StationCodeUdiseCode2: '',
          choiceKv5StationCodeUdiseCode3: '',

          choiceKv1StationCodeUdiseName1: '',
          choiceKv1StationCodeUdiseName2: '',
          choiceKv1StationCodeUdiseName3: '',
          choiceKv2StationCodeUdiseName1: '',
          choiceKv2StationCodeUdiseName2: '',
          choiceKv2StationCodeUdiseName3: '',
          choiceKv3StationCodeUdiseName1: '',
          choiceKv3StationCodeUdiseName2: '',
          choiceKv3StationCodeUdiseName3: '',
          choiceKv4StationCodeUdiseName1: '',
          choiceKv4StationCodeUdiseName2: '',
          choiceKv4StationCodeUdiseName3: '',
          choiceKv5StationCodeUdiseName1: '',
          choiceKv5StationCodeUdiseName2: '',
          choiceKv5StationCodeUdiseName3: '',

        }
      })
    } else if (val == '2') {
      var intraStationCond = {
        "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
        "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
      }
      this.getKvSchoolByStationId(intraStationCond);
      this.showStationChoice18B = true;
      this.showStationChoice18C = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1StationCode: '',
          choiceKv2StationCode: '',
          choiceKv3StationCode: '',
          choiceKv4StationCode: '',
          choiceKv5StationCode: '',

          choiceKv1StationName: '',
          choiceKv2StationName: '',
          choiceKv3StationName: '',
          choiceKv4StationName: '',
          choiceKv5StationName: '',

          choiceKv1StationCodeUdiseCode1: '',
          choiceKv1StationCodeUdiseCode2: '',
          choiceKv1StationCodeUdiseCode3: '',
          choiceKv2StationCodeUdiseCode1: '',
          choiceKv2StationCodeUdiseCode2: '',
          choiceKv2StationCodeUdiseCode3: '',
          choiceKv3StationCodeUdiseCode1: '',
          choiceKv3StationCodeUdiseCode2: '',
          choiceKv3StationCodeUdiseCode3: '',
          choiceKv4StationCodeUdiseCode1: '',
          choiceKv4StationCodeUdiseCode2: '',
          choiceKv4StationCodeUdiseCode3: '',
          choiceKv5StationCodeUdiseCode1: '',
          choiceKv5StationCodeUdiseCode2: '',
          choiceKv5StationCodeUdiseCode3: '',

          choiceKv1StationCodeUdiseName1: '',
          choiceKv1StationCodeUdiseName2: '',
          choiceKv1StationCodeUdiseName3: '',
          choiceKv2StationCodeUdiseName1: '',
          choiceKv2StationCodeUdiseName2: '',
          choiceKv2StationCodeUdiseName3: '',
          choiceKv3StationCodeUdiseName1: '',
          choiceKv3StationCodeUdiseName2: '',
          choiceKv3StationCodeUdiseName3: '',
          choiceKv4StationCodeUdiseName1: '',
          choiceKv4StationCodeUdiseName2: '',
          choiceKv4StationCodeUdiseName3: '',
          choiceKv5StationCodeUdiseName1: '',
          choiceKv5StationCodeUdiseName2: '',
          choiceKv5StationCodeUdiseName3: '',

        }
      })

    } else if (val == '3') {
      this.showStationChoice18C = true;
      this.showStationChoice18B = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1UdiseCodePresentStation: '',
          choiceKv2UdiseCodePresentStation: '',
          choiceKv3UdiseCodePresentStation: '',
          choiceKv4UdiseCodePresentStation: '',
          choiceKv5UdiseCodePresentStation: '',

          choiceKv1UdiseNamePresentStation: '',
          choiceKv2UdiseNamePresentStation: '',
          choiceKv3UdiseNamePresentStation: '',
          choiceKv4UdiseNamePresentStation: '',
          choiceKv5UdiseNamePresentStation: '',
        }
      })

    } else if (val == '0') {
      this.showStationChoice18B = false;
      this.showStationChoice18C = false;
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1UdiseCodePresentStation: '',
          choiceKv2UdiseCodePresentStation: '',
          choiceKv3UdiseCodePresentStation: '',
          choiceKv4UdiseCodePresentStation: '',
          choiceKv5UdiseCodePresentStation: '',
          choiceKv1StationCode: '',
          choiceKv2StationCode: '',
          choiceKv3StationCode: '',
          choiceKv4StationCode: '',
          choiceKv5StationCode: '',
          choiceKv1UdiseNamePresentStation: '',
          choiceKv2UdiseNamePresentStation: '',
          choiceKv3UdiseNamePresentStation: '',
          choiceKv4UdiseNamePresentStation: '',
          choiceKv5UdiseNamePresentStation: '',
          choiceKv1StationName: '',
          choiceKv2StationName: '',
          choiceKv3StationName: '',
          choiceKv4StationName: '',
          choiceKv5StationName: '',

          choiceKv1StationCodeUdiseCode1: '',
          choiceKv1StationCodeUdiseCode2: '',
          choiceKv1StationCodeUdiseCode3: '',
          choiceKv2StationCodeUdiseCode1: '',
          choiceKv2StationCodeUdiseCode2: '',
          choiceKv2StationCodeUdiseCode3: '',
          choiceKv3StationCodeUdiseCode1: '',
          choiceKv3StationCodeUdiseCode2: '',
          choiceKv3StationCodeUdiseCode3: '',
          choiceKv4StationCodeUdiseCode1: '',
          choiceKv4StationCodeUdiseCode2: '',
          choiceKv4StationCodeUdiseCode3: '',
          choiceKv5StationCodeUdiseCode1: '',
          choiceKv5StationCodeUdiseCode2: '',
          choiceKv5StationCodeUdiseCode3: '',

          choiceKv1StationCodeUdiseName1: '',
          choiceKv1StationCodeUdiseName2: '',
          choiceKv1StationCodeUdiseName3: '',
          choiceKv2StationCodeUdiseName1: '',
          choiceKv2StationCodeUdiseName2: '',
          choiceKv2StationCodeUdiseName3: '',
          choiceKv3StationCodeUdiseName1: '',
          choiceKv3StationCodeUdiseName2: '',
          choiceKv3StationCodeUdiseName3: '',
          choiceKv4StationCodeUdiseName1: '',
          choiceKv4StationCodeUdiseName2: '',
          choiceKv4StationCodeUdiseName3: '',
          choiceKv5StationCodeUdiseName1: '',
          choiceKv5StationCodeUdiseName2: '',
          choiceKv5StationCodeUdiseName3: '',
        }
      })
    }
  }

  show18B(event) {
    var intraStationCond = {
      "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
      "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
    }
    this.getKvSchoolByStationId(intraStationCond);
    if (event.target.checked) {
      this.show18BOption = true;
    } else if (!event.target.checked) {
      this.show18BOption = false;
    }
  }

  show18C(event) {
    if (event.target.checked) {
      this.show18COption = true;
    } else if (!event.target.checked) {
      this.show18COption = false;
    }
  }

  getKvSchoolByStationId(val) {
    this.outSideService.fetchIntraStationSchool(val).subscribe((res) => {
      this.kvSchoolList = res.response.rowValue;
    })
  }

  getKvSchoolByStationIdPreference(event) {
    var str = event.target.value
    var splitted = str.split("-", 2);
    this.outSideService.fetchKvSchoolByStationCode(splitted[0]).subscribe((res) => {

      if (this.position == '1') {
        this.kvSchoolListP1 = res.response;
      } else if (this.position == '2') {
        this.kvSchoolListP2 = res.response;
      } else if (this.position == '3') {
        this.kvSchoolListP3 = res.response;
      } else if (this.position == '4') {
        this.kvSchoolListP4 = res.response;
      } else if (this.position == '5') {
        this.kvSchoolListP5 = res.response;
      }
    })
  }

  schoolPreferenceListByStationCode(finalList) {
    this.outSideService.fetchSchoolPreferenceByStationCode(finalList).subscribe((res) => {
      this.preferenceSchoolList = res.response;
      for (let i = 0; i < this.preferenceSchoolList.length; i++) {
        if (this.preferenceSchoolList[i].key == this.responseData.choiceKv1StationCode) {
          this.kvSchoolListP1 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv2StationCode) {
          this.kvSchoolListP2 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv3StationCode) {
          this.kvSchoolListP3 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv4StationCode) {
          this.kvSchoolListP4 = this.preferenceSchoolList[i].value
        } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv5StationCode) {
          this.kvSchoolListP5 = this.preferenceSchoolList[i].value
        }
      }
    })
  }

  schoolPreference(event, pos) {
    var val = event.target.value
    if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName1: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName2: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName3: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName1: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName2: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName3: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName1: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName2: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName3: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName1: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName2: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName3: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName1: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName2: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName3: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    }
  }

  selectSchool(val) {

    this.position = val;
    this.getKvRegion();
    this.modalService.open(this.selectSchoolModalInterStation, { size: 'lg', backdrop: 'static', keyboard: false })

  }

  resetStationChoices() {
    this.transferForm.patchValue({
      stationChoice: {
        choiceKv1StationCode: '',
        choiceKv2StationCode: '',
        choiceKv3StationCode: '',
        choiceKv4StationCode: '',
        choiceKv5StationCode: '',
        choiceKv1StationName: '',
        choiceKv2StationName: '',
        choiceKv3StationName: '',
        choiceKv4StationName: '',
        choiceKv5StationName: ''
      }
    })
  }

  getKvRegion() {

    var data = {
      "teacherID": this.responseData.teacherId,
      "nerFlag": this.transferForm.value.stationChoice.recruitedSpclDriveNer == '1' ? 'Y' : 'N',
      "dfpFlag": this.transferForm.value.displacementCount.personalStatusDfp == '1' ? 'Y' : 'N',
      "jcmFlag": this.transferForm.value.displacementCount.associationMemberYn == '1' ? 'Y' : 'N',
    }
    this.outSideService.fetchTransferRegion(data).subscribe((res) => {
      this.regionList = res.response;
    })
  }

  getStationByRegionId(event) {
    this.stationList = [];
    this.selectedUdiseCode = '';
    var data = {
      "teacherId": this.responseData.teacherId,
      "regionCode": event.target.value
    }

    this.outSideService.fetchTransferStation(data).subscribe((res) => {
      this.stationList = res.response;
    })
  }


  getStationByRegionIdWithCond(event) {
    var stationByInterCond = {
      "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTER",
      "conditionvalue": [this.responseData.teacherId, event.target.value, event.target.value, this.responseData.teacherId]
    }

    this.outSideService.fetchIntraStationSchool(stationByInterCond).subscribe((res) => {
      this.stationList = res.response.rowValue
    })
  }

  selectSchoolByUdise() {
    var str = this.selectedUdiseCode
    var splitted = str.split("-", 2);
    if (this.position == '1') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1StationCode: '',
            choiceKv1StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1StationName: splitted[1],
            choiceKv1StationCode: splitted[0]
          }
        })
      }

    } else if (this.position == '2') {
      if (this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationCode: '',
            choiceKv2StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationName: splitted[1],
            choiceKv2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '3') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationCode: '',
            choiceKv3StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationName: splitted[1],
            choiceKv3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '4') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationCode: '',
            choiceKv4StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationName: splitted[1],
            choiceKv4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '5') {
      if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationCode: '',
            choiceKv5StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationName: splitted[1],
            choiceKv5StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '191') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement1StationCode: '',
            displacement1StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement1StationName: splitted[1],
            displacement1StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '192') {
      if (this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement2StationCode: '',
            displacement2StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement2StationName: splitted[1],
            displacement2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '193') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement3StationCode: '',
            displacement3StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement3StationName: splitted[1],
            displacement3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '194') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement4StationCode: '',
            displacement4StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement4StationName: splitted[1],
            displacement4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '195') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement5StationCode: '',
            displacement5StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement5StationName: splitted[1],
            displacement5StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '291') {
      if (this.transferForm.value.transferCount.doptStationTwoCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          transferCount: {
            doptStationOneCode: '',
            doptStationOneName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          transferCount: {
            doptStationOneName: splitted[1],
            doptStationOneCode: splitted[0]
          }
        })
      }
    } else if (this.position == '292') {
      if (this.transferForm.value.transferCount.doptStationOneCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          transferCount: {
            doptStationTwoCode: '',
            doptStationTwoName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          transferCount: {
            doptStationTwoName: splitted[1],
            doptStationTwoCode: splitted[0]
          }
        })
      }
    }
  }

  absenceCal() {
    var newCal = (this.totalWorkingDaysF * 1 + this.absence2 * 1)
    var calPoint = Math.floor(newCal / 365);
    var finalCalPoint = calPoint * 2;
    this.transferForm.patchValue({
      displacementCount: {
        actualNumberOfWorkingDays: newCal,
        q1DPt: finalCalPoint < 0 ? 0 : finalCalPoint
      }
    })
  }

  absenceCalTransferCount() {
    var newCal = (this.totalWorkingDaysTC * 1 - (this.absenceTc * 1))
    var calPoint = Math.floor(newCal / 365);
    var finalCalPoint = calPoint * 2;
    this.transferForm.patchValue({
      transferCount: {
        actualNumberOfWorkingTcdays: newCal,
        q1TPt: finalCalPoint
      }
    })
  }

  displacementTotalPoint() {

    var displaceMentTotal = (this.transferForm.value.displacementCount.q1DPt * 1)
      + (this.transferForm.value.displacementCount.q2DPt * 1)
      + (this.transferForm.value.displacementCount.q3DPt * 1)
      + (this.transferForm.value.displacementCount.q10DPt * 1)
      + (this.transferForm.value.displacementCount.q4DPt * 1)
      + (this.transferForm.value.displacementCount.q11DPt * 1)
      + (this.transferForm.value.displacementCount.q5DPt * 1)
      + (this.transferForm.value.displacementCount.q12DPt * 1)
      + (this.transferForm.value.displacementCount.q9DPt * 1)
      + (this.transferForm.value.displacementCount.q13DPt * 1)

    this.transferForm.patchValue({
      displacementCount: {
        totalDisplacementCount: displaceMentTotal
      }
    })
  }

  transferTotalPoint() {
    var transferTotal = this.transferForm.value.transferCount.q1TPt * 1
      + this.transferForm.value.transferCount.q2TPt * 1
      + this.transferForm.value.transferCount.q3TPt * 1
      + this.transferForm.value.transferCount.q4TPt * 1
      + this.transferForm.value.transferCount.q6TPt * 1
      + this.transferForm.value.transferCount.q7TPt * 1
      + this.transferForm.value.transferCount.q8TPt * 1
      + this.transferForm.value.transferCount.q9TPt * 1
      + this.transferForm.value.transferCount.q10TPt * 1

    this.transferForm.patchValue({
      transferCount: {
        totalTransferCount: transferTotal
      }
    })
  }

  personalStatusCheckBox(e, id) {
    if (e.target.checked) {
      if (id == '1') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusLtrDc: '1',
            q4DPt: -50,
            personalStatus: '1',
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '2') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusDfpDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '3') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusMdgDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '4') {
        if (this.transferForm.value.displacementCount.spouseStatus != '' && this.transferForm.value.displacementCount.spouseStatus != null
          && (this.transferForm.value.displacementCount.spouseStatus == '4' || this.transferForm.value.displacementCount.spouseStatus == 4)) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: '5',
              q5DPt: 0
            }
          })
        }
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusWidDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '5') {
        if (this.transferForm.value.displacementCount.spouseStatus != '' && this.transferForm.value.displacementCount.spouseStatus != null
          && (this.transferForm.value.displacementCount.spouseStatus == '4' || this.transferForm.value.displacementCount.spouseStatus == 4)) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: '5',
              q5DPt: 0
            }
          })
        }
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusSpDc: '1',
            personalStatus: '1',
            q4DPt: -50,
            personalStatusDefaultDc: null
          }
        })
      } else if (id == '6') {
        this.transferForm.patchValue({
          displacementCount: {
            personalStatusDefaultDc: '1',
            personalStatus: '1',
            q4DPt: 0,
            personalStatusLtrDc: null,
            personalStatusDfpDc: null,
            personalStatusMdgDc: null,
            personalStatusWidDc: null,
            personalStatusSpDc: null
          }
        })
        this.transferForm.patchValue({
          displacementCount: {
            spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
            q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
              this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
                this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                  this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                    this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                      this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                        this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
                          this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
          }
        })
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusLtrDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusLtrDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }
      } else if (id == '2') {
        if (this.transferForm.value.displacementCount.personalStatusLtrDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDfpDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDfpDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }

      } else if (id == '3') {

        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusMdgDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusMdgDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }

      } else if (id == '4') {
        if (this.transferForm.value.displacementCount.personalStatusSpDc != '1' || this.transferForm.value.displacementCount.personalStatusSpDc != 1) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
              q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
                this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
                  this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                    this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                      this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                        this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                          this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
                            this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
            }
          })
        }
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusLtrDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusWidDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusWidDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }

      } else if (id == '5') {
        if (this.transferForm.value.displacementCount.personalStatusWidDc != '1' || this.transferForm.value.displacementCount.personalStatusWidDc != 1) {
          this.transferForm.patchValue({
            displacementCount: {
              spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
              q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
                this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
                  this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                    this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                      this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                        this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                          this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
                            this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
            }
          })
        }
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusSpDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusSpDc: null,
              personalStatus: '1',
              q4DPt: 0,
              personalStatusDefaultDc: '1'
            }
          })
        }
      }
      else if (id == '6') {
        if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
          || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1'
          || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDefaultDc: null,
              q4DPt: -50
            }
          })
        } else {
          this.transferForm.patchValue({
            displacementCount: {
              personalStatusDefaultDc: '1',
              personalStatus: '1',
              q4DPt: 0
            }
          })
        }
      }
    }
  }


  personalStatusCheckBoxTc(e, id) {
    if (e.target.checked) {
      if (id == '1') {
        this.transferForm.patchValue({
          transferCount: {
            personalStatusLtr: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            // q9TPt: '0',
            // unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
      } else if (id == '2') {
        this.transferForm.patchValue({
          declaration: {
            personalStatusDfpD: '1'
          },
          transferCount: {
            personalStatus: '1',
            personalStatusDfp: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            // q9TPt: '0',
            // unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
        this.dfpGround = true;
      } else if (id == '3') {
        this.transferForm.patchValue({
          declaration: {
            personalStatusMdgD: '1'
          },
          transferCount: {
            personalStatusMdg: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            // q9TPt: '0',
            // unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
        this.gkFilemMedical = true;
      } else if (id == '4') {
        this.transferForm.patchValue({
          transferCount: {
            personalStatusWid: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            q9TPt: '0',
            unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
      } else if (id == '5') {
        this.transferForm.patchValue({
          declaration: {
            personalStatusSpD: '1'
          },
          transferCount: {
            personalStatusSp: '1',
            personalStatus: '1',
            personalStatusDefault: null,
            q6TPt: 50,
            q9TPt: '0',
            unmarriedWomanYn: '0'
          }
        })
        this.transfer5b = false;
        this.spGround = true;
      } else if (id == '6') {
        this.transferForm.patchValue({
          transferCount: {
            personalStatusDefault: '1',
            personalStatus: '1',
            personalStatusLtr: this.disableLTR == true ? '9' : null,
            personalStatusDfp: this.disableDFP == true ? '9' : null,
            personalStatusMdg: this.disableMDG == true ? '9' : null,
            personalStatusWid: this.disableWidow == true ? '9' : null,
            personalStatusSp: this.disableSP == true ? '9' : null,
            q6TPt: 0,
            q9TPt: sessionStorage.getItem('q9TPt'),
            unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
          },
          declaration: {
            personalStatusDfpD: '0',
            personalStatusMdgD: '0',
            personalStatusSpD: '0'
          }
        })

        this.transfer5b = false;
        this.spGround = false;
        this.gkFilemMedical = false;
        this.dfpGround = false;
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusLtr: null,
              q6TPt: 50,
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusLtr: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
      } else if (id == '2') {
        if (this.transferForm.value.transferCount.personalStatusLtr == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            declaration: {
              personalStatusDfpD: '0'
            },
            transferCount: {
              personalStatusDfp: null,
              q6TPt: 50,
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            declaration: {
              personalStatusDfpD: '0'
            },
            transferCount: {
              personalStatusDfp: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
        this.dfpGround = false;

      } else if (id == '3') {

        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            declaration: {
              personalStatusMdgD: '0'
            },
            transferCount: {
              personalStatusMdg: null,
              q6TPt: 50,
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            declaration: {
              personalStatusMdgD: '0'
            },
            transferCount: {
              personalStatusMdg: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
        this.gkFilemMedical = false;

      } else if (id == '4') {
        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusLtr == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusWid: null,
              q6TPt: 50,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusWid: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }

      } else if (id == '5') {
        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1') {
          this.transferForm.patchValue({
            declaration: {
              personalStatusSpD: '0'
            },
            transferCount: {
              personalStatusSp: null,
              q6TPt: 50,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
          this.transfer5b = false;
        } else {
          this.transferForm.patchValue({
            declaration: {
              personalStatusSpD: '0'
            },
            transferCount: {
              personalStatusSp: null,
              personalStatus: '1',
              personalStatusDefault: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
        }
        this.spGround = false;
      }
      else if (id == '6') {

        if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
          || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1'
          || this.transferForm.value.transferCount.personalStatusSp == '1') {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusDefault: null,
              q6TPt: 50,
              q9TPt: '0',
              unmarriedWomanYn: '0'
            }
          })
        } else {
          this.transferForm.patchValue({
            transferCount: {
              personalStatusDefault: '1',
              personalStatus: '1',
              q6TPt: 0,
              q9TPt: sessionStorage.getItem('q9TPt'),
              unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
            }
          })
          this.spGround = false;
          this.dfpGround = false;
          this.gkFilemMedical = false;
        }
      }
    }

    if (this.transferForm.value.transferCount.q6TPt == '0' || this.transferForm.value.transferCount.q6TPt == 0) {
      this.transfer5b = true;
    } else {
      this.transfer5b = false;
    }
  }

  lastTransferBasedYn(event) {
    if (this.transferForm.value.basicDetails.teacherGender == '2') {
      if (event.target.value == '1') {
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: 0,
            unmarriedWomanYn: '4',
            q9TPt: 20

          }
        })

        this.transferTotalPoint();
      } else if (event.target.value == '0') {
        if (this.transferForm.value.transferCount.tpersonalStatusDefault != '1' || this.transferForm.value.transferCount.tpersonalStatusDefault != 1) {
          var data = 50;
        } else {
          data = 0;
        }
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: data,
            unmarriedWomanYn: '0',
            q9TPt: 0
          }
        })

        this.transferTotalPoint();
      }
    } else if (this.transferForm.value.basicDetails.teacherGender == '1') {
      if (event.target.value == '1') {
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: 0

          }
        })

        this.transferTotalPoint();
      } else if (event.target.value == '0') {
        if (this.transferForm.value.transferCount.tpersonalStatusDefault != '1' || this.transferForm.value.transferCount.tpersonalStatusDefault != 1) {
          var data = 50;
        } else {
          data = 0;
        }
        this.transferForm.patchValue({
          transferCount: {
            q6TPt: data
          }
        })

        this.transferTotalPoint();
      }
    }

  }

  lastTransferBasedOnDisablityYn(event) {

    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 0
        }
      })
      this.transferTotalPoint();
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 60
        }
      })
      this.transferTotalPoint();
    }
  }

  transferCount7(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q7TPt: 55
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q7TPt: 0
        }
      })
    }
  }

  transferCount8(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 60
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q8TPt: 0
        }
      })
    }
  }

  transferCount9(event) {

    if (event.target.value == '4') {
      this.transferForm.patchValue({
        transferCount: {
          q9TPt: 20
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q9TPt: 0
        }
      })
    }
  }

  transferCount10(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        transferCount: {
          q10TPt: 25
        }
      })
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        transferCount: {
          q10TPt: 0
        }
      })
    }
  }

  declaration1(event) {
    if (event.target.value == '1') {
      this.gkFilebenefit = true;
    } else if (event.target.value == '0') {
      this.gkFilebenefit = false;
    }
  }

  declaration2(event) {
    if (event.target.value == '1') {
      this.gkFilemMedical = true;
    } else if (event.target.value == '0') {
      this.gkFilemMedical = false;
    }
  }

  declaration6(event) {
    if (event.target.value == '1') {
      this.spGround = true;
    } else if (event.target.value == '0') {
      this.spGround = false;
    }
  }

  declaration3(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        declaration: {
          child_10_12_ynD: '1'
        }
      })
      this.boardExam = true;
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        declaration: {
          child_10_12_ynD: '0'
        }
      })
      this.boardExam = false;
    }
  }

  declaration4(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        declaration: {
          careGiverYnD: '1'
        }
      })
      this.careGiver = true;
    } else if (event.target.value == '0') {
      this.transferForm.patchValue({
        declaration: {
          careGiverYnD: '0'
        }
      })
      this.careGiver = false;
    }
  }

  declaration5(event) {
    if (event.target.value == '1') {

      this.transferForm.patchValue({
        declaration: {
          childDifferentAbleYnD: '1'
        }
      })
      this.abledChild = true;
    } else if (event.target.value == '0') {
      this.abledChild = false;
      this.transferForm.patchValue({
        declaration: {
          childDifferentAbleYnD: '0'
        }
      })
    }
  }

  declaration7(event) {
    if (event.target.value == '1') {
      this.dfpGround = true;
    } else if (event.target.value == '0') {
      this.dfpGround = false;
    }
  }

  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    var data = files.item(0).name
    var splitted = data.split('.', 2)

    if (splitted[1] == 'pdf' || splitted[1] == 'PDF') {
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
        } else if (index == '5') {
          this.enableUploadButton5 = false;
        } else if (index == '6') {
          this.enableUploadButton6 = false;
        } else if (index == '7') {
          this.enableUploadButton7 = false;
        } else if (index == '8') {
          this.enableUploadButton8 = false;
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
        } else if (index == '5') {
          this.enableUploadButton5 = true;
        } else if (index == '6') {
          this.enableUploadButton6 = true;
        } else if (index == '7') {
          this.enableUploadButton7 = true;
        } else if (index == '8') {
          this.enableUploadButton8 = true;
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
      } else if (index == '5') {
        this.enableUploadButton5 = true;
      } else if (index == '6') {
        this.enableUploadButton6 = true;
      } else if (index == '7') {
        this.enableUploadButton7 = true;
      } else if (index == '8') {
        this.enableUploadButton8 = true;
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
      } else if (index == 5) {
        formData.append('filename', "Spouse_Declaration");
      } else if (index == 6) {
        formData.append('filename', "Single_Parent_Declaration");
      } else if (index == 7) {
        formData.append('filename', "DFP_Declaration");
      } else if (index == 8) {
        formData.append('filename', "NJCM_RJCM_Declaration");
      }
      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
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
            if (res[i].docName == 'Spouse_Declaration.pdf') {
              this.deleteDocUpdate5 = false;
            }
            if (res[i].docName == 'Single_Parent_Declaration.pdf') {
              this.deleteDocUpdate6 = false;
            }
            if (res[i].docName == 'DFP_Declaration.pdf') {
              this.deleteDocUpdate7 = false;
            }
            if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
              this.deleteDocUpdate8 = false;
            }
          }
        })

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
        } else if (index == 5) {
          this.deleteDocUpdate5 = false
        } else if (index == 6) {
          this.deleteDocUpdate6 = false
        } else if (index == 7) {
          this.deleteDocUpdate7 = false
        } else if (index == 8) {
          this.deleteDocUpdate8 = false
        }
      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
    this.fileToUpload = null;
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
      this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
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
          if (res[i].docName == 'Spouse_Declaration.pdf') {
            this.deleteDocUpdate5 = false;
          }
          if (res[i].docName == 'Single_Parent_Declaration.pdf') {
            this.deleteDocUpdate6 = false;
          }
          if (res[i].docName == 'DFP_Declaration.pdf') {
            this.deleteDocUpdate7 = false;
          }
          if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
            this.deleteDocUpdate8 = false;
          }
        }
      })
    })
  }

  enableTransferForm(val) {
    if (val == '1') {
      this.enableTransferFormYn = true;
    } else if (val == '0') {
      this.enableTransferFormYn = false;
    }
  }

  stationChoiceSpouse(e, val) {
    if (e.target.checked) {
      if (val == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km1: '1'
          }
        })

      } else if (val == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km2: '1'
          }
        })
      } else if (val == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km3: '1'
          }
        })
      } else if (val == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km4: '1'
          }
        })
      } else if (val == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km5: '1'
          }
        })
      }
    } else if (!e.target.checked) {
      if (val == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km1: null
          }
        })
      } else if (val == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km2: null
          }
        })
      } else if (val == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km3: null
          }
        })
      } else if (val == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km4: null
          }
        })
      } else if (val == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km5: null
          }
        })
      }
    }
  }

  getSubjectByTchTypePdf(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      var subjectList = res.response.rowValue;
      for (let i = 0; i < subjectList.length; i++) {
        if (this.reponseDataForPdf.workExperienceAppointedForSubject == subjectList[i].subject_id) {
          this.reponseDataForPdf.workExperienceAppointedForSubject = subjectList[i].subject_name;
        }

      }
    })
  }

  teacherTransferPdf() {
    this.getProfileImage();
    for (let i = 0; i < this.teacherTypeData.length; i++) {
      if (this.reponseDataForPdf.lastPromotionPositionType == this.teacherTypeData[i].teacherTypeId) {
        this.reponseDataForPdf.lastPromotionPositionType = this.teacherTypeData[i].organizationTeacherTypeName;
        var data = {
          "applicationId": environment.applicationId,
          "teacherTypeId": this.teacherTypeData[i].teacherTypeId
        }
        this.getSubjectByTchTypePdf(data);
      }
    }
    setTimeout(() => {
      this.transferPdfService.teacherTransferFnc(this.reponseDataForPdf, this.kvNameCode, this.stationNameCode, this.teacherExperienceData, this.documentUploadArray, this.imageData);
    }, 500);
  }

  getProfileImage() {
    this.outSideService.getProfileImage(JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name).subscribe((res) => {
      if (res.status == '1' || res.status == '1') {
        this.imageData = "data:image/jpg;base64," + res.data;
      } else if (res.status == '0' || res.status == '0') {
        this.imageData = 'assets/assets/img/download.jpg';
      }
    },
      error => {
        this.imageData = 'assets/assets/img/download.jpg';
      })
  }

  checkForSameSchool(event, index) {
    let checkForZiet:boolean = false;
    for(let i=0; i<this.kvSchoolList.length; i++){
      if(this.responseData.teachingNonTeachingStaff == '1' && this.kvSchoolList[i].udise_sch_code == event.target.value && this.kvSchoolList[i].school_type == '2'){
        checkForZiet = true;
      }
    }

    if(checkForZiet){
      if (index == 1) {        
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1UdiseCodePresentStation: ''
            }
          })        
      } else if (index == 2) {        
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2UdiseCodePresentStation: ''
            }
          })        
      } else if (index == 3) {        
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3UdiseCodePresentStation: ''
            }
          })
      } else if (index == 4) {        
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4UdiseCodePresentStation: ''
            }
          })
      } else if (index == 5) {        
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5UdiseCodePresentStation: ''
            }
          })
      }
      Swal.fire(
        'ZIET school selection not allowed',
        '',
        'error'
      )

    }else{
      if (index == 1) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 2) {
        if (this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 3) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 4) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 5) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5UdiseCodePresentStation: ''
            }
          })
        }
      }
    }   
  }

  restStationSelection(val) {
    if (val == 1) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1StationCode: '',
          choiceKv1StationName: ''
        }
      })
    } else if (val == 2) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv2StationCode: '',
          choiceKv2StationName: ''
        }
      })
    } else if (val == 3) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv3StationCode: '',
          choiceKv3StationName: ''
        }
      })
    } else if (val == 4) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv4StationCode: '',
          choiceKv4StationName: ''
        }
      })
    } else if (val == 5) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv5StationCode: '',
          choiceKv5StationName: ''
        }
      })
    } else if (val == 191) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement1StationName: '',
          displacement1StationCode: ''
        }
      })
    } else if (val == 192) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement2StationName: '',
          displacement2StationCode: ''
        }
      })
    } else if (val == 193) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement3StationName: '',
          displacement3StationCode: ''
        }
      })
    } else if (val == 194) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement4StationName: '',
          displacement4StationCode: ''
        }
      })
    } else if (val == 195) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement5StationName: '',
          displacement5StationCode: ''
        }
      })
    } else if (val == 291) {
      this.transferForm.patchValue({
        transferCount: {
          doptStationOneCode: '',
          doptStationOneName: ''
        }
      })
    } else if (val == 292) {
      this.transferForm.patchValue({
        transferCount: {
          doptStationTwoCode: '',
          doptStationTwoName: ''
        }
      })
    }
  }

  spouseWithin100kmDisp(event) {
    if (event.target.value == '1') {
      this.transferForm.patchValue({
        displacementCount: {
          q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
            this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
              this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
                this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
                  this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
                    this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
                      this.transferForm.value.displacementCount.spouseStatus == '2' ? -20 :
                        this.transferForm.value.displacementCount.spouseStatus == 2 ? -20 : 0,
          spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus
        }
      })
    } else if (event.target.value == '0') {
      if (this.responseData.teacherGender == '1' || this.responseData.teacherGender == '1') {
        this.transferForm.patchValue({
          displacementCount: {
            q5DPt: 0,
            spouseStatusDisplacement: '5'
          }
        })
      } else if (this.responseData.teacherGender == '2' || this.responseData.teacherGender == '2') {
        this.transferForm.patchValue({
          displacementCount: {
            q5DPt: -20,
            spouseStatusDisplacement: '4'
          }
        })
      }

    }
  }


}
