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

let theme = sessionStorage.getItem("theme");
    if (!isEmpty(theme)){
        if (_.isEqual(theme, "dark")){
            document.getElementById('themeClass').href='${ctx}/static/css/themes/dark.css';
        }else{
            document.getElementById('themeClass').href='${ctx}/static/css/themes/white.css';
        }
    }
