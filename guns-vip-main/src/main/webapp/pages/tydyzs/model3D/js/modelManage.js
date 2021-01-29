var layuiForm={};
layui.use(['form','table', 'admin', 'ax', 'func','selectPlus'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;
    layuiForm=layui.form;
    initCity();
    //初始化函数
    function initCity(){
        var id=setTimeout(function(){
            layuiForm.render();
        },500);
    }

    // 操作
    table.on('tool(' + 'egFormTable' + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        var modelId=data.modelId;
        if(obj.event === 'view'){
            view(modelId);
        } else if(obj.event === 'delete'){
            deletemodel(modelId);
        } else if(obj.event === 'edit'){
            edit(modelId);
        }
    });
    //查看
    function view(modelId){
        func.open({
            height: 810,
            width: "65%",
            title: '查看客户',
            maxmin:true,
            content:  Feng.ctxPath + "/model/modelManageForm.html?type=view&modelId="+modelId,
            tableId: "modelAdd"
        });
    }
    //删除
    function deletemodel(modelId){
        layer.confirm('确定删除此数据？', function(index){
            var data={modelId:modelId}
            var json=objToStr(data);
            $.ajax({
                url:Feng.ctxPath + "/model/delmodel",
                data:json,
                type:'POST',
                contentType:'application/json',
                dataType:"json",
                success:function(res){
                    if(res.state=="0"){
                        layer.msg("删除成功！")
                        search();
                    }else{
                        alert("删除失败！")
                    }
                },
                error:function(){
                    alert("服务器异常")
                }
            });
        });
    }
    //编辑
    function edit(modelId){
        func.open({
            height: 810,
            width: "65%",
            title: '编辑客户',
            maxmin:true,
            content:  Feng.ctxPath + "/model/modelManageForm.html?type=edit&modelId="+modelId,
            tableId: "modelAdd",
            closeEnd: function(){
                //location.reload();
                search();
            }
        });
    }


    // 新增
    $('#btnAdd').click(function () {
        func.open({
            height: 460,
            width: "45%",
            title: '新增模型',
            maxmin:true,
            content:  Feng.ctxPath + "/model/modelManageForm?type=add",
            tableId: "modelAdd",
            closeEnd: function(){
                //location.reload();
                search();
            }
        });
    });

});
//查询方法
function search(){
    var queryData = {};
    var sex = getQueryParam("modelType");
    queryData.modelType=modelType;
    queryData['name'] = $("#condition").val();
    var table = layui.table;
    table.reload("egFormTable",
        {
            url:Feng.ctxPath + '/model/list',
            where: queryData
        });
}
$(function(){
    init();
});
//初始化条件字典
function init(){
    ajaxMethodDict("modelType",$('#modelType'));
}