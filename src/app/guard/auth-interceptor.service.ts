import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined) {       
        //     if (req.url.indexOf('getProfileImage') !== -1 || req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1 || 
        //     req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1 || req.url.indexOf('resetPassword') !== -1 || req.url.indexOf('create-kvuser') !== -1
        //     || req.url.indexOf('get-usercradential') !== -1 || req.url.indexOf('renamePassword') !== -1 || req.url.indexOf('getKey') !== -1 || req.url.indexOf('translate') !== -1){
        //         if(req.url.indexOf('create-kvuser') !== -1 || req.url.indexOf('resetPassword') !== -1 || req.url.indexOf('renamePassword') !== -1){
        //             const modifiedReq = req.clone(
        //                 {
        //                     setHeaders: {
        //                         'Content-Type': 'text/plain; charset=utf-8'
        //                     }
        //                 });
        //             return next.handle(modifiedReq).pipe(
        //                 (
        //                     catchError((error: HttpErrorResponse) => {
        //                         let msg = '';
        //                         return throwError(error);
        //                     })
        //                 ))
        //         }
        //         return next.handle(req).pipe(
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(msg);
        //                 })
        //             ))
        //     }else{
        //         var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
        //         const modifiedReq = req.clone(
        //             {
        //                 setHeaders: {
        //                     'Authorization': token,
        //                     'Content-Type': 'text/plain; charset=utf-8'
        //                 }
        //             });
        //             return next.handle(modifiedReq).pipe(
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(msg);
        //                 })
        //             ))
        //     }
        // }else{
        //     return next.handle(req).pipe(
        //         (
        //             catchError((error: HttpErrorResponse) => {
        //                 let msg = '';
        //                 return throwError(msg);
        //             })
        //         ))
        // }

        
        if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined) {

            if (req.url.indexOf('getProfileImage') !== -1 || req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1 ||
                req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1 || req.url.indexOf('resetPassword') !== -1 || req.url.indexOf('create-kvuser') !== -1
                || req.url.indexOf('get-usercradential') !== -1 || req.url.indexOf('renamePassword') !== -1 || req.url.indexOf('getKey') !== -1 || req.url.indexOf('translate') !== -1) {

                if ( req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('getProfileImage') !== -1 || req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1
                || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1) {
                    const modifiedReq = req.clone(
                        {
                            setHeaders: {
                                'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
                            }
                        });
                    return next.handle(modifiedReq).pipe(
                        (
                            catchError((error: HttpErrorResponse) => {
                                let msg = '';
                                return throwError(error);
                            })
                        ))
                }

                return next.handle(req).pipe(
                    (
                        catchError((error: HttpErrorResponse) => {
                            let msg = '';
                            return throwError(error);
                        })
                    ))
            } else {
                var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
                // var token = ''
                const modifiedReq = req.clone(
                    {
                        setHeaders: {
                            'Authorization': token,
                            'Content-Type': 'text/plain; charset=utf-8',
                            'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
                        }
                    });

                return next.handle(modifiedReq).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            if (event.body.errorMessage == "User Unauthenticated") {

                                sessionStorage.removeItem('authTeacherDetails')
                                sessionStorage.removeItem('mappingData')
                                sessionStorage.removeItem('shiftYn')
                                sessionStorage.removeItem('shiftAvailable')
                                sessionStorage.removeItem('singleKvTeacher')
                                sessionStorage.removeItem('systemTeacherCode')
                                window.location.href = environment.LOGOUT_URL;
                                alert("User Not Authenticated (Login Again)")
                                return null;
                            }
                        }
                        return event;
                    }),
                    (
                        catchError((error: HttpErrorResponse) => {
                            let msg = '';
                            return throwError(error);
                        })
                    ))
            }
        } else {
            if (req.url.indexOf('translate') !== -1) {
                return next.handle(req);
            } else {

                sessionStorage.removeItem('authTeacherDetails')
                sessionStorage.removeItem('mappingData')
                sessionStorage.removeItem('shiftYn')
                sessionStorage.removeItem('shiftAvailable')
                sessionStorage.removeItem('singleKvTeacher')
                sessionStorage.removeItem('systemTeacherCode')
                window.location.href = environment.LOGOUT_URL;
            }

        }
    }
}