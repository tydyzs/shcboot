package cn.stylefeng.guns.modular.tydyzs.common.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.common.entity.Dict;
import cn.stylefeng.guns.modular.tydyzs.common.service.ICommonService;
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
@RequestMapping("/common")
@Validated
public class CommonController extends BaseController {

	public static String CONDITION_FIELDS = "CONDITION_FIELDS";

	private String PREFIX = "/tydyzs/common";

	@Autowired
	private ICommonService iCommonService;



	/**
	 * 列表（单表实体所有）
	 * 根据条件查询字典
	 */
	@ResponseBody
	@RequestMapping("/queryDict")
	public LayuiPageInfo queryDict(@RequestParam Map<String, String> params) {
		return iCommonService.queryDict(params);
	}


}


