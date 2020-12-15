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


function dateChange(value,date){
    var age=getAge(value)+"岁";
    var zodiac=getZodiac(date.year);
    var constellation=getConstellation(date.month,date.date);
    $("#customerAge").val(age);
    $("#customerZodiac").val(zodiac);
    $("#customerConstellation").val(constellation);
}

function getConstellation(v_month, v_day) {
    v_month = parseInt(v_month, 10)
    v_day = parseInt(v_day, 10);

    if ((v_month == 12 && v_day >= 22)
        || (v_month == 1 && v_day <= 20)) {
        return "魔羯座";
    }
    else if ((v_month == 1 && v_day >= 21)
        || (v_month == 2 && v_day <= 19)) {
        return "水瓶座";
    }
    else if ((v_month == 2 && v_day >= 20)
        || (v_month == 3 && v_day <= 20)) {
        return "双鱼座";
    }
    else if ((v_month == 3 && v_day >= 21)
        || (v_month == 4 && v_day <= 20)) {
        return "白羊座";
    }
    else if ((v_month == 4 && v_day >= 21)
        || (v_month == 5 && v_day <= 21)) {
        return "金牛座";
    }
    else if ((v_month == 5 && v_day >= 22)
        || (v_month == 6 && v_day <= 21)) {
        return "双子座";
    }
    else if ((v_month == 6 && v_day >= 22)
        || (v_month == 7 && v_day <= 22)) {
        return "巨蟹座";
    }
    else if ((v_month == 7 && v_day >= 23)
        || (v_month == 8 && v_day <= 23)) {
        return "狮子座";
    }
    else if ((v_month == 8 && v_day >= 24)
        || (v_month == 9 && v_day <= 23)) {
        return "处女座";
    }
    else if ((v_month == 9 && v_day >= 24)
        || (v_month == 10 && v_day <= 23)) {
        return "天秤座";
    }
    else if ((v_month == 10 && v_day >= 24)
        || (v_month == 11 && v_day <= 22)) {
        return "天蝎座";
    }
    else if ((v_month == 11 && v_day >= 23)
        || (v_month == 12 && v_day <= 21)) {
        return "射手座";
    }
    return "";
}


function getZodiac(year) {
    var year1 = Number(year);
    year1 = year1 % 12;
    switch (year1) {
        case 1:
            return '鸡';
            break;
        case 2:
            return '狗';
            break;
        case 3:
            return '猪';
            break;
        case 4:
            return '鼠';
            break;
        case 5:
            return '牛';
            break;
        case 6:
            return '虎';
            break;
        case 7:
            return '兔';
            break;
        case 8:
            return '龙';
            break;
        case 9:
            return '蛇';
            break;
        case 10:
            return '马';
            break;
        case 11:
            return '羊';
            break;
        case 0:
            return '候';
            break;
    }
}
function getAge(birthday)
{
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime();
    //当前时间 毫秒
    var nowTime = new Date().getTime();
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime-birthDayTime)/31536000000);
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




