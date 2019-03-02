$(function(){
    $("#head").load("reg-log.html .head",function(){
        console.log("head");
    });
    $("#foot").load("reg-log.html .foot",function(){
    console.log("foot");
    })
})