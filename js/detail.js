$(function () {
    window.onload = function () {
        if (getCookie("dataid")) {
            $("#pro-id").attr("product-id", getCookie("dataid"));
        } else {
            alert("没有选取物品");
            $("#pro-id").attr("product-id", "98");
        }
        var $img = {
            0: "../images/59277a369998ac86.jpg",
            1: "../images/bb9c6397a317ac8d.jpg",
            2: "../images/f64cc0beea51ca62.jpg",
            3: "../images/c487fffef6c9ea57.jpg",
            4: "../images/57a145c773443acb.jpg"
        }
        var $name = $("#hd_nickname").html();

        var $proid = $("#pro-id").attr("product-id");



        $(".goodsviewer .left li").on("click", function () {
            $(this).addClass("current").siblings().removeClass("current");
        });

        $(".goodsviewer .left li").mouseenter(function () {
            var index = $(this).index();
            $(".goods-detail-pic img")[0].src = $img[index];
        });
        $(".left ul").mouseleave(function () {
            var index = $(".goodsviewer .left").find(".current").index();
            var aa = $img[index];
            $(".goods-detail-pic img")[0].src = aa;
        });
        $(".hightbox .size a").click(function () {
            $(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
        });
        $(".hightbox .color a").click(function () {
            $(this).addClass("selected").parent().siblings().find("a").removeClass("selected");
        });

        /* 改变数量 */
        $(".increase").click(function () {
            var $val = $("input[name='goods[num]']").val();
            $val++;
            if ($val > 10) {
                $val = 10;
                alert("最多只能买十双");
            }
            $("input[name='goods[num]']").val($val);
            $(".buynums").html($val)
        });
        $(".decrease").click(function () {
            var $val = $("input[name='goods[num]']").val();
            $val--;
            if ($val <= 1) {
                $val = 1;
            }
            $("input[name='goods[num]']").val($val);
            $(".buynums").html($val.toString());
        });
        /* 加入收藏 */
        $(".fav_ul").on("click", function () {
            console.log("click");
            if ($("#logandreg")[0].style.display == "block") {

            } else {
                $(".fav_ul").toggleClass("star-on");
            }
        });
        $(".btn-buy").click(function () {
            var $val = $("input[name='goods[num]']").val();
            var $a = Number($(".cart-num").html()) + Number($val);
            $("#jian").html($a);
            setCookie("gouwuche", $a);
            $("#mini-cart-dialog")[0].style.display = "block";
            /* 关闭结算窗口 */
        })
        $(".dialog-close-btn").click(function () {
            $("#mini-cart-dialog")[0].style.display = "none";

        });

      
        $(".goshop").click(function () {
            var $num = Number($("input[name='goods[num]']").val());
            var $num1 = $num + Number($(".cart-num").html());
            $("#jian").html($num1);
            $("#mini-cart-dialog")[0].style.display = "none";

            $.get("http://47.104.244.134:8080/cartlist.do", { "token": getCookie("token") },
                function (data) {    
                    var count=false;
                 /*    var $gid1="";
                    var $id1="";
                    var $nm1=0; */
                    for (var i in data) {
                        var $gid = data[i]["gid"];
                        var $id = data[i]["id"];
                        var $nm = Number($("input[name='goods[num]']").val());
                        if ($gid == $("#pro-id").attr("product-id")) {
                           /*  $gid1 = $gid;
                            $id1 = $id;
                            $nm1 = $nm; */
                           count=true;
                            break;
                        }
                    }
                    if(count){
                        $.get("http://47.104.244.134:8080/cartupdate.do", { "id": $id, "gid":$gid , "num": $nm, "token": getCookie("token") },
                               function (data) {//在控制台中执行cartupdate.do方法，虽然能执行成功，但是如果购物车中本来没有该物件，执行后查询购物车是不能查询到的
                                   if(data["msg"]!="失败"){
                                   $(".cart-num").html($num1);
                                   }
                               });
                    }else{
                       
                        for(var i=1;i<=$num;i++){
                            $.get("http://47.104.244.134:8080/cartsave.do", { "gid": $("#pro-id").attr("product-id"), "token": getCookie("token") },
                            function (data) {//cartsave.do方法，每次只能加一，而且只要调用就会加上
                                if(data["msg"]!="失败"){    
                                    $(".cart-num").html($num1);
                                    console.log("dd");
                                }
                            });
                        }
                      
                    }

                });
         


        });

    }


});
