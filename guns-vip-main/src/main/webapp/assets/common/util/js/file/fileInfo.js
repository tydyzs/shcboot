/**
 * 文件分类id，标签id
//刷新图片
*/
function fileRefresh(fileType,id){
    $("#"+id).html("");
    var json='{fileType:"'+fileType+'"}';
    $.ajax({
        url:Feng.ctxPath + "/myFileInfo/queryFileData",
        data:json,
        type:'POST',
        dataType:"json",
        async:false,
        //contentType:'text/json',
        contentType:'application/json',
        success:function(res){
            var data=res.data;
            for(var i=0;i<data.length;i++){
                var fileId=data[i].fileId;
                var url=Feng.ctxPath + '/myFileInfo/getFile?fileId='+fileId;
                var filePath=data[i].filePath;
                filePath="/"+filePath.substring(filePath.lastIndexOf("upload/"))
                var str='<li><img src="'+url+'" style="margin-right:10px;"  width="92px" height="92px"></li>';
                $("#"+id).append(str);
            }
            $('#'+id).viewer();
        },
        error:function(){
            alert("服务器异常")
        }
    });
}
