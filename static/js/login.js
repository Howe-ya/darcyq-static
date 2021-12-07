var ctx = "";
var cookies = document.cookie.split(';');
var form = layui.form;
window.onload = function(){
    var username = getCookie("nms_username");
    var password = getCookie("nms_password");
    var remember = getCookie("nms_remember");
    if(remember == '1'){
        if (username != null){
            document.getElementById("userName").value = username;
        }
        if (password != null){
            document.getElementById("password").value = password;
        }
        document.getElementById("remember").checked = true;
    }
};

function getCookie(key){
    for(var i = 0; i < cookies.length; i++){
        var kv = cookies[i].split('=');
        if(kv[0].trim()== key){
            return kv[1].trim();
        }
    }
    return '';
}

//自定义验证规则
form.verify({
    userName: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
        }
        if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
        }
        if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
        }
    }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
    ]
    ,rePassword:function(value){
        if($('input[name=password]').val() !== value)
            return '两次密码输入不一致！';
    }
});

// 登录过期的时候，跳出ifram框架
if (top.location != self.location) top.location = self.location;

$('.bind-password').on('click', function () {
    if ($(this).hasClass('icon-5')) {
        $(this).removeClass('icon-5');
        $("input[name='password']").attr('type', 'password');
    } else {
        $(this).addClass('icon-5');
        $("input[name='password']").attr('type', 'text');
    }
});

$('#refreshCaptcha').on('click', function () {
    $(this).attr('src', timestamp(ctx + "/verifyCode"));
});

$('.icon-nocheck').on('click', function () {
    if ($(this).hasClass('icon-check')) {
        $(this).removeClass('icon-check');
    } else {
        $(this).addClass('icon-check');
    }
});
//为url添加时间戳
function timestamp(url) {
    var getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
        url = url + "&timestamp=" + getTimestamp
    } else {
        url = url + "?timestamp=" + getTimestamp
    }
    return url;
};
/*form.on('submit(form-submit)', function (inputData) {
    console.log("inputData:", inputData);
    $.ajax({
        url: "xxxxx",
        data: {'xxx': xxx, 'xx': xxx},
        type: "post",
        dataType: "json",
        headers: {'Content-Type': 'application/json;charset=utf-8'}, //接口json格式
        success: function (data) {
            console.log(data);
            layer.alert(JSON.stringify(data), {
                title: data
            });
        },
        error: function (data) {
            layer.alert(JSON.stringify(data), {
                title: data
            });
        }
    });
});*/
// 进行登录操作
form.on('submit(login)', function (data) {
    data = data.field;
    if (data.username == '') {
        layer.msg('用户名不能为空');
        return false;
    }
    if (data.password == '') {
        layer.msg('密码不能为空');
        return false;
    }
    if (data.captcha == '') {
        layer.msg('验证码不能为空');
        return false;
    }
    var remember = $("#remember").is(":checked");
    data.remember = remember;
    data.browserName = jutils.getBrowserInfo().name;
    data.browserVersion = jutils.getBrowserInfo().version;
    var loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
    $.ajax({
        url: ctx + "/login",
        data: data,
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == 10000){
                lTool.okMsgAndFunc(data.msg, function () {
                    layer.close(loadIndex);
                    location.href = ctx;
                });
            }else {
                lTool.errorMsgAndFunc(data.msg, function () {
                    layer.close(loadIndex);
                    $("#refreshCaptcha").attr('src', timestamp(ctx + "/verifyCode"));
                });
            }
        },
        error: function (data) {
            lTool.errorMsgAndFunc(data, function () {
                layer.close(loadIndex);
                $("#refreshCaptcha").attr('src', timestamp(ctx + "/verifyCode"));
            });
        }
    });
    return false;
});
document.onkeydown = function(e){
    var ev =document.all ? window.event : e;
    if(ev.keyCode==13) {
        $("#loginBtn").trigger("click");
    }
}
// 进行注册操作
form.on('submit(register)', function (data) {
    data = data.field;
    if (data.username == '') {
        layer.msg('用户名不能为空');
        return false;
    }
    if (data.password == '') {
        layer.msg('密码不能为空');
        return false;
    }
    if (data.rePassword == '') {
        layer.msg('密码不能为空');
        return false;
    }
    if (data.email == '') {
        layer.msg('验证码不能为空');
        return false;
    }
    if (data.captcha == '') {
        layer.msg('验证码不能为空');
        return false;
    }
    /*lTool.postAjaxTwoFunc(ctx + "/register", data, null, function () {
        lTool.successAndBack(data.msg, ctx + '/manager');
    }, function () {
        $(this).attr('src', timestamp(ctx + "/verifyCode"));
    });*/
    var loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
    $.ajax({
        url: ctx + "/register",
        data: data,
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == 10000){
                //layer.close(loadIndex);
                lTool.okMsgAndFunc(data.msg, function () {
                    layer.close(loadIndex);
                    location.href = ctx + '/login';
                });
                //lTool.successAndBack(data.msg, ctx + '/login');
            }else {
                lTool.errorMsgAndFunc(data.msg, function () {
                    layer.close(loadIndex);
                    $("#refreshCaptcha").attr('src', timestamp(ctx + "/verifyCode"));
                });
                //lTool.error(data.msg);
                //$(this).attr('src', timestamp(ctx + "/verifyCode"));
            }
        },
        error: function (data) {
            lTool.errorMsgAndFunc(data, function () {
                layer.close(loadIndex);
                $("#refreshCaptcha").attr('src', timestamp(ctx + "/verifyCode"));
            });
            //layer.close(loadIndex);
            //lTool.error(data);
            //$(this).attr('src', timestamp(ctx + "/verifyCode"));
        }
    });

    return false;
});