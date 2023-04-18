
// window.addEventListener('DOMContentLoaded', event => {

//     // Toggle the side navigation
//     const sidebarToggle = document.body.querySelector('#sidebarToggle');
//     if (sidebarToggle) {
//         // Uncomment Below to persist sidebar toggle between refreshes
//         // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
//         //     document.body.classList.toggle('sb-sidenav-toggled');
//         // }
//         sidebarToggle.addEventListener('click', event => {
//             event.preventDefault();
//             document.body.classList.toggle('sb-sidenav-toggled');
//             localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
//         });
//     }

// });

// document.addEventListener("DOMContentLoaded", function () {
//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 50) {
//             document.getElementById('navbar_top').classList.add('fixed-top');
//             // add padding top to show content behind navbar
//             navbar_height = document.querySelector('.navbar').offsetHeight;
//             document.body.style.paddingTop = navbar_height + 'px';
//         } else {
//             document.getElementById('navbar_top').classList.remove('fixed-top');
//             // remove padding top from body
//             document.body.style.paddingTop = '0';
//         }
//     });
// });

function callMethod() {
    setTimeout(function () {
        $('#example').DataTable();
    }, 500);
}


function getCredential() {
    var authCode = window.location.href.split('=')[1];
    // const data = { 'authcode': authCode, 'authcredential': btoa("teachermodule:pin"),'redirectUrl': 'https://pgi.udiseplus.gov.in/teacher/teacher/profile' }
    // const data = { 'authcode': authCode, 'authcredential': btoa("teachermodule:pin"),'redirectUrl': 'https://kvsdemo.udiseplus.gov.in/teacher/teacher/profile' }
    const data = { 'authcode': authCode, 'authcredential': btoa("teachermodule:pin"),'redirectUrl': 'https://kvsonlinetransfer.kvs.gov.in/teacher/teacher/profile' }
    // const data = { 'authcode': authCode, 'authcredential': btoa("teachermodule:pin"), 'redirectUrl': 'http://10.25.26.10:6200/teacher/profile' }

    $.ajax({
        // url: "http://10.25.26.251:8090/meuser/api/userCradential/get-usercradential",
        url: "https://pgi.udiseplus.gov.in/UserService/api/userCradential/get-usercradential",
        // url: "https://pgi.udiseplus.gov.in/UserService/api/userCradential/get-usercradential",
        // url: "http://kvsonlinetransfer.kvs.gov.in/UserService/api/userCradential/get-usercradential",
        type: 'post',
        async: false,
        contentType: "text/plain",
        data: JSON.stringify(data),
        success: function (res) {
            sessionStorage.setItem("authTeacherDetails", JSON.stringify(res));
        }

    });

    return true;
}

var publcKey;
function getKey() {

    $.ajax({
          url: "https://pgi.udiseplus.gov.in/UserService/api/user/getKey",
        //   url: "https://pgi.udiseplus.gov.in/UserService/api/user/getKey",
        //   url: "http://kvsonlinetransfer.kvs.gov.in/UserService/api/user/getKey",
        // url: "http://10.25.26.251:8090/meuser/api/user/getKey",
        type: "POST",
        cache: false,
        async: false,
        success: function (data) {
            publcKey = data.key




        }
    });
    return publcKey;

}

function changePassword(userId, password, newPassword, confirmPassword) {
    var returnData = "";
    var pk = getKey();
    var encrypt = new JSEncrypt();
    var decrypt = new JSEncrypt();
    encrypt.setPublicKey(pk);
    var a = encrypt.encrypt($("#captchaInput").val());

    var data = { "userId": encrypt.encrypt(userId), "oldPassword": encrypt.encrypt(password), "newPassword": encrypt.encrypt(newPassword), "confirmPassword": encrypt.encrypt(confirmPassword) }



    $.ajax({
          url: "https://pgi.udiseplus.gov.in/UserService/api/user/renamePassword",
        //   url: "https://pgi.udiseplus.gov.in/UserService/api/user/renamePassword",
        //   url: "http://kvsonlinetransfer.kvs.gov.in/UserService/api/user/renamePassword",
        // url: "http://10.25.26.251:8090/meuser/api/user/renamePassword",
        type: "POST",
        async: false,
        contentType: "text/plain; charset=utf-8",

        data: JSON.stringify(data),
        success: function (data) {

            returnData = JSON.stringify(data.message);



        }
    });

    return returnData;
    // })  
}

function getUdiseCode() {
    $.ajax({
        url: "http://10.25.26.10:8090/meuser/api/userCradential/get-usercradential",
        type: 'post',
        async: false,
        contentType: "text/plain",
        data: JSON.stringify(data),
        success: function (res) {
            sessionStorage.setItem("authTeacherDetails", JSON.stringify(res));
        }
    });
}



//old
"use strict";
$(document).ready(function () {
    loadScroller();
});

