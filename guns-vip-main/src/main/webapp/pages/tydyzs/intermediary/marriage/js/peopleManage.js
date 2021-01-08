layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;
    search();
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
            title: '新增客户',
            content:  Feng.ctxPath + "/customer/peopleManageForm?type=view&customerId="+customerId,
            tableId: "peopleManageAdd"
        });
    }
    //删除
    function deleteCustomer(customerId){
        layer.confirm('真的删除行么', function(index){
            layer.close(index);
        });
    }
    //编辑
    function edit(customerId){
        func.open({
            height: 780,
            width: "65%",
            title: '新增客户',
            content:  Feng.ctxPath + "/customer/peopleManageForm?type=edit&customerId="+customerId,
            tableId: "peopleManageAdd"
        });
    }


    // 新增
    $('#btnAdd').click(function () {
        func.open({
            height: 780,
            width: "65%",
            title: '新增客户',
            content:  Feng.ctxPath + "/customer/peopleManageForm?type=add",
            tableId: "peopleManageAdd"
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



