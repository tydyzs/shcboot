package cn.stylefeng.guns.modular.tydyzs.common.service.impl;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.common.util.CommonUtil;
import cn.stylefeng.guns.modular.common.util.LoginUtil;
import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.common.entity.Dict;
import cn.stylefeng.guns.modular.tydyzs.common.mapper.CommonMapper;
import cn.stylefeng.guns.modular.tydyzs.common.service.ICommonService;
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
public class CommonImpl extends ServiceImpl<CommonMapper, Dict> implements ICommonService {
    /**
     * 查所有（实体方式，一般用于单表)
     * @param param
     * @return
     */
    public LayuiPageInfo queryDict(Map param){
        //实体类方式
       //1.查询条件
        QueryWrapper<Dict> objectQueryWrapper = new QueryWrapper<>();
        if(!CommonUtil.checknull(param.get("name"))){
            objectQueryWrapper.and(i -> i.eq("name", param.get("name")));
        }
        //2.开始查询
        List data = this.list(objectQueryWrapper);
        LayuiPageInfo result=new LayuiPageInfo();
        result.setData(data);
        return result;
    }

}
