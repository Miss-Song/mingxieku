$(function () {
    window.onload = function () {
        $.get("http://47.104.244.134:8080/cartlist.do", { "token": getCookie("token") },
            function (data) {
                var countaall = 0;
                var allpric=0;
                for (var i in data) {
                    if (data[i]["count"] > 0) {
                        countaall += data[i]["count"];
                        var $goods = data[i]["goods"];
                        var $pic = "http:" + $goods["picurl"];
                        var $name = $goods["name"];
                        var $price = $goods["price"] / 100;    
                        var $num = data[i]["count"];
                        allpric+=$price*$num;
                        var $id = data[i]["id"];
                        var $gid = data[i]["gid"];
                        $(".cart_tb_body")[0].innerHTML += "<div class='productlb'><span style='padding:0 0 0 70px;width:18%;background:url(" + $pic + ") no-repeat left center;background-size:50px 50px;'>" + $name + "</span>"
                            + " <span class='price'>" + $price + "</span>"
                            + "<span class='pnum'><t class='ogid' style='display:none'>" + $gid + "</t><t class='oid' style='display:none'>" + $id + "</t><a href='javascript:void(0)' class='numdel'  ></a><i>"
                            + $num + "</i><a href='javascript:void(0)' class='numadd'></a></span>"
                            + "<span id='allprice'>" + $price * $num + "</span>"
                            + "<span class='del'>删除</span></div>";
                    }


                }
                if (countaall == 0) {
                    $(".hid").css("display", "block");
                }
                if (countaall > 0) {
                    $(".cart_tb_foot").css("display", "block");
                    $(".cart_check_info i").html(countaall);
                    $(".cart_check_info .c_total").html(allpric);
                    $(".numdel").click(function () {
                        var b = $(this).next().html();
                        console.log(b);
                        var a = Number(b);
                        if (a <= 1) {
                            a = 1;
                        }
                        $(this).parent().find("i").html(--a);
                        var id = $(this).parent().find(".oid").html();
                        var gid = $(this).parent().find(".ogid").html();
                        var prevpri=$(this).parent().parent().find(".price").html();
                        var gq=$(this).parent().parent().find("#allprice");
                        if (a != 0) {
                            $.get("http://47.104.244.134:8080/cartupdate.do", { "id": id, "gid": gid, "num": -1, "token": getCookie("token") },
                                function (data) {
                                    console.log(data);
                                    if (data["msg"] != "失败") {
                                        var c = Number($(".cart-num").html()) - 1;
                                        $(".cart-num").html(c);
                                        var jg = Number(gq.html())-Number(prevpri);
                                        gq.html(jg);
                                        var ch=Number( $(".cart_check_info i").html()-1);
                                        $(".cart_check_info i").html(ch);
                                        var jg=Number($(".cart_check_info .c_total").html())-Number(prevpri);
                                        $(".cart_check_info .c_total").html(jg);
                                    }
                                });
                        }

                    });
                    $(".numadd").click(function () {
                        var b = $(this).prev().html();
                        console.log(b);
                        var a = Number(b);
                        $(this).parent().find("i").html(++a);
                        var id = $(this).parent().find(".oid").html();
                        var gid = $(this).parent().find(".ogid").html();
                        var prevpri=$(this).parent().parent().find(".price").html();
                        var gq=$(this).parent().parent().find("#allprice");
                        $.get("http://47.104.244.134:8080/cartupdate.do", { "id": id, "gid": gid, "num": 1, "token": getCookie("token") },
                            function (data) {
                                console.log(data);
                                if (data["msg"] != "失败") {
                                    var c = Number($(".cart-num").html()) + 1;
                                    $(".cart-num").html(c);
                                    var jg = Number(gq.html())+Number(prevpri);
                                  
                                   gq.html(jg);
                                    var ch=Number( $(".cart_check_info i").html());
                                    $(".cart_check_info i").html(ch+1);
                                    var jg=Number($(".cart_check_info .c_total").html())+Number(prevpri);
                                    $(".cart_check_info .c_total").html(jg);
                                }
                            });
                    });
                    $(".del").click(function () {
                        var js = Number($(this).parent().find(".pnum").find("i").html());
                        $(this).parent().remove();
                        var id = $(this).parent().find(".oid").html();
                        var gid = $(this).parent().find(".ogid").html();
                        var prevpri=$(this).prev().html();
                        $.get("http://47.104.244.134:8080/cartupdate.do", { "id": id, "gid": gid, "num": 0, "token": getCookie("token") },
                            function (data) {
                                if (data["msg"] != "失败") {
                                    var c = Number($(".cart-num").html()) - js;
                                    $(".cart-num").html(c);
                                    var ch=Number( $(".cart_check_info i").html()-js);
                                    $(".cart_check_info i").html(ch);
                                    var jg=Number($(".cart_check_info .c_total").html()-prevpri);
                                    $(".cart_check_info .c_total").html(jg);
                                    $.get("http://47.104.244.134:8080/cartlist.do", { "token": getCookie("token") },
                                        function (data) {
                                            var all=0;
                                            for(var i in data){
                                                if(data[i].count>0){
                                                    all+=data[i].count;
                                                }
                                            }
                                            if(all==0){
                                                $(".cart_tb_foot").css("display", "none");
                                                $(".hid").css("display", "block");
                                            }
                                        });
                                       
                                          }

                            });

                    });

                }

            });
    }

});