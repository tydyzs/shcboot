layuiForm=layui.form;
var layuiUpload={};
layui.use(['form', 'admin', 'ax', 'upload', 'laydate', 'selectPlus'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var admin = layui.admin;
    var upload = layui.upload;
    var laydate = layui.laydate;
    layuiUpload = layui.laydate;
    var selectPlus = layui.selectPlus;
    layuiForm=layui.form;
    init();
    //初始化函数
    function init(){
        //模型类型
        setDictSlelct("modelType","modelType");
        if(formType!="add"){//查看或编辑时先设置数据
            setFormData();
        }else{
            //新增时给市区默认值
            modelFile="modelFile-"+getUuid();
        }
        if(formType=="view"){
            disabledForm();
        }
        if(formType=="edit"){

        }
        var id=setTimeout(function(){
            layuiForm.render();
        },500);
    }
    //layui禁用表单
    function disabledForm(){
        var formObj = layuiForm.val("egFormForm");
        for(var name in formObj){//遍历json
            //alert(i+"="+formObj[i]);
            $("#"+name).addClass("layui-disabled");
            $("#"+name).attr('disabled', 'disabled');
            $("#fileBtn").remove();
            $("#saveButton").remove();
            $("#titleUpload").remove();
        }
        layuiForm.render();
    }


    //上传文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/myFileInfo/upload?fileType='+modelFile
        , accept: 'file'
        ,exts: 'stl'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $("#fileNameTip").html(file.name);
            });
        }
        , done: function (res) {
            fileRefresh(modelFile,"modelFile",isDel);
            Feng.success(res.message);
        }
        , error: function () {
            Feng.error("上传模型失败！");
        }
    });
});
/////////////////////////////////////////////////////////静态函数区域
//保存
function saveData(){
    //校验
    layuiForm.on('submit(formDemo)', function(data){
        save(data.field);
        return false;
    });
}
//保存数据
function save(data){
    data.modelId=modelId;
    data.modelFile=modelFile;
    var json=JSON.stringify(data);
    $.ajax({
        url:Feng.ctxPath + "/model/saveData",
        data:json,
        type:'POST',
        dataType:"json",
        contentType:'application/json',
        success:function(res){
            if(res.state=="0"){
                layer.alert(res.msg,function(){
                    saveFileType(modelFile);
                    closeWindow();
                });
            }else{
                alert("保存失败！")
            }
        },
        error:function(){
            alert("服务器异常")
        }
    });
}
//获取表单数据
function setFormData(){
    var data={modelId:modelId};
    var json=JSON.stringify(data);
    $.ajax({
        url:Feng.ctxPath + "/model/getModel",
        data:json,
        type:'POST',
        dataType:"json",
        async:false,
        contentType:'application/json',
        success:function(res){
            if(res.state=="0"){
                var data=res.data;
                layuiForm.val('egFormForm',data);
                layuiForm.render();
                modelFile=data.modelFile;
                fileRefresh(modelFile,"modelFile",isDel);
                //console.log(data)
            }else{
                alert("查询失败！")
            }
        },
        error:function(){
            alert("服务器异常")
        }
    });
}