function loadScroller(data) {
    // var current_fs, next_fs, previous_fs; //fieldsets
    // var opacity;
    // var current = 1;
    // var steps = $("fieldset").length;
    setProgressBar(1);
    // $(".next").unbind().click(function () {
    //     current_fs = $(this).parent();
    //     next_fs = $(this).parent().next();
    //     //Add Class Active
    //     $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //     //show the next fieldset
    //     next_fs.show();
    //     //hide the current fieldset with style
    //     current_fs.animate({ opacity: 0 }, {
    //         step: function (now) {
    //             // for making fielset appear animation
    //             opacity = 1 - now;
    //             current_fs.css({
    //                 'display': 'none',
    //                 'position': 'relative'
    //             });
    //             next_fs.css({ 'opacity': opacity });
    //         },
    //         duration: 500
    //     });
        

    //     setProgressBar(++current);





        
    //     return true
        
    // });
    // $(".previous").click(function () {
    //     current_fs = $(this).parent();
    //     previous_fs = $(this).parent().prev();
    //     //Remove class active
    //     $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    //     //show the previous fieldset
    //     previous_fs.show();
    //     //hide the current fieldset with style
    //     current_fs.animate({ opacity: 0 }, {
    //         step: function (now) {
    //             // for making fielset appear animation
    //             opacity = 1 - now;
    //             current_fs.css({
    //                 'display': 'none',
    //                 'position': 'relative'
    //             });
    //             previous_fs.css({ 'opacity': opacity });
    //         },
    //         duration: 500
    //     });
    //     setProgressBar(--current);
    // });
    // function setProgressBar(curStep) {
    //     var percent = parseFloat(100 / steps) * curStep;
    //     percent = percent.toFixed();
    //     $(".progress-bar")
    //         .css("width", percent + "%");
    // }
    $(".submit").click(function () {
        return false;
    });


    // if(data=="1" || data=="5" ){
    //     setTimeout(()=>{
    //         setAgain();
    //     },1000)
        
    // }
}


function onNextClick(current){
    
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    // var current = 1;
    var steps = $("fieldset").length;
    prevIndex=(+current)-2;
    current_fs = $(".msform").children().eq(prevIndex);
    next_fs = $(".msform").children().eq(current-1);
    // current_fs = $(this).parent();
    // next_fs = $(this).parent().next();



    //Add Class Active
    $("#progressbar").find(".active").removeClass("active");
    for(var i=0;i<current;i++){
        $("#progressbar").find("li").eq(i).addClass("active");
    }
    // $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //show the next fieldset
    next_fs.show();
    // current_fs.hide();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;
            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({ 'opacity': opacity });
        },
        duration: 500
    });

    $(".submit").click(function () {
        return false;
    });

    setProgressBar(current);
    
}

function onPreviousClick(current){

    $("#progressbar").find(".active").removeClass("active");
    for(var i=0;i<current;i++){
        $("#progressbar").find("li").eq(i).addClass("active");
    }

    
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    // var current = 1;
    var steps = $("fieldset").length;
    prevIndex=(+current);
    current_fs = $(".msform").children().eq(prevIndex-1);
    prev_fs = $(".msform").children().eq(current);
    // current_fs = $(this).parent();
    // next_fs = $(this).parent().next();



    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //show the next fieldset
    current_fs.show();
    // current_fs.hide();
    //hide the current fieldset with style
    prev_fs.animate({ opacity: 0 }, {
        step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;
            prev_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            current_fs.css({ 'opacity': opacity });
        },
        duration: 500
    });

    $(".submit").click(function () {
        return false;
    });

    setProgressBar(current);
}




function setAgain(){
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;
    // setProgressBar(current);
    $(".next").click(function () {
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        
        setProgressBar(++current);
        return true
        
    });

    // function setProgressBar(curStep) {
    //     var percent = parseFloat(100 / steps) * curStep;
    //     percent = percent.toFixed();
    //     $(".progress-bar")
    //         .css("width", percent + "%");
    // }
    $(".submit").click(function () {
        return false;
    });

}

function setProgressBar(curStep) {
    var steps = $("fieldset").length;
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
        .css("width", percent + "%");
}




//new

var steps
var current
"use strict";
// $(document).ready(function () {


//     var current_fs, next_fs, previous_fs; //fieldsets
//     var opacity;
//     $(".next").unbind().on("click", function () {
//         event.preventDefault()
//         current_fs = $(this).parent();
//         next_fs = $(this).parent().next();
//         setProgressBar(current);
//         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//         next_fs.show();
//         current_fs.animate({ opacity: 0 }, {
//             step: function (now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 next_fs.css({ 'opacity': opacity });
//             },
//             duration: 500
//         });

//     });
//     $(".previous").on("click", function () {
//         current_fs = $(this).parent();
//         previous_fs = $(this).parent().prev();
//         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
//         previous_fs.show();
//         current_fs.animate({ opacity: 0 }, {
//             step: function (now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 previous_fs.css({ 'opacity': opacity });
//             },
//             duration: 500
//         });
//         setProgressBar(--current);
//     });

//     $(".submit").click(function () {
//         return false;
//     });

// });



// function loadScroller12(step) {
//     current = 1;
//     steps = step;
//     setProgressBar(current);
//     nextClik();
// }

// function nextClickCalled(index) {
//     loadScroller();
//     current = index;
//     setProgressBar(current);
// }

// function nextClik() {
//     var current_fs, next_fs, previous_fs; //fieldsets
//     var opacity;
//     $(".next").on("click", function () {
//         event.preventDefault()
//         current_fs = $(this).parent();
//         next_fs = $(this).parent().next();
//         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//         next_fs.show();
//         setProgressBar(current);
//         current_fs.animate({ opacity: 0 }, {
//             step: function (now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 next_fs.css({ 'opacity': opacity });
//             },
//             duration: 500
//         });

//     });

//     $(".previous").on("click", function () {
//         current_fs = $(this).parent();
//         previous_fs = $(this).parent().prev();
//         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
//         previous_fs.show();
//         setProgressBar(current);
//         current_fs.animate({ opacity: 0 }, {
//             step: function (now) {
//                 opacity = 1 - now;
//                 current_fs.css({
//                     'display': 'none',
//                     'position': 'relative'
//                 });
//                 previous_fs.css({ 'opacity': opacity });
//             },
//             duration: 500
//         });

//     });

// }

// function nextClickCalled(index) {
//     current = index;
//     setProgressBar(current);
// }


"use strict";
$(document).ready(function () {
    owlScroller();
});

function owlScroller() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
}

// function nextTempClick(){
//     $(".next").click();
//     // $(".next").unbind();
// }
