$(function () {
    $("#footer").load("../html/foot.html", function () {
        var i = 0;
        var oBannerList=$("#shangfan ul")[0];
        var aList = oBannerList.children;
        var perHeight=aList[0].offsetHeight;
        var timer = setInterval(function () {
            move();
        }, 1000);
        function move() {
            i++;
            //123 123 临界值
            if (i ==  aList.length) {
                $("#shangfan ul")[0].style.top = 0;
                i = 1;
            }
            //321321 临界值
            if (i == -1) {
                oBannerList.style.top = - perHeight * (aList.length - 1) + "px";
                i = aList.length - 2;
            }
            startMove(oBannerList, { "top": -perHeight * i });
        }

        //鼠标移入轮播区域 清除定时器
        $("#shangfan")[0].onmouseenter = function () {
            clearInterval(timer);
        }
        //移出开启
        $("#shangfan")[0].onmouseleave = function () {
            console.log("out");
            timer = setInterval(function () {
                move();
            }, 1000);

        }
       





    });
})