layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;
    //search();
    // 操作
    table.on('tool(' + 'egFormTable' + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        var customerId=data.customerId;
        if(obj.event === 'view'){
            view(customerId);
        } else if(obj.event === 'delete'){
            deleteCustomer(customerId);
        } else if(obj.event === 'edit'){
            edit(customerId);
        }
    });
    //查看
    function view(customerId){
        func.open({
            height: 780,
            width: "65%",
            title: '查看客户',
            content:  Feng.ctxPath + "/customer/peopleManageForm?type=view&customerId="+customerId,
            tableId: "peopleManageAdd"
        });
    }
    //删除
    function deleteCustomer(customerId){
        layer.confirm('确定删除此数据？', function(index){
            var data={customerId:customerId}
            var json=objToStr(data);
            $.ajax({
                url:Feng.ctxPath + "/customer/delCustomer",
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
    function edit(customerId){
        func.open({
            height: 780,
            width: "65%",
            title: '编辑客户',
            content:  Feng.ctxPath + "/customer/peopleManageForm?type=edit&customerId="+customerId,
            tableId: "peopleManageAdd",
            closeEnd: function(){
                //location.reload();
                search();
            }
        });
    }


    // 新增
    $('#btnAdd').click(function () {
        func.open({
            height: 780,
            width: "65%",
            title: '新增客户',
            content:  Feng.ctxPath + "/customer/peopleManageForm?type=add",
            tableId: "peopleManageAdd",
            closeEnd: function(){
                //location.reload();
                search();
            }
        });
    });

});
//查询方法
function search(){
    var table = layui.table;
    var queryData = {};
    queryData['name'] = $("#condition").val();
    table.reload("egFormTable",
        {
            url:Feng.ctxPath + '/customer/list',
            where: queryData
        });
}

