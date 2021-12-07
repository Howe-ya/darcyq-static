
console.log("static load success")
// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/favicon.ico");
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/favicon.ico");
        document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});


function toggleSidebar(){
        $(".layui-col-md3 .darcyq-sidebar-card").toggle(500, function () {
            if($(".layui-col-md3 .darcyq-sidebar-card").css('display')=='none'){
                $(".layui-container .layui-col-md8").attr("class","layui-col-md12 layui-col-xs12 layui-col-sm12 darcyq-margin-top-bottom-x2");
                return;
            }
        });
        $(".layui-container .layui-col-md8").attr("class","layui-col-md8 layui-col-xs12 layui-col-sm12 darcyq-margin-top-bottom-x2");
    }
    $(function () {
        $(".darcyq-basic-info").mouseover(function(){
            $(".toggle-sidebar-btn").show();
            $(".darcyq-basic-info").mouseout(function(){
                $(".toggle-sidebar-btn").hide();
            });
        });
    });
    $("#showMobileMenu").click(function () {
        $(".darcyq-header-mobile").toggle();
    });
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            if ($('#header-hidden-box').is(':hidden')) {
                return;
            }
            $("#searchBtn").trigger("click");
        }
    }
