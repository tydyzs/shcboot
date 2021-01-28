package cn.stylefeng.guns.modular.tydyzs.model.service;

import cn.stylefeng.guns.modular.common.util.Result;
import cn.stylefeng.guns.modular.tydyzs.model.entity.Model;
import com.baomidou.mybatisplus.extension.service.IService;


/**
 *  服务类
 *
 * @author git
 * @since 2019-10-21
 */
public interface IModelService extends IService<Model> {
	public Result saveModel(Model model);
}
