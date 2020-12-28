package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service.impl;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.common.util.CommonUtil;
import cn.stylefeng.guns.modular.common.util.LoginUtil;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity.CustomerManage;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.mapper.CustomerManageMapper;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.service.ICustomerManageService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * 服务实现类
 *
 * @author git
 * @since 2019-10-21
 */
@Service
public class CustomerManageImpl extends ServiceImpl<CustomerManageMapper, CustomerManage> implements ICustomerManageService {


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

    /**
     * 分页查询客户数据
     * @param param
     * @return
     */
    public LayuiPageInfo queryCustomer(Map param){
        //获取前端分页参数
        Page pageContext = LayuiPageFactory.defaultPage();
        //获取分页查询结果
       /* //实体类方式
       1.查询条件
        QueryWrapper<CustomerManage> objectQueryWrapper = new QueryWrapper<>();
        2.开始查询
        IPage page = this.page(pageContext, objectQueryWrapper);*/
       //sql方式
        IPage page = baseMapper.queryCustomer(pageContext, param);
        //将结果转换成layui可识别的分页结果
        LayuiPageInfo result=LayuiPageFactory.createPageInfo(page);
        return result;
    }
    /**
     * 查询所有客户数据
     * @param param
     * @return
     */
    public LayuiPageInfo queryCustomerAll(Map param){
        //查询条件
        QueryWrapper<CustomerManage> objectQueryWrapper = new QueryWrapper<>();
        //获取所有查询结果
        List data = baseMapper.queryCustomerAll(param);
        LayuiPageInfo result=new LayuiPageInfo();
        result.setData(data);
        return result;
    }


}
