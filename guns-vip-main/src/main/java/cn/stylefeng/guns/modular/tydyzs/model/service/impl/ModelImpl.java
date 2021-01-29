package cn.stylefeng.guns.modular.tydyzs.model.service.impl;

import cn.stylefeng.guns.modular.common.util.CommonUtil;
import cn.stylefeng.guns.modular.common.util.LoginUtil;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.model.entity.Model;
import cn.stylefeng.guns.modular.tydyzs.model.mapper.ModelMapper;
import cn.stylefeng.guns.modular.tydyzs.model.service.IModelService;
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
public class ModelImpl extends ServiceImpl<ModelMapper, Model> implements IModelService {


    /**
     * 保存/编辑模型数据
     */
    public Result saveModel(Model model) {
        String modelId=model.getModelId();
        //获取登入信息
        String userId= LoginUtil.getUserId();
        String orgId= LoginUtil.getOrgId();
        Date date=new Date();
        //新增时保存当前登入人信息
        if(CommonUtil.checknull(modelId)){//新增
            modelId=CommonUtil.getUuid();
            model.setCreateUserId(userId);
            model.setCreateOrgId(orgId);
            model.setCreateDate(date);
            model.setIsDelete("1");
        }
        model.setModelId(modelId);
        //最后更新信息
        model.setUpdateUserId(userId);
        model.setUpdateOrgId(orgId);
        model.setUpdateDate(date);
        this.saveOrUpdate(model);
        Result res=new Result();
        res.setState("0");
        res.setMsg("保存成功！");
        return res;
    }


}
