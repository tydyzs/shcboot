package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service.impl;

import cn.stylefeng.guns.modular.common.util.CommonUtil;
import cn.stylefeng.guns.modular.common.util.LoginUtil;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity.CustomerManage;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.mapper.CustomerManageMapper;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service.ICustomerManageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Date;


/**
 * 服务实现类
 *
 * @author git
 * @since 2019-10-21
 */
@Service
public class CustomerManageImpl extends ServiceImpl<CustomerManageMapper, CustomerManage> implements ICustomerManageService {

	/*IPage<CustomerManage> selectCrdProductPage(IPage<CustomerManage> page, CustomerManage customerManage){
		return null;
	}*/

    /**
     * 保存/编辑客户数据
     * @param customerManage
     */
    public Result saveCustomer(CustomerManage customerManage) {
        String customerId=CommonUtil.getUuid();
        //baseMapper.insert(customerManage);
        customerManage.setCustomerId(customerId);
        if(CommonUtil.checknull(customerManage.getVehicle())){
            customerManage.setVehicle("off");
        }
        if(CommonUtil.checknull(customerManage.getRoom())){
            customerManage.setRoom("off");
        }
        //获取登入信息
        String userId= LoginUtil.getUserId();
        String orgId= LoginUtil.getOrgId();
        Date date=new Date();
        //新增时保存当前登入人信息
        customerManage.setCreateUserId(userId);
        customerManage.setCreateOrgId(orgId);
        customerManage.setCreateDate(date);
        customerManage.setIsDelete("1");
        //最后更新信息
        customerManage.setUpdateUserId(userId);
        customerManage.setUpdateOrgId(orgId);
        customerManage.setUpdateDate(date);
        this.saveOrUpdate(customerManage);
        Result res=new Result();
        res.setState("0");
        res.setMsg("保存成功！");
        return res;
    }


}
