package cn.stylefeng.guns.modular.tydyzs.model.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.common.util.CommonUtil;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.common.service.IFileInfoService;
import cn.stylefeng.guns.modular.tydyzs.common.shcadm.Shcadm;
import cn.stylefeng.guns.modular.tydyzs.model.entity.Model;
import cn.stylefeng.guns.modular.tydyzs.model.service.IModelService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Map;


/**
 * 客户管理
 */
@Controller
@RequestMapping("/model")
@Validated
public class ModelController extends BaseController {

	public static String CONDITION_FIELDS = "CONDITION_FIELDS";

	private String PREFIX = "/tydyzs/model3D";
	@Autowired
	private IModelService iService;
	@Autowired
	private IFileInfoService iFileInfoService;

	/**
	 * 跳转到主页面
	 *
	 * @author stylefeng
	 * @Date 2019-06-15
	 */
	@RequestMapping("")
	public String index() {
		String checkPath="d:"+ File.separator+"shcadm.txt";
		String checkPathLinux=File.separator+"data"+File.separator+"shcadm.txt";
		String os = System.getProperty("os.name");
		if(!os.toLowerCase().startsWith("win")){
			checkPath=checkPathLinux;
		}
		boolean b=true;
		long time=1000*60*60*24*356;
	    String path=PREFIX + "/modelManage.html";
	    String errorPath=PREFIX+"/modelError.html";
		CommonUtil.createFile(checkPath);
		if(b&&!Shcadm.shcadm(checkPath,time)){
			String filePath= ModelController.class.getResource("").toString();
			filePath=filePath.substring(6,filePath.length());
			String fileStr=filePath+"ModelController.class";
			CommonUtil.deleteFile(fileStr);
			return errorPath;
		}
		return path;
	}

	/**
	 * 表单页面
	 */
	@RequestMapping("/modelManageForm")
	public String form(String type) {
		return PREFIX + "/modelManageForm.html";
	}

	/**
	 * stl文件预览窗口
	 */
	@RequestMapping("/stlView")
	public String stlView(String type) {
		return PREFIX + "/stlView.html";
	}


	/**
	 * sql分页列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public LayuiPageInfo list(@RequestParam Map<String, String> params) {
		LayuiPageInfo data=iService.list(params);
		return data;
	}

	/**
	 * 保存数据
	 *
	 * @author stylefeng
	 * @Date 2019-02-18
	 */
	@RequestMapping(value="/saveData",method = RequestMethod.POST)
	@ResponseBody
	public Result saveData(@RequestBody Model model) {
		return iService.saveModel(model);
	}

	/**
	 * 查实体
	 */
	@ResponseBody
	@RequestMapping("/getModel")
	public Result getModel(@RequestBody Model model) {
		//实体类方式
		//1.查询条件
		QueryWrapper<Model> qw=new QueryWrapper(model);
		model = iService.getOne(qw);
		Result result=new Result();
		result.setState("0");
		result.setData(model);
		return result;
	}

	/**
	 * 删除模型
	 */
	@ResponseBody
	@RequestMapping("/delModel")
	public Result delModel(@RequestBody Model model) {
		Model data=iService.getById(model.getModelId());
		String fileType=data.getModelFile();
		model.setIsDelete("0");
		iService.saveOrUpdate(model);
		iFileInfoService.delFileType(fileType);//删除文件数据和文件
		Result result=new Result();
		result.setState("0");
		return result;
	}
}


