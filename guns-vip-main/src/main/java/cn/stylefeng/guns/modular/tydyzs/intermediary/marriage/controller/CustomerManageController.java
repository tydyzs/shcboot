package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.controller;

import cn.hutool.db.Page;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.form.model.EgFormParam;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity.CustomerManage;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service.ICustomerManageService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


/**
 * 客户管理
 */
@Controller
@RequestMapping("/customer")
@Validated
public class CustomerManageController extends BaseController {

	public static String CONDITION_FIELDS = "CONDITION_FIELDS";

	private String PREFIX = "/tydyzs/intermediary/marriage";

	@Autowired
	private ICustomerManageService iCustomerManageService;

	/**
	 * 跳转到主页面
	 *
	 * @author stylefeng
	 * @Date 2019-06-15
	 */
	@RequestMapping("")
	public String index() {
		return PREFIX + "/peopleManage.html";
	}

	/**
	 * 表单页面
	 */
	@RequestMapping("/peopleManageForm")
	public String form(String type) {
		return PREFIX + "/peopleManageForm.html";
	}
	/**
	 * 列表
	 */
	@ResponseBody
	@RequestMapping("/list")
	public void list(Page page, @RequestParam Map<String, String> params) {
		System.out.println(params);
	}

	/**
	 * 保存数据
	 *
	 * @author stylefeng
	 * @Date 2019-02-18
	 */
	@RequestMapping(value="/saveData",method = RequestMethod.POST)
	@ResponseBody
	public Result getdata(@RequestBody CustomerManage customer) {
		return iCustomerManageService.saveCustomer(customer);
	}

}


