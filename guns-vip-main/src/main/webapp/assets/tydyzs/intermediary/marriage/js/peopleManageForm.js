/**
 * 详情对话框
 */
var EgFormInfoDlg = {
    data: {
        title: "",
        singleTime: "",
        beginTime: "",
        endTime: "",
        multiSelect: "",
        pictureOne: "",
        number: "",
        singleSelectOne: "",
        singleSelectTwo: "",
        pictureTwo: "",
        longText: ""
    }
};

layui.use(['form', 'admin', 'ax', 'upload', 'laydate', 'selectPlus'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var upload = layui.upload;
    var laydate = layui.laydate;
    var selectPlus = layui.selectPlus;

    //初始化时间选择器
    laydate.render({
        elem: '#birthdate'
        ,trigger:'click'
        ,done: function(value, date, endDate){
            dateChange(value,date)
        }
    });

    //上传文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/system/upload'
        , accept: 'file'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $("#fileNameTip").html(file.name);
            });
        }
        , done: function (res) {
            $("#fileInputHidden").val(res.data.fileId);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传图片失败！");
        }
    });

    //普通图片上传
    upload.render({
        elem: '#picBtn'
        , url: Feng.ctxPath + '/system/upload'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $('#img1').attr('src', result);
            });
        }
        , done: function (res) {
            $("#pictureInputHidden").val(res.data.fileId);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传图片失败！");
        }
    });
});
//jq代码
var type="";
$(function(){
    type=getUrlParam("type");
});
//关闭窗口
function closeWindow(){
    var index=parent.layer.getFrameIndex(window.name); //获取当前窗口的name
    parent.layer.close(index);
}
//保存
function saveData(){
    var form = layui.form;
    //校验
    form.on('submit(formDemo)', function(data){
        save(data.field);
        return false;
    });
}
function save(data){
    var form = layui.form;
    var data1 = form.val("egFormForm");
    console.log(data1);return;
    var params={userName:"123"};
    var json=JSON.stringify(params);
    $.ajax({
        url:Feng.ctxPath + "/customer/getdata",
        data:json,
        type:'POST',
        dataType:"json",
        contentType:'application/json',
        success:function(text){
            console.log(text);
        },
        error:function(){
            alert("服务器异常")
        }
    });
}
