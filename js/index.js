$(function () {
    var $img = {
        0: "../images/jd1.jpg",
        1: "../images/jd2.jpg",
        2: "../images/jd3.jpg",
        3: "../images/zp.jpg"
    }
    var str = "";
    for (var i in $img) {
        str += "<li><a href=''><img src='" + $img[i] + "' width='1920' height='550' border='0'/></a></li>";
    }
    $(".scroll_cons").html(str);
    var count = 0;
    var timer = setInterval(dd, 2000);
    function dd() {
        var all = $(".scroll_cons").children().length;
        count++;
        if (count == all) {
            count = 0;
        }
        $(".scroll_nav li").eq(count).addClass("on").siblings().removeClass("on");
        $(".scroll_cons li").eq(count).fadeIn()
            .siblings().fadeOut();
    }
    $("#focus").hover(function(){
         clearInterval(timer);
    },function(){
        timer=setInterval(dd,2000);
    });
    $(".scroll_nav li").mouseenter(function () {
        $(this).addClass("on").siblings().removeClass("on");
        var index = $(this).index();
        $(".scroll_cons li").eq(index).fadeIn()
        .siblings().fadeOut();
        count = index;
    });

})