package cn.stylefeng.guns.modular.tydyzs.model.mapper;

import cn.stylefeng.guns.modular.tydyzs.model.entity.Model;
import cn.stylefeng.guns.modular.tydyzs.model.vo.ModelVO;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.Map;


/**
 *  Mapper 接口
 *
 * @author git
 * @since 2019-10-21
 */
public interface ModelMapper extends BaseMapper<Model> {
	Page<ModelVO> queryModelValue(@Param("page")IPage page, @Param("param")Map param);
}
