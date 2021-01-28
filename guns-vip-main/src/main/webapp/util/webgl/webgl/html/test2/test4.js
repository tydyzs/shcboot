//键盘事件wasd方向控制
var keys={
	keynum:0,//键盘值w:87;a:65;s:83;d:68;shift:16
	position_z:200,//z抽位置（动态）
	position_z_fx_w:0,//z轴变化方向(0/-1:停止/运行)
	position_z_fx_s:0,//z轴变化方向(0/1:正向/运行)
	position_z_num:0.1,//z抽变化系数
	lookAt_z:0,//z抽位置（动态）
	lookAt_z_fx_w:0,//z轴变化方向(0/-1:停止/运行)
	lookAt_z_fx_s:0,//z轴变化方向(0/1:正向/运行)
	lookAt_z_num:0.1,//z抽变化系数
	
	position_x:0,//z抽位置（动态）
	position_x_fx_a:0,//z轴变化方向(0/-1:停止/运行)
	position_x_fx_d:0,//z轴变化方向(0/1:停止/运行)
	position_x_num:0.1,//z抽变化系数
	lookAt_x:0,//z抽位置（动态）
	lookAt_x_fx_a:0,//z轴变化方向(0/-1:停止/运行)
	lookAt_x_fx_d:0,//z轴变化方向(0/1:停止/运行)
	lookAt_x_num:0.1,//z抽变化系数
	
	
	shift0:0.1,//还原速度
	shift:0.3,//shift调整速度
	keydonghua1:function(){//键盘产生动画
		keys.position_z+=keys.position_z_num*(keys.position_z_fx_w+keys.position_z_fx_s);
		keys.lookAt_z+=keys.lookAt_z_num*(keys.lookAt_z_fx_w+keys.lookAt_z_fx_s);
		
		keys.position_x+=keys.position_x_num*(keys.position_x_fx_a+keys.position_x_fx_d);
		keys.lookAt_x+=keys.lookAt_x_num*(keys.position_x_fx_a+keys.position_x_fx_d);
		
	    camera.position.set(keys.position_x,60,keys.position_z);
	    camera.lookAt(keys.position_x,0,keys.lookAt_z);
	},
	keyclick:function(){//body注册键盘事件
		//键盘松开事件
		 $("body").keyup(function(event){
			  keys.keynum=event.keyCode;
			  shc.alert(keys.keynum);
			  if(keys.keynum==87){//前
				  keys.position_z_fx_w=0;
				  keys.lookAt_z_fx_w=0;
			  }
			  if(keys.keynum==65){//左
				  keys.position_x_fx_a=0;
				  keys.lookAt_x_fx_a=0;
			  }
			  if(keys.keynum==83){//后
				  keys.position_z_fx_s=0;
				  keys.lookAt_z_fx_s=0;
			  }
			  if(keys.keynum==68){//右
				  keys.position_x_fx_d=0;
				  keys.lookAt_x_fx_d=0;
			  }
			  if(keys.keynum==16){//shift
				  shc.alert(-16);
				  keys.position_z_num=keys.shift0;//z抽变化系数
				  keys.lookAt_z_num=keys.shift0;//z抽变化系数
				  keys.position_x_num=keys.shift0;//z抽变化系数
				  keys.lookAt_x_num=keys.shift0;//z抽变化系数
			  }
		  });
		 //键盘按下事件
		  $("body").keydown(function(event){
			  keys.keynum=event.keyCode;
			  shc.alert(keys.keynum);
			  if(keys.keynum==87){//前
				  keys.position_z_fx_w=-1;
				  keys.lookAt_z_fx_w=-1;
			  }
			  if(keys.keynum==65){//左
				  keys.position_x_fx_a=-1;
				  keys.lookAt_x_fx_a=-1;
			  }
			  if(keys.keynum==83){//后
				  keys.position_z_fx_s=1;
				  keys.lookAt_z_fx_s=1;
			  }
			  if(keys.keynum==68){//右
				  keys.position_x_fx_d=1;
				  keys.lookAt_x_fx_d=1;
			  }
			  if(keys.keynum==16){//shift
				  shc.alert(keys.keynum);
				  keys.position_z_num=keys.shift;//z抽变化系数
				  keys.lookAt_z_num=keys.shift;//z抽变化系数
				  keys.position_x_num=keys.shift;//z抽变化系数
				  keys.lookAt_x_num=keys.shift;//z抽变化系数
			  }
		  })
	}
}
//鼠标移动事件
var oXArr = [];
var oYArr = [];
var rightArr = [];
var leftArr = [];
var topArr = [];
var downArr = [];
var rightMoveL=0;
var leftMoveL=0;
var downMoveL=0;
var upMoveL=0;
var mouse={
		zhuandongxishu:0.001,
		mousedonghua1:function(){//键盘产生动画
			var yan_y=rightMoveL*mouse.zhuandongxishu-leftMoveL*mouse.zhuandongxishu;
			var yan_x=upMoveL*mouse.zhuandongxishu-downMoveL*mouse.zhuandongxishu;
			camera.rotation.set(yan_x,yan_y,0);//修改角度   
			shc.alert(yan_y+"---"+yan_x)
		},
		mouseclick:function(){
			$("body").mousemove(function(e){
				var obxX = e.pageX;
		        var obxY = e.pageY;
		        oXArr.unshift(obxX);
		        oYArr.unshift(obxY);
		        oXArr.splice(2, 1);
		        oYArr.splice(2, 1);
		        if (oXArr[0] > oXArr[1]) {
	                // console.log("向右");
	                leftArr = [];
	                rightArr.push(obxX);
	                rightMoveL = Math.abs(rightArr[rightArr.length - 1] - rightArr[0]);
	                shc.alert("鼠标向右" + rightMoveL);
	                camera.rotation.set(0,rightMoveL*0.01,0);//修改角度   
	            } else {
	                // console.log("向左");
	                rightArr = [];
	                leftArr.push(obxX);
	                leftMoveL = Math.abs(leftArr[leftArr.length - 1] - leftArr[0]);
	                shc.alert("鼠标向左" + leftMoveL);
	            }
		        if (oYArr[0] > oYArr[1]) {
	                // console.log("向下");
	                topArr = [];
	                downArr.push(obxY);
	                downMoveL = Math.abs(downArr[downArr.length - 1] - downArr[0]);
	                shc.alert("鼠标向下" + downMoveL);
	            } else {
	                // console.log("向上");
	                downArr = [];
	                topArr.push(obxY);
	                upMoveL = Math.abs(topArr[topArr.length - 1] - topArr[0]);
	                shc.alert("鼠标向上" + upMoveL);
	            }
		        
			});
		}
}
var shc={
		alert:function(str){
			$("#console").val(str);	
		}
}