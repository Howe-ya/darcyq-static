var ctx = "";
var defaultImage = "";
function generateArticleHtml(data1) {
    var html = '';
    for (var i = 0; i < data1.length; i++) {
        html += '<div class="layui-row darcyq-margin-top-bottom-x2">';
        html += '<div class="layui-card darcyq-card-opacity darcyq-sidebar-card darcyq-article-card">';
        //html += '<div class="layui-card-header">';
        html += '<div class="layui-card-body">';
        html += '<span class="darcyq-article-category" style="background: '+ data1[i].colorVal +'">' + data1[i].cateTitle + '</span>';
        html += '<div class="layui-row">';
        html += '<div class="layui-col-md9">';
        html += '<div class="layui-row">'

        html += '<a class="darcyq-article-title" href='+ ctx +'"/article/' + data1[i]["id"] + '"><span>' + data1[i]["title"] + '</span></a>';
        html += '</div>'
        html += '<div class="layui-row darcyq-article-summary">'
        html += '<a href='+ ctx +'"/article/' + data1[i]["id"] + '">';
        html += data1[i]["summary"] + ' <a href='+ ctx +'"/article/' + data1[i]["id"] + '" target="_blank" class="el-link el-link--default is-underline"><!----><span class="el-link--inner">阅读原文 >></span><!----></a></div>'
        html += '</a>';
        html += '<div class="layui-row">'
        html += '<span class="darcyq-article-tag">';
        var tagLisg = data1[i].tblArticleTagList;
        var colorIndex = 0;
        var colorArray = ['', 'el-tag--success', 'el-tag--info', 'el-tag--warning', 'el-tag--danger'];
        for (var j = 0; j < tagLisg.length; j++) {
            html += '<a href='+ ctx +'"/article/search/tag/'+ tagLisg[j] +'"><span class="el-tag el-tag--light ' + colorArray[colorIndex] + ' tag "><i class="fas fa-hashtag"></i> ' + tagLisg[j] + '</span></a> ';
            colorIndex++;
            if (colorIndex == 4) {
                colorIndex = 0;
            }
        }
        html += '</span>';
        html += '</div>'
        html += '<div class="layui-row darcy-color-gray" >';
        if (isEmpty(data1[i].traffic)){
            data1[i].traffic = 0;
        }
        html += '<span class="darcyq-margin-left-x1 darcyq-small-font-xs"><i class="fab fa-hotjar darcyq-icon-salmon"></i> ' + data1[i].traffic + '</span>';
        if (isEmpty(data1[i].likes)){
            data1[i].likes = 0;
        }
        html += '<span class="darcyq-margin-left-x1 layui-hide-xs "><i class="fas fa-heart darcyq-icon-red"></i> ' + data1[i].likes + '</span>';
        html += '<span class="darcyq-margin-left-x1 layui-hide-xs "><i style="color: Dodgerblue;" class="fas fa-comment-dots "></i> ' + data1[i].commentCount + '</span>';
        html += '<span class="darcyq-article-time darcyq-margin-left-x2 darcyq-small-font-xs">';
        html += '<i class="layui-icon"></i> ';
        html += data1[i].createTime;
        html += '</span>';

        html += '</div>';
        html += '</div>';
        if (!isEmpty(data1[i]["fileUrl"])) {
            html += '<div class="layui-col-md3 " style="height: 100%"><img src="' + data1[i]["fileUrl"] + '" class="darcyq-article-img"></div>';
        } else {
            html += '<div class="layui-col-md3 "><img src="'+ defaultImage +'" class="darcyq-article-img"></div>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

    }
    return html;
}

function getPage() {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'laypage' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total, //数据总数，从服务端得到
            limit: limit,   //每页条数设置
            groups: 5,
            prev: '<i class="fas fa-angle-double-left"></i>',
            next: '<i class="fas fa-angle-double-right"></i>',
            layout: ['prev', 'page', 'next'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                page = obj.curr;  //改变当前页码
                limit = obj.limit;
                //首次不执行
                if (!first) {
                    loadData()  //加载数据
                }
            }
        });
    });
}
