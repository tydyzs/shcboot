/**
 * 文件分类id，标签id,是否允许删除
//刷新图片div
*/
var imgObjList={};
function imgRefresh(fileType,id,isDle){
    var delStr="";
    if(checkNull(imgObjList[id+"Obj"])){
        imgObjList[id+"Obj"]=$("#"+id);
    }
    var imgObj=imgObjList[id+"Obj"];
    imgObj.html("");
    imgObj.viewer('destroy');
    var json='{fileType:"'+fileType+'"}';
    var data=getFileInfo(json);
    for(var i=0;i<data.length;i++){
        var fileId=data[i].fileId;
        var fileIdParam="'"+data[i].fileId+"'";
        if(isDle){
            delStr='<div style="width: 20px;height:20px;float: right;">\n' +
                '\t<a href="javascript:void(0)" onclick="deleteFjFile(this,'+fileIdParam+')" \n' +
                '\tstyle="width: 20px;height:20px;float: left;background:url('+Feng.ctxPath+'/assets/common/util/img/f_delete.png) no-repeat;background-size:contain;">\n' +
                '\t</a>\n' +
                '</div>'
        }
        var url=Feng.ctxPath + '/myFileInfo/getFile?fileId='+fileId;
        var str='<li style="width:110px;float: left;margin-right:10px;">' +
            '<img width="90px" height=90px" src="'+url+'">' +
            delStr+
            '</li>';
        imgObj.append($(str));
    }
    //imgObj.viewer('update');
    var viewer=imgObj.data('viewer');
    imgObj.viewer('update');
}
/**
 * 文件分类id，标签id,是否允许删除,是否允许下载,是否提供预览
//刷新文件div（根据各格式文档展示不同图标文件）
*/
//图标对应对象
var fileTypeImgPath={
    file:"/assets/common/util/img/file.png",
    stl:"/assets/common/util/img/stl.png"
}
function fileRefresh(fileType,id,isDel,isDown,isPreview){
    var fileObj=$("#"+id);
    fileObj.html("");
    var delStr="";
    var previewStr="";
    var json='{fileType:"'+fileType+'"}';
    var data=getFileInfo(json);
    for(var i=0;i<data.length;i++){
        var fileId=data[i].fileId;
        var fileName=data[i].fileName;
        var fileSuffix=data[i].fileSuffix;
        var fileIdParam="'"+data[i].fileId+"'";
        fileSuffix=fileSuffix.toLowerCase();
        var fileSuffixParam="'"+fileSuffix+"'";
        var iconPath=fileTypeImgPath[fileSuffix];//获取展示文件的图标路径
        if(isDel){
            delStr='<div title="删除" style="width: 20px;height:20px;float: right;">\n' +
                '\t<a href="javascript:void(0)" onclick="deleteFjFile(this,'+fileIdParam+')" \n' +
                '\tstyle="width: 20px;height:20px;float: left;background:url('+Feng.ctxPath+'/assets/common/util/img/f_delete.png) no-repeat;background-size:contain;">\n' +
                '\t</a>\n' +
                '</div>'
        }
        if(isPreview){
            previewStr='<div title="预览" style="width: 20px;height:20px;float: right;">\n' +
                '\t<a href="javascript:void(0)" onclick="previewFjFile('+fileIdParam+','+fileSuffixParam+')" \n' +
                '\tstyle="width: 20px;height:20px;float: left;background:url('+Feng.ctxPath+'/assets/common/util/img/view.png) no-repeat;background-size:contain;">\n' +
                '\t</a>\n' +
                '</div>'
        }

        if(checkNull(iconPath)){
            iconPath=fileTypeImgPath.file;
        }
        var iconUrl=Feng.ctxPath+iconPath;
        var fileNameStr= '<p width="90px" height=90px" style="">'+fileName+'</p>';
        if(isDown){
            fileNameStr= '<a width="90px" title="下载" height=90px" onclick="downloadFile('+fileIdParam+')" style="cursor:pointer;">'+fileName+'</a>';
        }
        var str='<li style="width:110px;float: left;margin-right:10px;">' +
            '<img width="90px" height=90px"  src="'+iconUrl+'">' +
            fileNameStr +
            delStr+
            previewStr+
            '</li>';
        fileObj.append($(str));
    }
}
//文件下载
function downloadFile(fileId){
    var url=Feng.ctxPath + '/myFileInfo/getFile?fileId='+fileId;
    window.open(url);
}
//文件预览
function previewFjFile(fileId,fileSuffix){
    if(fileSuffix=="stl"){
        var url=Feng.ctxPath + '/model/stlView?fileId='+fileId;
        window.open(url);
    }
}
/**
 * 获取文件数据
 * @param obj
 * @param fileId
 */
function getFileInfo(json){
    var data=[];
    $.ajax({
        url:Feng.ctxPath + "/myFileInfo/queryFileData",
        data:json,
        type:'POST',
        dataType:"json",
        async:false,
        //contentType:'text/json',
        contentType:'application/json',
        success:function(res){
            data=res.data;
        },
        error:function(){
            alert("服务器异常")
        }
    });
    return data;
}


//删除展示的文件
function deleteFjFile(obj,fileId){
    layer.confirm('删除后无法恢复，确认删除此文件？', function(index){
        var data={fileId:fileId};
        var json=objToStr(data);
        $.ajax({
            url:Feng.ctxPath + "/myFileInfo/delFile",
            data:json,
            type:'POST',
            contentType:'application/json',
            dataType:"json",
            success:function(res){
                if(res.state=="0"){
                    $(obj).parent().parent().remove();
                    layer.msg("删除成功！")
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
//删除文件(根据文件分类删除）
function delFileType(fileType){
    var data={fileType:fileType}
    $.ajax({
        url:Feng.ctxPath + "/myFileInfo/delFileType",
        data:data,
        type:'POST',
        dataType:"json",
        success:function(res){
        },
        error:function(){
            alert("删除文件失败")
        }
    });
}
//保存文件(根据文件分类保存）
function saveFileType(fileType){
    var data={"fileType":fileType};
    $.ajax({
        url:Feng.ctxPath + "/myFileInfo/saveFileType",
        data:data,
        type:'POST',
        dataType:"json",
        success:function(res){
        },
        error:function(){
            alert("保存文件失败")
        }
    });
}

