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
            modelFile=getUuid();
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
            //单选设置禁用
           $("input[name="+name+" ][type='radio']").attr("disabled","disabled");
            //开关
            //开关禁用
            $("#room").prop("disabled",true);
            $("#vehicle").prop("disabled",true);
            //按钮禁用：
            /*$("#picBtn").attr('disabled', 'disabled');
            $("#picBtn").addClass("layui-disabled");*/
            $("#picBtn").remove();
            $("#saveButton").remove();
        }
        layuiForm.render();
    }


    //上传文件
    upload.render({
        elem: '#fileBtn'
        , url: Feng.ctxPath + '/system/upload?fileType='+modelFile
        , accept: 'file'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $("#fileNameTip").html(file.name);
            });
        }
        , done: function (res) {
            /*$("#fileInputHidden").val(res.data.fileId);
            Feng.success(res.message);*/
            fileRefresh(customPhoto,"customPhoto",isDel);
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
    data.customerId=customerId;
    data.photo=customPhoto;
    var json=JSON.stringify(data);
    $.ajax({
        url:Feng.ctxPath + "/customer/saveData",
        data:json,
        type:'POST',
        dataType:"json",
        contentType:'application/json',
        success:function(res){
            if(res.state=="0"){
                layer.alert(res.msg,function(){
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
    var data={customerId:customerId};
    var json=JSON.stringify(data);
    $.ajax({
        url:Feng.ctxPath + "/customer/getCustomer",
        data:json,
        type:'POST',
        dataType:"json",
        async:false,
        contentType:'application/json',
        success:function(res){
            if(res.state=="0"){
                var data=res.data;
                layuiForm.val('egFormForm',data);
                //获取市区下拉框值
                provinceChange($("#householdProvince").eq(0),"householdCity");
                $("#householdCity").val(data.householdCity);
                provinceChange($("#addressProvince").eq(0),"addressCity");
                $("#addressCity").val(data.addressCity);
                $("#room").prop("checked", data.room=="on");
                $("#vehicle").prop("checked", data.vehicle=="on");
                layuiForm.render();
                customPhoto=data.photo;
                fileRefresh(customPhoto,"customPhoto",isDel);
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