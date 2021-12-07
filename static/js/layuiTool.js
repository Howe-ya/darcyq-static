
lTool = {};

lTool.msg = function(msg){
    return layer.msg(msg);
};

lTool.fail = function(msg){
    return layer.alert(msg, {icon: 5, shade: 0.5,});
};

lTool.failMsg = function(msg){
    return layer.msg(msg, {icon: 5,shade:[0.3,'#000',true]});

};

lTool.ok = function(msg){
    return layer.alert(msg, {icon: 6, shade: 0.5});
};

lTool.okMsg = function(msg){
    return layer.msg(msg, {icon: 6,time: 1500, shade:[0.3,'#000',true]});
};

lTool.okMsgAndFunc = function (msg, callBack) {
    if (isEmptyFunction(callBack)){
        return layer.msg(msg, {icon: 6,time: 1500, shade:[0.3,'#000',true]});
    }
    return layer.msg(msg, {icon: 6,time: 1500, shade:[0.3,'#000',true],end:function () {
            callBack();
        }});
}


lTool.errorMsgAndFunc = function (msg, callBack) {
    if (isEmptyFunction(callBack)){
        return layer.msg(msg, {icon: 2, shade:[0.3,'#000',true]});
    }
    return layer.msg(msg, {icon: 2,shade:[0.3,'#000',true],end:function () {
            callBack();
        }});
}


lTool.alert = function(msg){
    return layer.alert(msg);
};


lTool.load = function(msg){
    return layer.msg((msg || "数据处理中，请等待…"), {
        icon : 16,
        shade : 0.2,
        time: 0//不关闭
    });
};

lTool.confirm = function(msg){
    return layer.msg((msg || "数据处理中，请等待…"), {
        icon : 16,
        shade : 0.2,
        time: 0//不关闭
    });
};

/*
使用：
aaa = function(){
    alert("bbbcc");
};

lTool.confirm("你确定？", aaa);
 */
lTool.confirm = function(msg, callbackFunction){
    return layer.confirm((msg || "您确定要操作吗？"), {
        btn: ["确定", "关闭"] //按钮

    }, function(index, layero){
        callbackFunction();
        layer.close(index);

    }, function(index, layero){
        layer.close(index);
    });
};
lTool.showConfirmAndFunc = function (title, okStr, cancelStr, yesFunction) {
    layer.confirm(title, {
        btn: [okStr, cancelStr]
    }, function () {
        layer.closeAll('dialog');
        yesFunction();
    })
};
lTool.closeAllLayer = function () {
    parent.layer.closeAll();
};
lTool.closeAllLoading = function () {
    layer.closeAll('loading');
};

lTool.error = function(message) {
    layer.msg(message,{icon:2});

},
lTool.warn = function(message) {
    layer.msg(message,{icon:3});

},
lTool.errorTime = function(message, time) {
    layer.msg(message,{icon:2,time:time});
},
//成功弹出层
lTool.success = function(message) {
    layer.msg(message,{icon:1});
},
//成功弹出层
lTool.successAndBack = function(message, url) {
    layer.open({
        content : message,
        icon : 1,
        time: 2000,
        yes : function(){
            location.href = url;
        },
        end: function () {
            location.href = url;
        }
    });
},

// 确认弹出层
lTool.confirm = function(message, url) {
    layer.open({
        content : message,
        icon:3,
        btn : ['是','否'],
        yes : function(){
            location.href=url;
        },
    });
};

//无需跳转到指定页面的确认弹出层
lTool.toConfirm = function(message) {
    layer.open({
        content : message,
        icon:3,
        btn : ['确定'],
    });
};
lTool.showConfirm = function(content,yesFunction){
    layer.open({
        content : content,
        icon:3,
        btn : ['确定'],
    }, yesFunction);
};
lTool.load = function () {
    layer.load(1, {
        shade: [0.1, '#fff']
    });
};

lTool.ajaxPostList = function (url, data, callBack) {
    $.ajax({
        url: url,
        data: {'data':JSON.stringify(data)},
        type: "post",
        //dataType: "json",
        header: {
            'content-type': 'application/json'
        }, //接口json格式
        success: function (data) {
            if (!isEmpty(data.code) && data.code == 10000){
                lTool.okMsgAndFunc(data.msg, callBack);
                /*if (!isEmptyFunction(callBack())){
                    callBack();
                }*/
            }else {
                lTool.error(data.msg);
            }
        },
        error: function (data) {
            lTool.error(data);
        }
    });
}
/**
 *
 * @param url       请求地址
 * @param successFunc  成功后执行拓展函数
 * @param data
 * @param action  0:del 1:save null:无确认弹窗
 */
