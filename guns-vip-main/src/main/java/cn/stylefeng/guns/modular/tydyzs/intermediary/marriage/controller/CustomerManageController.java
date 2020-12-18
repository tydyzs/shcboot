package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.controller;

import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity.CustomerManage;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service.ICustomerManageService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


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
	 * 保存数据
	 *
	 * @author stylefeng
	 * @Date 2019-02-18
	 */
	@RequestMapping("/saveData")
	@ResponseBody
	public String saveData(String userName) {
		System.out.println(userName);
		return userName;
	}

	/**
	 * 保存数据
	 *
	 * @author stylefeng
	 * @Date 2019-02-18
	 */
	@RequestMapping(value="/saveData",method = RequestMethod.POST)
	@ResponseBody
	public CustomerManage getdata(@RequestBody CustomerManage customer) {
		iCustomerManageService.saveCustomer(customer);
		return customer;
	}

}


