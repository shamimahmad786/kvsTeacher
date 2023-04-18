import { Injectable } from '@angular/core';
import { HttpRequest,HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { SignatureUtilService } from '../services/signature-util.service';
import { environment } from '../../environments/environment';
// import * as CryptoJS from 'crypto-js';
import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth-service.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare function AuthCheck();
@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
    constructor(private router: Router) { 

    }

    authFlag:Boolean=false;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                event = event.clone({body: this.modifyBody(event.body)});
            }
            return event;
        }));
    }

    // intercept(req: HttpRequest, next: HttpHandler): Observable<HttpEvent<any>> {

    //     return next.handle(req).pipe(map((event: HttpEvent<any>) => {
    //         if (event instanceof HttpResponse) {
    //             event = event.clone({body: this.modifyBody(event.body)});
    //         }
    //         return event;
    //     }));

    // }

    private modifyBody(body: any) {
        /*
        * write your logic to modify the body
        * */
    }
}
