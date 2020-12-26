package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service;

import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity.CustomerManage;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 *  服务类
 *
 * @author git
 * @since 2019-10-21
 */
public interface ICustomerManageService extends IService<CustomerManage> {

	/**
	 * 自定义分页
	 * @return
	 */
	//IPage<CustomerManage> selectCrdProductPage(IPage<CustomerManage> page, CustomerManage customerManage);

	public Result saveCustomer(CustomerManage customerManage);
}
