$(function () {
    $("document").ready(function () {

        var ranNum = "";
        for (var i = 0; i < 4; i++) {
            var ran = Math.floor(Math.random() * 10);
            ranNum += ran;
        }
        $(".verifyCode .dv").html(ranNum);
    });
    $(".ht").on("click", function () {
        var ranNum = "";
        for (var i = 0; i < 4; i++) {
            var ran = Math.floor(Math.random() * 10);
            ranNum += ran;
        }
        $(".verifyCode .dv").html(ranNum);
    });
    var $username = $("#in_login");
    var $pw = $("#in_passwd");
    var $conpw = $("#iptlogin");
    var $log = $("#fast_login");
    var $show = $("#valierror");
    $username.on("focus", function () {
        if ($(this).val() == "邮箱/手机/用户名")
            $username.val("");
    })
    $log.on("click", function () {

        if ($(".verifyCode .dv").html() == $conpw.val()) {
            $show.css({ "border": "1px solid #99D073", color: "#539A33","backgroundImage": "url(../images/success.gif)"});

            $show.html("可以使用");
            $.post("http://47.104.244.134:8080/userlogin.do", { "name": $username.val(), "password": $pw.val() }, function (data) {
                if (data["msg"].toLowerCase() != "ok") {
                    $show.css({ border: "1px solid #E6594E", color: "#E6594E", display: "block" });
                    $show.html("用户名或密码有错误，请重新输入");
                    location.href = "../html/login.html";
                } else {
                    if (getCookie("username") != $username.val()) {
                        setCookie("name", $username.val(), 7);
                        setCookie("pw",$pw.val(),7);
                    }
                    location.href = "../html/index.html";
                }
            });
        }
        else {
            $show.css({ border: "1px solid #E6594E", color: "#E6594E", display: "block" ,"backgroundImage": "url(../images/stop.gif)"});
            $show.html("验证码录入错误，请重新输入");
        }
    });

});
