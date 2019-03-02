$(function () {
   
        function $bj(index) {
            var index1=10+index;
            console.log(index1);
            $.get("http://47.104.244.134:8080/goodsbytid.do",
                { tid: 13, page: index1, limit: 16 },
                function (data) {
                    var data1 = data["data"];
                    var str = "";
                    for (var i in data1) {
                        var $id = data1[i]["id"];//商品编号
                        var $name = data1[i]["name"];
                        var $picurl = "http:" + data1[i]["picurl"];
                        if ($picurl == "http:") {
                            $picurl = "http://img14.360buyimg.com/n7/s230x230_jfs/t19096/309/1654762601/156092/454f26aa/5ad16775N272af0e3.jpg";
                        }
                        var $price = data1[i]["price"] / 100;
                        
                        str += "<a href='../html/detail.html' data-id='" + $id + "'><dl ><dt><img src='" + $picurl + "' width='230' height='230'></dt><dd><p class='price'>￥" + $price + "</p><p>" + $name + "</p></dd></dl></a>"; 
                    }
                    $("#mainti").html("");
                    $("#mainti").html(str);
                    $("#mainti a").on("click",function(){
                        var $did=$(this).attr("data-id");
                        console.log($did);
                        setCookie("dataid",$did,7);
                    });
                }
            );
        }
        $bj(0);
        var curpage = 0;
        $(".anums span").click(function () {
        
            var $cu=$(this).index();
           
            if ($cu == 0) {
               console.log("上一页");
                curpage--;
              /*   $(".prevpage").addClass("cur");
                $(".nextpage").removeClass("cur"); */
                if (curpage < 0) {
                    curpage = 0;
                }
                $(".anums span").eq(curpage+1).addClass("on")
                .siblings().removeClass("on");
            } else if ($cu == 11) {
                console.log("下一页");
                curpage++;
              /*   $(".nextpage").addClass("cur");
                $(".prevpage").removeClass("cur"); */
                if(curpage==10){
                    curpage=9;
                }
                $(".anums span").eq(curpage+1).addClass("on")
                .siblings().removeClass("on");
                
            } else {
                curpage = $cu - 1;
              /*   $(".prevpage").removeClass("cur");
                $(".nextpage").removeClass("cur"); */
                $(this).addClass("on")
                .siblings().removeClass("on");
            }
         
           
            $bj(curpage);  
        });

       







    
});