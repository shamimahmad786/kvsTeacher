import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangServiceService } from 'src/app/service/lang-service.service';
import { RouterModule, Routes,Router } from '@angular/router';
@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {

  sh: any = 0;
  isChecked: boolean = true;
  usermobile:any;
  userotp:any;
  loginUserDetails:any;

  defaultLang:any;
  browserLang:any;

  constructor( private langSer: LangServiceService,
    public translate: TranslateService, private router: Router
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

  signIn(){
    
    if(this.sh==0){
      this.loginUserDetails={'user':'','mobile':this.usermobile}
      if(this.userotp==1234){
        
        sessionStorage.setItem('logedInUserDetails',JSON.stringify(this.loginUserDetails));

        
        this.router.navigate(['/teacher']);
      }
      
    }
  }


}
