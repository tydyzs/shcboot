layui.use(['table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;
    alert(000)
    // 渲染表格
    var tableResult = table.render({
        elem: '#egFormTable',
        id:'egFormTable',
        url: Feng.ctxPath + '/customer/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: [[
            //{type: 'checkbox'},
            {field: 'formId', align: "center", hide: true, title: '主键id'},
            {field: 'name', align: "center", sort: true, title: '姓名'},
            {field: 'singleTime', align: "center", sort: true, title: '性别', minWidth: 160},
            {field: 'betweenTime', align: "center", sort: true, title: '出生日期', minWidth: 187},
            {field: 'simpleSelect', align: "center", sort: true, title: '年龄'},
            {field: 'fenzuSelect', align: "center", sort: true, title: '生肖（属相）', minWidth: 104},
            {field: 'modules', align: "center", sort: true, title: '电话'},
            {
                align: 'center', templet: function (d) {
                    // var url = d.imgUrl;
                    var url = 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=8&spn=0&di=85250&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3224110779%2C1779790953&os=1366718283%2C723438444&simid=3486849412%2C337995127&adpicid=0&lpn=0&ln=1166&fr=&fmq=1608542579132_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db9999_10000%26sec%3D1608552660591%26di%3Dca21c8b690989d2e031eafbd1d419d94%26imgtype%3D0%26src%3Dhttp%3A%2F%2Fa2.att.hudong.com%2F71%2F56%2F16300000988660128426569668958.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fp7rtwg_z%26e3Bkwthj_z%26e3Bv54AzdH3Ftrw1AzdH3Fwd_08_cm_8mnaaaaalbbmma8db9dmcmlmmblcb_3r2_z%26e3Bip4s&gsm=9&rpstart=0&rpnum=0&islist=&querylist=&force=undefined';
                    return '<img src="' + url + '" class="tdImg" />';
                }, title: '头像', width: 90, unresize: true
            },
            {field: 'fileInputHidden', align: "center", sort: true, title: '星座'},
            {field: 'closeFlag', align: "center", sort: true, title: '是否有房'},
            {field: 'sex', align: "center", sort: true, title: '是否有车'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]]
    });

    // 操作
    table.on('tool(' + 'egFormTable' + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'delete') {
            alert(obj)
            console.log(obj)
        }
    });


    // 新增
    $('#btnAdd').click(function () {
        func.open({
            height: 580,
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