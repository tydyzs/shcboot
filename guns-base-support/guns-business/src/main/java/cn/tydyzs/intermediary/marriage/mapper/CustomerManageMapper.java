package cn.tydyzs.intermediary.marriage.mapper;

import cn.tydyzs.intermediary.marriage.entity.CustomerManage;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import java.util.List;

/**
 *  Mapper 接口
 *
 * @author git
 * @since 2019-10-21
 */
public interface CustomerManageMapper extends BaseMapper<CustomerManage> {

	/**
	 * 自定义分页
	 *
	 * @param page
	 * @param crd
	 * @return
	 */
	List<CrdVO> selectCrdPage(IPage page, CrdVO crd);
	int selectCrdProduct(String crdProductNum);
	String getCrdMaxId(String crdId);

}