lTool.postAjax = function (url, data, action, callBack) {
    var loadIndex;
    if (isEmpty(action)){
        $.ajax({
            url: url,
            data: data,
            type: "post",
            header: {
                'content-type': 'application/json'
            },
            beforeSend:function(){
                loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
            },
            complete:function(){
                layer.close(loadIndex);
            },//请求完成的处理
            success: function (data) {
                if (!isEmpty(data.code) && data.code == 10000){
                    lTool.okMsgAndFunc(data.msg, callBack);
                    /*if (!isEmptyFunction(callBack())){
                        callBack();
                    }*/
                }else {
                    lTool.error(data.msg);
                }
            },
            error: function (data) {
                lTool.error(data);
            }
        });
        return;
    }
    var msg = "请确认是否操作"
    switch (action) {
        case 0:
            msg = "请确认是否删除";
            break;
        case 1:
            msg = "请确认信息是否填写完整";
            break;
        case "":
            break;
        default:
            break;
    }
    layer.confirm(msg, function (index) {
        loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
        $.ajax({
            url: url,
            data: data,
            type: "post",
            //dataType: "json",
            header: {
                'content-type': 'application/json'
            },
            beforeSend:function(){
                loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
            },
            complete:function(){
                layer.close(loadIndex);
            },
            success: function (data) {
                if (data.code == 10000){
                    lTool.okMsgAndFunc(data.msg, callBack);
                    /*lTool.success(data.msg);
                    if (!isEmptyFunction(callBack())){
                        callBack();
                    }*/
                }else {
                    lTool.error(data.msg);
                }
            },
            error: function (data) {
                lTool.error(data);
            }
        });
    });
};

/**
 *
 * @param url       请求地址
 * @param successFunc  成功后执行拓展函数
 * @param data
 * @param action  0:del 1:save null:无确认弹窗
 */
lTool.postAjaxTwoFunc = function (url, data, action, callBack, errorBack) {
    var loadIndex;
    if (isEmpty(action)){
        $.ajax({
            url: url,
            data: data,
            type: "post",
            header: {
                'content-type': 'application/json'
            },
            beforeSend:function(){
                loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
            },
            complete:function(){
                layer.close(loadIndex);
            },//请求完成的处理
            success: function (data) {
                if (!isEmpty(data.code) && data.code == 10000){
                    lTool.okMsgAndFunc(data.msg, callBack);
                    /*if (!isEmptyFunction(callBack())){
                        callBack();
                    }*/
                }else {
                    lTool.errorMsgAndFunc(data.msg, errorBack);
                    //lTool.error(data.msg);
                }
            },
            error: function (data) {
                lTool.errorMsgAndFunc(data.msg, callBack);
            }
        });
        return;
    }
    var msg = "请确认是否操作"
    switch (action) {
        case 0:
            msg = "请确认是否删除";
            break;
        case 1:
            msg = "请确认信息是否填写完整";
            break;
        case "":
            break;
        default:
            break;
    }
    layer.confirm(msg, function (index) {
        loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
        $.ajax({
            url: url,
            data: data,
            type: "post",
            //dataType: "json",
            header: {
                'content-type': 'application/json'
            },
            beforeSend:function(){
                loadIndex = layer.load(2, { shade: [0.15, '#ccc'] });
            },
            complete:function(){
                layer.close(loadIndex);
            },
            success: function (data) {
                if (data.code == 10000){
                    lTool.okMsgAndFunc(data.msg, callBack);
                    /*lTool.success(data.msg);
                    if (!isEmptyFunction(callBack())){
                        callBack();
                    }*/
                }else {
                    lTool.error(data.msg);
                }
            },
            error: function (data) {
                lTool.error(data);
            }
        });
    });
};
/**
 * 判断函数体是否为空
 * @param func
 * @returns {boolean}
 */
function isEmptyFunction(func){
    if(typeof func != 'function'){
        console.log('请输入函数')
        return false
    }
    let str = func.toString().replace(/\s+/g,'')
    str = str.match(/{.*}/g)[0]
    return str === '{}'
}

/**
 * 判断数值是否为空
 * @param value
 * @returns {boolean}
 */
function isEmpty(value) {
    return (
        value === null || value === undefined ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    )
}

/**
 * 总页数@param（总条数，每页总条数）
 */
function pageTotal(rowCount, pageSize) {
    if (rowCount == null || rowCount == "") {
        return 0;
    } else {
        if (pageSize != 0 &&
            rowCount % pageSize == 0) {
            return parseInt(rowCount / pageSize);
        }
        if (pageSize != 0 &&
            rowCount % pageSize != 0) {
            return parseInt(rowCount / pageSize) + 1;
        }
    }
}

function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime()/1000);
}

// 计算网站运行时长：2018-11-25 12:00:00
function getDuration(time) {   //dateTimeStamp是一个时间毫秒
    var diff = '';
    var time_diff = new Date().getTime() - time; //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
        diff += days + '天 ';
    }
    //计算出小时数
    var leave1 = time_diff % ( 24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours > 0) {
        diff += hours + '小时 ';
    } else {
        if (diff !== '') {
            diff += hours + '小时 ';
        }
    }
    //计算相差分钟数
    var leave2 =leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes > 0) {
        diff += minutes + '分 ';
    } else {
        if (diff !== '') {
            diff += minutes + '分 ';
        }
    }
    //计算相差秒数
    var leave3 = leave2%(60*1000);
    var seconds = Math.round(leave3/1000)-1;
    if (seconds > 0) {
        diff += seconds + '秒 ';
    } else {
        if (diff !== '') {
            diff += seconds + '秒 ';
        }
    }
    return diff;
}

