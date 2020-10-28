package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 实体类
 *
 * @author git
 * @since 2019-10-21
 */
@Data
@ApiModel(value = "Crd对象", description = "Crd对象")
@TableName("TB_PAR_CRD")
public class CustomerManage implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * TableField
	 * 额度品种编号
	 */
	@TableId(value = "crd_product_num")
	@ApiModelProperty(value = "额度品种编号")
	private String crdProductNum;
	/**
	 * 额度体系名称
	 */
	@ApiModelProperty(value = "额度体系名称")
	private String crdProductName;
	/**
	 * 额度父类编号
	 */
	@ApiModelProperty(value = "额度父类编号")
	private String superCrdNum;
	/**
	 * 额度父类名称
	 */
	@ApiModelProperty(value = "额度父类名称")
	private String superCrdName;
	/**
	 * 额度下限
	 */
	@ApiModelProperty(value = "额度下限")
	private String crdLowerLimit;
	/**
	 * 额度上限
	 */
	@ApiModelProperty(value = "额度上限")
	private String crdUpperLimit;
	/**
	 * 敞口下限
	 */
	@ApiModelProperty(value = "敞口下限")
	private String openLowerLimit;
	/**
	 * 敞口上限
	 */
	@ApiModelProperty(value = "敞口上限")
	private String openUpperLimit;
	/**
	 * 币种
	 */
	@ApiModelProperty(value = "币种")
	private String currencyCd;
	/**
	 * 产品状态，1：有效 2：无效
	 */
	@ApiModelProperty(value = "产品状态，1：有效 2：无效")
	private String crdSysStatus;
	/**
	 * 额度产品描述
	 */
	@ApiModelProperty(value = "额度产品描述")
	private String crdDescr;

	/**
	 * 额度产品类型
	 */
	@ApiModelProperty(value = "额度产品类型（CD000211）")
	private String crdProductType;

	/**
	 * 是否低风险
	 */
	@ApiModelProperty(value = "是否低风险额度")
	private String isLowRisk;

	/**
	 * 额度产品级别
	 */
	@ApiModelProperty(value = "额度产品级别")
	private String crdLevel;

	@ApiModelProperty(value = "是否可串用")
	private String isBorrow;

	@ApiModelProperty(value = "管控模式")
	private String controlMode;

	@ApiModelProperty(value = "管控方式")
	private String controlType;

	/**
	 * 经办人编号
	 */
	@ApiModelProperty(value = "经办人编号")
	private String userNum;

	/**
	 * 经办机构编号
	 */
	@ApiModelProperty(value = "经办机构编号")
	private String orgNum;
	/**
	 * 修改人编号
	 */
	@ApiModelProperty(value = "修改人编号")
	private String updateUserNum;
	/**
	 * 修改人机构编号
	 */
	@ApiModelProperty(value = "修改人机构编号")
	private String updateOrgNum;
	/**
	 * 创建时间
	 */
	@ApiModelProperty(value = "创建时间")
	private Timestamp createTime;
	/**
	 * 更新时间
	 */
	@ApiModelProperty(value = "更新时间")
	private Timestamp updateTime;


}
