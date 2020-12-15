//一、变量
var nullTips="未找到满足条件的数据！";//数据为空导出提示





//二、方法
//1.生成uuid
function uuid2(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		// rfc4122, version 4 form
		var r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
}
function getUuid(){
	return uuid2().replace(/-/g,"");
}

//2.校验空值
function checkNull(str){
	if(str==""||str=="null"||str==null||str==undefined){
		return true;
	}else{
		return false;
	}
}
//3.1.获取字典数据(list)
function getDictData(parameter){
	var json = nui.encode({dictTypeId:parameter});
	var dictList=[];
	$.ajax({
        url:"com.primeton.components.nui.DictLoader.getDictData.biz.ext",
        type:'POST',
        data:json,
        cache: false,
        async:false,
        contentType:'text/json',
        success:function(text){
           dictList=text.dictList;
        }
    });
	return dictList;
}
//3.1.获取字典数据(obj)
function getDictObj(parameter){
	var dictData=getDictData(parameter);
	var dictObj={};
	for(var i=0;i<dictData.length;i++){
		dictObj[dictData[i].dictID]=dictData[i].dictName;
	}
	return dictObj;
}
//4.获取字典并生成条件
function ajaxMethodDict(parameter,obj){
	var json = nui.encode({dictTypeId:parameter});
	$.ajax({
        url:"com.primeton.components.nui.DictLoader.getDictData.biz.ext",
        type:'POST',
        data:json,
        cache: false,
        async:false,
        contentType:'text/json',
        success:function(text){
           for(var i=0;i<text.dictList.length;i++){
           		obj.append('<dd class="left mr20" value="'+ text.dictList[i].dictID +'">'+ text.dictList[i].dictName +'</dd>');
           };
           initSearch(obj);
        }
    });
}

//带下拉的条件
//获取下级字典
function ajaxMethodDictSelect(json,divId){
	$.ajax({
        url:"com.hse.pub.commonUtil.queryDictAll.biz.ext",
        type:'POST',
        data:json,
        cache: false,
        async:false,
        contentType:'text/json',
        success:function(text){
           var objlist=text.objs;
           if(objlist.length==0){
        	   return;
           }
           divId+="_son";
           var divhtml='<hr class="selectShow"/><dl class="clear addClick selectShow"><dt class="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>'+
        	   			'<div style="width:100%;height:100%;" id="'+divId+'">';
           for(var i=0;i<objlist.length;i++){
        	   divhtml+='<dd onclick="selectXzqy(this)" dictType="'+objlist[i].DICTTYPEID+'" class="left mr20" value="'+ objlist[i].DICTID +'">'+ objlist[i].DICTNAME +'</dd>';
           };
           divhtml+='</div></dl>';
           var divObj=$(divhtml);
           $("#xzqyDl").append(divObj);
        }
    });
}
//重新选择，先删除历史显示
function deleteNext(divId){
	var obj=$("#"+divId);
	var nextObj=obj.parent().nextAll();
	if(nextObj.size()>0){
		nextObj.remove();
	}
}

//5.表格字典列获取字典值
function getDict(row){
	var dictTypeId=row.column.dictTypeId;
	return nui.getDictText(dictTypeId,row.value);
}

/**
 * 6.数据列名转换（驼峰和下划线转换）
 */
//数组对象下划线转驼峰
function dataListToHump(list){
	var listNew=[];
	for(var i=0;i<list.length;i++){
		var dataNew=dataToHump(list[i])
		listNew.push(dataNew);
	}
	return listNew;
}
//对象下划线转驼峰
function dataToHump(data){
	var res={};
	for(var key in data){
		res[toHump(key.toLowerCase())]=data[key]
	}
	return res;
}
//字符串下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}

//7.1.获取当前时间(标准格式2020-10-14 10:23:12)
function getTime(now)
{
	if(checkNull(now)){
		now = new Date();
	}
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //分

    var clock = year + "-";
    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10)
        clock += '0';
    clock += mm + ":";

    if (ss < 10)
        clock += '0';
    clock += ss;
    return clock;
}
//获取日期字符串
function getDateStr(now)
{
	if(checkNull(now)){
		now = new Date();
	}
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var clock = year + "-";
    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day;
    return clock;
}
//7.获取当前时间(无分割符号：20201014101911）
function getTimeNum()
{
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //分

    var clock = year+"" ;
    if(month < 10)
        clock += "0";

    clock += month ;

    if(day < 10)
        clock += "0";

    clock += day;

    if(hh < 10)
        clock += "0";

    clock += hh ;
    if (mm < 10)
        clock += '0';
    clock += mm ;

    if (ss < 10)
        clock += '0';
    clock += ss;
    return clock;
}
//8.获取机构（无orgId则获取当前机构）
function getOrg(orgId){
	var orgData={};
	if(checkNull(orgId)){
		orgId="";
	}
	var json='{"orgId":"'+orgId+'"}';
	$.ajax({
	    url:"com.hse.workmanager.emergencyManage.emergencyResources.getOrg.biz.ext",
	    data:json,
	    type:'POST',
	    contentType:'text/json',
	    async:false,
	    success:function(result){
	    	orgData=result.res.orgData;
	    },
	    error:function(){
	    	nui.alert("服务器异常！");
	    }
	 });
	return orgData;
}
//8.1当前机构是否基层
function checkBasicLeve(){
	var b=false;
	var orgData=getOrg();
	var orgType=orgData.orgtype;
	if(orgType=="p"||orgType=="pd"){
		b=true;
	}
	return b;
}
//8.2基层不显示“本机构，及下级机构”切换功能
function isDepartBtn(){
	if(checkBasicLeve()){
		$("#isDepartBtn").remove();
		this.orgType=null;
	}
}

