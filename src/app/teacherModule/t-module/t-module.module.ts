import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: "./assets/translate/tDashboard/", suffix:".json"},
    {prefix: "./assets/translate/teacherEntryForm/", suffix:".json"},
  ])
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class TModuleModule { }
