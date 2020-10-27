package cn.tydyzs.intermediary.marriage.controller;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


/**
 *  客户管理
 *
 * @author git
 * @since 2019-10-21
 */
@RestController
@AllArgsConstructor
@RequestMapping("/intermediary/customer")
@Api(value = "客户管理", tags = "接口")
@Slf4j
public class CustomerManageController {
	private org.git.modules.clm.param.service.ICustomerManageService iCustomerManageService;

}
