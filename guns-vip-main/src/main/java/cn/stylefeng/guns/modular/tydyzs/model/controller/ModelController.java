package cn.stylefeng.guns.modular.tydyzs.model.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.common.service.IFileInfoService;
import cn.stylefeng.guns.modular.tydyzs.model.entity.Model;
import cn.stylefeng.guns.modular.tydyzs.model.service.IModelService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
		return PREFIX + "/modelManage.html";
	}

	/**
	 * 表单页面
	 */
	@RequestMapping("/modelManageForm")
	public String form(String type) {
		return PREFIX + "/modelManageForm.html";
	}
	/**
	 * sql分页列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public LayuiPageInfo list(@RequestParam Map<String, String> params) {
		//LayuiPageInfo data=iService.saveModel(params);
		return null;
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

}


