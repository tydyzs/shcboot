package cn.tydyzs.intermediary.marriage.controller;

import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.tydyzs.intermediary.marriage.service.ICustomerManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 客户管理
 */
@Controller
@RequestMapping("/customer")
@Validated
public class CustomerManageController extends BaseController {

	public static String CONDITION_FIELDS = "CONDITION_FIELDS";

	private String PREFIX = "/modular/databaseInfo";

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
		return PREFIX + "/databaseInfo.html";
	}


}