//9.获取用户数据
function getEmp(empid){
	var userObj={};
	var data={"empid":empid};
	var json=nui.encode(data);
	$.ajax({
        url:"com.hse.workmanager.emergencyManage.emergencyResources.getEmp.biz.ext",
        type:'POST',
        data:json,
        async:false,
        contentType:'text/json',
        success:function(result){
        	userObj=result.res.userObj;
        },
        error:function(){
        	nui.alert("服务器异常！");
        }
     });
	return userObj;
}

//10.删除文件（附件）
function deleteFile(relationid){
	var data={"relationid":relationid};
	var json=nui.encode(data);
	$.ajax({
        url:"com.hse.workmanager.emergencyManage.emergencyResources.deleteFilie.biz.ext",
        type:'POST',
        data:json,
        async:false,
        contentType:'text/json',
        success:function(result){
        },
        error:function(){
        	nui.alert("服务器异常！");
        }
     });
}
//11.删除附件中“x"图片（因为查看时不需要）
function removeImage(groupId){
	var objs=$("#IframeId"+groupId).children().eq(0).children();
	for(var i=0;i<objs.length;i++){
		var obj=objs.eq(i);
		obj.children().eq(2).remove();
	}
}
//12.tab页面
//12.1标签点击时获取属性并打开
function openTab(obj){
	var object=$(obj);
    var param=	{
    "title":object.attr("title"),
    "name":object.attr("name"),
    "menuid":object.attr("menuid"),
    "menuCode":object.attr("menuCode"),
    "showCloseButton":true,
    "url":serverUrl+object.attr("url")};
	openUrl(param);
	object.siblings().attr("class","");
	object.attr("class","active");
}
//12.2根据参数打开
function openUrl(param){
	var currTab = window.parent.mainTabs.getTab(param.title);
	var activeTab={};
	if(currTab){
		activeTab=currTab;
	}else{
		activeTab=window.parent.mainTabs.addTab(param);
	}
	window.parent.mainTabs.activeTab(activeTab);
	//window.parent.mainTabs.reloadTab(currTab);
}
//12.3根据标签名和url打开
function openName(title,url){
    	 var param=	{
    			    "title":title,
    			    "name":title,
    			    "showCloseButton":true,
    			    "url":url};
    	openUrl(param);
}
//12.4关闭tab
function closeTab(title){
	window.parent.mainTabs.removeTab(title);
}

//13.多余按钮弹出
function showAtEl(str){
	str="<span>"+str+"</span>";
	var aList=$(str);
	var num=aList.children().length;
	if(num>2){
		var s='<a id="d" onclick="openButtion(this,)" class="d" style="color:#aaa;" class="d aColorStyle">...</a>';
		aList.append(s);
	}
    return aList.html();
}
function openButtion(obj){
	  var window='<div id="win1" class="nui-window" allowDrag="false" allowDrag="false" style="width:20px;height:100px;">'+
	  '123'+
		  '</div>';
	  $("body").append($(window));nui.parse();
	  var win = mini.get("win1");
	    win.showAtEl(obj, {
	        xAlign: "outleft",
	        yAlign: "below"
	    });
}

//14.生成随机颜色
function getColour(){
	var colour="#";
	var data=['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];
	for(var i=0;i<6;i++){
		var num=Math.random();
		colour+=data[Math.ceil(num*16)-1];
	}
	return colour;
}
//15.关闭当前弹出
function closeWindow() {
	return window.CloseOwnerWindow();
}
//16.根据fileAddress获取文件数据
function getFile(fileAddress){
	var fileList=[];
	var data={relationid:fileAddress};
	var json=nui.encode(data);
	$.ajax({
        url:"com.hse.workmanager.emergencyManage.emergencyReservePlan.getFileData.biz.ext",
        type:'POST',
        data:json,
        async:false,
        contentType:'text/json',
        success:function(result){
        	fileList=result.objs;
        },
        error:function(){
        	nui.alert("服务器异常！");
        }
     });
	return fileList;
}
//17.获取对象数组中某些key的值，范围listString
function getKeyValList(listObj,keyList){
	var resObj={};
	for(var i=0;i<keyList.length;i++){
		resObj[keyList[i]]=[];
	}
	for(var j=0;j<listObj.length;j++){
		var data1=listObj[j];
		for(var key in data1){
			var value=data1[key];
			if(keyList.indexOf(key)!=-1){
				resObj[key].push(value);
			}
		}
	}
	return resObj;
}