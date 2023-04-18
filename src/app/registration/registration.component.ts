import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangServiceService } from 'src/app/service/lang-service.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  sh: any = 1;
  isChecked: boolean = true;


  defaultLang:any;
  browserLang:any;

  constructor( private langSer: LangServiceService,
    public translate: TranslateService
    ) {

    this.langSer.selectedLang.subscribe(res=>{
      
      this.defaultLang = res;
    })

    translate.addLangs(['hn','en']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.browserLang = translate.getDefaultLang();
    this.languageChanged();    
    this.langSer.selectedLang.next(this.browserLang);
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|hn/)? browserLang:'en');

   }

  ngOnInit(): void {
  }

  selectedLang(lang){
    this.langSer.selectedLang.next(lang)
    this.translate.use(lang);
    // this.defaultLang = lang;
    

  }

  languageChanged(){
    this.translate.use(this.browserLang.match(/en|hn/)? this.browserLang :'en')
  }

}
