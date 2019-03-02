$(function () {

    $("#header").load("../html/head.html", function () {
        removeCookie("token");
        var user = 0;
        if (getCookie("name") != undefined) {
            $("#logandreg").css("display", "none");
            var $un = getCookie("name");
            var str = "欢迎您，<a href='../html/login.html' id='hd_nickname' class='cc00 fb'>" + $un + "</a>";
            $("#uname_2904").html(str);
            // $("#uname_2904").css("display", "inline-block");
            $("#memberBar_2904").css("display", "inline-block");
            var $pw = getCookie("pw");
            $.post("http://47.104.244.134:8080/userlogin.do", { "name": $un, "password": $pw },
                function (data) {
                    user = Number(data["data"]["token"]);
                    setCookie("token",user,7);
                    console.log(data);
                    //获取购物车列表
                    $.get("http://47.104.244.134:8080/cartlist.do", { "token": user },
                        function (data) {
                            console.log(data);
                            console.log("jflajf");
                            var dd=0;
                            var arr=[];
                            for(var i in data){
                                if(data[i]["count"]>0){
                                    dd+= data[i]["count"];
                                }
                                arr.push(data[i].gid);
                            }
                           
                                $(".cart-num").html(dd);
                            setCookie("gid",arr,7);

                        });
                });


           
        }


        $("#memberBar_2904").on("click", function () {
            $("#logandreg").css("display", "block");
            $("#uname_2904").css("display", "none");
            $("#memberBar_2904").css("display", "none");
            $(".cart-num").html("0");
            removeCookie("name");
            location.href="../html/index.html";
        })

        $("#name").keyup(() => {
            $(".lx_search").eq(0).css("display", "block");
            var $v = $("#name").val();
            $.ajax({
                type: "post",
                url: "https://suggest.taobao.com/sug?code=utf-8&area=c2c",
                data: {
                    q: $v
                },
                async: false,
                dataType: "jsonp",
                success: function (res) {
                    console.log(res);
                    $(".lx_search div").empty();
                    $.each(res.result, function (i, v) {
                        var $li = $("<a>");
                        $li[0].href = "javascript:;"
                        console.log("i:" + i);
                        $li.html(v[0]);
                        $li.appendTo($(".lx_search  div"));
                    })
                }
            })
        });
        var defKey = $("#default_search_keyword").val().split("|");
        $("#name").on("blur", function () {
            $(".lx_search").css("display", "none");
            var randIndex = Math.floor(Math.random() * defKey.length);
            $("#name").val(defKey[randIndex]);
        });
        $("#name").on("click", function () {
            $(".lx_search").css("display", "none");
            $("#name").val("");
        });
        /* 关闭搜索的信息框，之前忘写了 */

        $(".lx_search i").click(function () {
            $(".lx_search").css("display", "none");
        });

        $(".tnav>a").on("mouseover", function () {
            $(this).addClass("on").siblings().removeClass("on")
                .parent().children().first().addClass("on");
        });

        $("#left_ctl").on("mouseover", function () {
            $(".category-nav").eq(0).css({ visibility: "visible", top: "136px", left: "194px", "zIndex": "999" });
        });
        var ydxie_pop = [
            {
                h3: "运动男鞋",
                backImg: "../images/lf_pop_icon.png",
                posi: "-23px -24px",
                a: "更多",
                p: ["休闲鞋", { a: "训练鞋" }, { a: "帆布鞋" }, "板鞋", "网球鞋"]
            },
            {
                h3: "运动女鞋",
                backImg: "../images/lf_pop_icon.png",
                posi: "-22px -71px",
                a: "更多",
                p: ["休闲鞋", "训练鞋", { a: "健步鞋" }, "帆布鞋", "板鞋"]
            },
            {
                h3: "热搜热词",
                p: ["2017新品", { a: "小白鞋" }, "情侣款", "内增高", { a: "复古鞋" }, "匡威帆布鞋", "三叶草"]
            },
            {
                h3: "热门系列",
                p: ["新百伦574", { a: "air max" }, "三叶草ZX", "All star", { a: "开口笑" }, "boost", "阿甘鞋", { a: "996系列" }, "彪马休闲鞋", "匡威CONS", "ROSHERUN"]
            }
        ];

        for (var i = 0; i < ydxie_pop.length; i++) {
            var ydxieh = "";
            var div = document.createElement("div");
            if (ydxie_pop[i]['backImg']) {
                ydxieh += "<a href='#' target='_blank' style='background:url(" + ydxie_pop[i]['backImg'] + ") no-repeat;padding-left:45px;background-position:" + ydxie_pop[i]['posi'] + "'>" + ydxie_pop[i]['h3'] + "</a>";
            } else {
                ydxieh += "<a href='#' target='_blank') no-repeat'>" + ydxie_pop[i]['h3'] + "</a>";
            }
            if (ydxie_pop[i]["a"]) {
                ydxieh += "<a href='#' target='_blank' class='category-more'>更多</a>";
            }
            var h3 = document.createElement("h3");
            h3.className = "category-title category-ydnx";
            $(h3).html(ydxieh);
            console.log(ydxieh);
            div.appendChild(h3);
            var p = document.createElement("p");
            p.className = "category-label-list";
            var a = "";
            for (var j = 0; j < ydxie_pop[i].p.length; j++) {
                var oA = "";
                if (ydxie_pop[i].p[j]["a"]) {
                    var zz = ydxie_pop[i].p[j]['a'];
                    oA = "<a href='#' target='_blank' class='highlight'>" + ydxie_pop[i].p[j]['a'] + "</a>";
                } else {
                    oA = "<a href='#' target='_blank'>" + ydxie_pop[i].p[j] + "</a>";
                }
                a += oA;
            }
            p.innerHTML = a;
            div.appendChild(p);

            $("#cat_ydxie_pop .erzi")[0].appendChild(div);
            $("#cat_ydfu_pop .erzi")[0].appendChild(div.cloneNode(true));
            $("#cat_paobu_pop .erzi")[0].appendChild(div.cloneNode(true));
            $("#cat_lanqiu_pop .erzi")[0].appendChild(div.cloneNode(true));
            $("#cat_zuqiu_pop .erzi")[0].appendChild(div.cloneNode(true));
            $("#cat_baobao_pop .erzi")[0].appendChild(div.cloneNode(true));
            $("#cat_huwai_pop .erzi")[0].appendChild(div.cloneNode(true));
            $("#cat_nannvxie_pop .erzi")[0].appendChild($(div).clone(true)[0]);
            $("#cat_ertong_pop .erzi")[0].appendChild($(div).clone(true)[0]);
        }

        $(".first").on("mouseover", function () {
            $(".category-nav").css({ "visibility": "hidden" });
            $(".category-pannel").css({ "display": "none", zIndex: -9 });
            $(".wnav_pop").css({ "visibility": "hidden" });
        });
        $(".category-nav").mouseleave(function (e) {
            var eve = e || event;
            if (eve.pageX < $(this)[0].offsetLeft) {
                $(this).css({ "visibility": "hidden" });
                $(".category-pannel").css({ "display": "none", zIndex: -9 });
            }
        });
        $(".category-nav .menu-nav-container li").mouseenter(function () {
            $(".category-pannel").css({ "display": "none", zIndex: -9 });
            var lf = $(".category-nav").offset().left + $(".category-nav").outerWidth();
            $(".category-pannel").eq($(this).index()).css({ display: "block", zIndex: 999, left: lf + "px", top: "137px" })
                .siblings().find(".category-pannel").css({ "display": "none", zIndex: -9 });
        });
        $(".category-nav .menu-nav-container li").mouseleave(function (e) {
            var index = $(this).index();
            var eve = e || event;

            $(".category-pannel").eq($(this).index()).hover(function () {
                var lf = $(".category-nav").offset().left + $(".category-nav").outerWidth();
                $(".category-pannel").eq(index).css({ display: "block", zIndex: 999, left: lf + "px", top: "137px" })
                    .siblings().find(".category-pannel").css({ "display": "none", zIndex: -9 });
            }, function (e) {
                var aa = hid(this, e);
                switch (aa) {
                    case 1:
                    case 2:
                    case 3:
                        $(".category-nav").css({ "visibility": "hidden" });
                        $(this).css({ "display": "none", zIndex: -9 });
                        break;
                }
            });
        });
        $(".category-nav").mouseleave(function (e) {
            var aa = hid(this, e);
            switch (aa) {
                case 3:
                case 4:
                    $(this).css({ "visibility": "hidden" });
                    $(".category-pannel").css({ "display": "none", zIndex: -9 });
                    break;
            }
        });
        $("#left_ctl").on("mouseleave", function (e) {
            var aa = hid(this, e);
            switch (aa) {
                case 3: break;
                default:
                    $(".category-nav").css({ "visibility": "hidden" });
                    $(".category-pannel").css({ "display": "none", zIndex: -9 });
                    break;
            }
        });
        function hid(thisO, e) {
            var e = e || event;
            var disT = $(thisO).offset().top;
            var disB = disT + $(thisO).outerHeight();
            var disL = $(thisO).offset().left;//zuo offset相对于页面，position相对于定位父级，若都没有定位，定位父级会到HTML，不是body，这个和js中offsetParent不一样，那个是到body
            var disR = disL + $(thisO).outerWidth();//you outerWidth既包括自身width、padding又包括border， innerWidth包括padding和自身width
            var dirL = Math.abs(e.pageX - disL);
            var dirR = Math.abs(e.pageX - disR);
            var dirT = Math.abs(e.pageY - disT);
            var dirB = Math.abs(e.pageY - disB);
            var dir = Math.min(dirL, dirR, dirT, dirB);
            switch (dir) {
                case dirT: return 1;
                case dirR: return 2;
                case dirB: return 3;
                case dirL: return 4;
            }
        }
        $(".sport").hover(function () {
            var index = $(this).index() - 1;
            var lf = $(this).offset().left;
            $(".wnav_pop").css({ "visibility": "hidden" });
            $(".wnav_pop").eq(index).css({ "visibility": "visible", "zIndex": 999, top: 137, left: lf + "px" })
                .siblings().find(".wnav_pop").css({ "visibility": "hidden" })
                .end().end().on("mouseleave", function (e) {
                    var aa = hid(this, e);
                    var eve = e || event;
                    switch (aa) {
                        case 1:
                            if ($(this).offset().left + 92 <= eve.pageX) {
                                $(".wnav_pop").eq(index).css({ "visibility": "hidden" });
                            }


                            break;
                        default:
                            $(".wnav_pop").eq(index).css({ "visibility": "hidden" });
                            break;
                    }
                });;
        }, function (e) {
            var index = $(this).index() - 1;
            var aa = hid(this, e);
            switch (aa) {
                case 3: break;
                default:
                    $(".wnav_pop").eq(index).css({ "visibility": "hidden" });
                    break;
            }
        });

        /* 回到顶部块*/
        $("#quiet>div").on("mouseover", function () {
            $(this).addClass("on")
                .siblings().removeClass("on")
                .parent().find("div:first").addClass("on");
        });
        $("#quiet>div").on("mouseleave", function () {
            $(this).removeClass("on");
        });
        $(window).scroll(function () {
            var $top = $(this).scrollTop();
            if ($top > 0) {
                $(".backtop").css("display", "block");
            } else {
                $(".backtop").css("display", "none");
            }
        });
        $(".backtop").click(function () {
            $(window).scrollTop(0);
        })
    })

});
