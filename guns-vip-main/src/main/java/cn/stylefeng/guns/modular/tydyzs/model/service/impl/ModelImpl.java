package cn.stylefeng.guns.modular.tydyzs.model.service.impl;

import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.model.entity.Model;
import cn.stylefeng.guns.modular.tydyzs.model.mapper.ModelMapper;
import cn.stylefeng.guns.modular.tydyzs.model.service.IModelService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;



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
        Result res=new Result();
        res.setState("0");
        res.setMsg("保存成功！");
        return res;
    }


}
