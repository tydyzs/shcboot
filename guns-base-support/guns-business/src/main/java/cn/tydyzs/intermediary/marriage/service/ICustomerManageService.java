package cn.tydyzs.intermediary.marriage.service;
import cn.tydyzs.intermediary.marriage.entity.CustomerManage;
import com.baomidou.mybatisplus.core.metadata.IPage;
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
	 *
	 * @param page
	 * @return
	 */
	//IPage<CustomerManage> selectCrdProductPage(IPage<CustomerManage> page, CustomerManage customerManage);

}
