/* /*$.get("http://47.104.244.134:8080/username.do",{"username":$(this).val()},function(data){
						console.log(data);
					});*/

$(function () {

    var phone = /^1[345789]\d{9}$/;
    var email = /^\w+@\w+(\.\w+)+$/;
    var $cartbtn = $(".cart-btn-next06");
    var $tip = $(".valierror");
    var $username = $(".username");
    var $pw = $(".pw");
    var $confirmpw = $(".confirmpw");
    var final = -1;
    var arr = [];
    var $pw = $(".pw").eq(0);
    var $confirmpw = $(".confirmpw").eq(0);
    $("#signupform")[0].onclick = function (e) {
        var eve = e || event;
        var tar = eve.target || eve.srcElement;
        if (tar == $username[0]) {
            if ($username.val() == "邮箱或手机") {
                $username.val("");
            }
            final = 0;
        } else if (tar == $pw[0]) {
            final = 1;
        } else if (tar == $confirmpw[0]) {
            final = 2;
        }
        if (tar == $username[0] || $pw[0] || $confirmpw[0]) {
            arr.push(final);
            if (arr.length > 1) {
                if (arr[arr.length - 1] == arr[arr.length - 2]) {
                    arr.pop();
                }
            }
        }
    }

    $username[0].onblur = function () {
        if (arr[arr.length - 1] == 0) {
            $tip[0].style.display = "block";
            if (!(phone.test($username.val()) || email.test($username.val()))) {

                $tip.css({ "border": "1px solid #E6594E", "color": "#E6594E", "backgroundColor": "#fceae8", "backgroundImage": "url(../images/stop.gif)" });
                $tip.html("");
                $tip.html($username.next().html());
            } else {
                $tip.css({ "border": "1px solid #99D073", "color": "#539A33", "display": "block", "backgroundColor": "#ebf7e3", "backgroundImage": "url(../images/success.gif)" });
                $tip.html("可以使用");
            }
        }
    };
    $pw[0].onblur = function () {
        if (arr[arr.length - 1] == 1) {
            $tip[0].style.display = "block";
            if ($pw.val().length < 4) {

                $tip.css({ "border": "1px solid #E6594E", "color": "#E6594E", "backgroundColor": "#fceae8", "backgroundImage": "url(../images/stop.gif)" });
                $tip.html("");
                $tip.html($pw.next().html());
            } else if ($confirmpw.val() == $pw.val()) {

                $tip.html("可以使用");
                $tip.css({ "border": "1px solid #99D073", "color": "#539A33", "backgroundColor": "#ebf7e3", "backgroundImage": "url(../images/success.gif)" });

            } else {

                $tip.css({ "border": "1px solid #E6594E", "color": "#E6594E", "backgroundColor": "#fceae8", "backgroundImage": "url(../images/stop.gif)" });
                $tip.html("");
                $tip.html($confirmpw.next().html());
            }
        }
    };
    $confirmpw[0].onblur = function () {
        if (arr[arr.length - 1] == 2) {
            $tip[0].style.display = "block";

            if ($pw.val().length == 0 || $confirmpw.val().length < 4 || $confirmpw.val().length >= 4 && $pw.val().length < 4) {

                $tip.css({ "border": "1px solid #E6594E", "color": "#E6594E", "backgroundColor": "#fceae8", "backgroundImage": "url(../images/stop.gif)" });

                $tip.html($pw.next().html());
            } else if ($confirmpw.val() != $pw.val()) {
                $tip.css({ "border": "1px solid #E6594E", "color": "#E6594E", "backgroundColor": "#fceae8", "backgroundImage": "url(../images/stop.gif)" });

                $tip.html($confirmpw.next().html());
            } else {

                $tip.html("可以使用");
                $tip.css({ "border": "1px solid #99D073", "color": "#539A33", "display": "block", "backgroundColor": "#ebf7e3", "backgroundImage": "url(../images/success.gif)" });

            }
        };

    };

    var ranNum = "";
    for (var i = 0; i < 4; i++) {
        var ran = Math.floor(Math.random() * 10);
        ranNum += ran;
    }
    $(".verifyCode .dv").html(ranNum);
    $(".verifyCode a").click(function () {
        var ranNum = "";
        for (var i = 0; i < 4; i++) {
            var ran = Math.floor(Math.random() * 10);
            ranNum += ran;
        }
        $(".verifyCode .dv").html(ranNum);
    });

    $cartbtn[0].onclick = function () {
        var zf = phone.test($username.val()) || email.test($username.val());
        var $pw = $(".pw");
        var $confirmpw = $(".confirmpw");
        var $license = $("#license");
        var $yzm = $("#iptsingup");
        var $dv = $(".dv");
        if ($license.prop("checked") == true && $yzm.val() == $dv.html() && $pw.val() == $confirmpw.val() && zf) {
            $tip.html("可以使用");
            $tip.css({ "border": "1px solid #99D073", "color": "#539A33", "display": "block", "backgroundColor": "#ebf7e3", "backgroundImage": "url(../images/success.gif)" });
            $.get("http://47.104.244.134:8080/username.do", { "username": $username.val() }, function (data) {
                if (data["msg"] != "成功") {
                    var aa = "";
                    if (email.test($username.val())) {
                        aa = $username.val();
                    } else {
                        aa = $username.val() + "@163.com";
                    }
                    $.get("http://47.104.244.134:8080/useremail.do", { "email": aa }, function (data) {
                        if(data["msg"]!="成功"){
                            $.post("http://47.104.244.134:8080/usersave.do", { "username": $username.val(), "password": $pw.val(), email: aa, sex: "男" }, function (data) {
                                //console.log(data);
                               
                               if(data["msg"]!="失败"){location.href="../html/login.html";} 
                            });
                        }
                    });
                   
                } else {
                    console.log(data);//成功代表已经存在本用户名，不能重名
                }

            });

        } else {
            $tip.css({ "border": "1px solid #E6594E", "color": "#E6594E", "backgroundColor": "#fceae8", "backgroundImage": "url(../images/stop.gif)" });
            $tip[0].style.display = "block";
            $tip.html("请按要求填写注册信息");
        }
    }

});