package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.mapper;

import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity.CustomerManage;
import cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.vo.CustomerManageVO;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


/**
 *  Mapper 接口
 *
 * @author git
 * @since 2019-10-21
 */
public interface CustomerManageMapper extends BaseMapper<CustomerManage> {
	Page<CustomerManage> queryCustomer(@Param("page")IPage page, @Param("param")Map param);
	Page<CustomerManageVO> queryCustomerValue(@Param("page")IPage page, @Param("param")Map param);
	List<CustomerManage> queryCustomerAll(Map param);
}
