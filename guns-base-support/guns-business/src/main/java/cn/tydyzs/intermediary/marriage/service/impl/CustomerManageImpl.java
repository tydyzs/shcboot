package cn.tydyzs.intermediary.marriage.service.impl;

import cn.tydyzs.intermediary.marriage.entity.CustomerManage;
import cn.tydyzs.intermediary.marriage.mapper.CustomerManageMapper;
import cn.tydyzs.intermediary.marriage.service.ICustomerManageService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author git
 * @since 2019-10-21
 */
@Service
public class CustomerManageImpl extends ServiceImpl<CustomerManageMapper, CustomerManage> implements ICustomerManageService{

	/*IPage<CustomerManage> selectCrdProductPage(IPage<CustomerManage> page, CustomerManage customerManage){
		return null;
	}*/


}
