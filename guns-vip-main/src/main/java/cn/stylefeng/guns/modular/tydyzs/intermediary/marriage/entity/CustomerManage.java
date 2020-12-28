package cn.stylefeng.guns.modular.tydyzs.intermediary.marriage.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 实体类
 *
 * @author git
 * @since 2019-10-21
 */
@Data
@ApiModel(value = "客户对象", description = "客户对象")
@TableName("BLIND_DATE_CUSTOMER")
public class CustomerManage implements Serializable {

	private static final long serialVersionUID = 1L;

	@TableId(value = "CUSTOMER_ID", type = IdType.UUID)
	private String customerId;
	private String name;
	private String gender;
	private String birthdate;
	private String phoneNumber;
	private String contactInformation;
	private String age;
	private String zodiac;
	private String constellation;
	private String room;
	private String vehicle;
	private String assetsexplain;
	private String photo;
	@TableField("CREATE_USER_ID")
	private String createUserId;
	@TableField("CREATE_ORG_ID")
	private String createOrgId;
	@TableField("CREATE_DATE")
	private Date createDate;
	@TableField("UPDATE_USER_ID")
	private String updateUserId;
	@TableField("UPDATE_ORG_ID")
	private String updateOrgId;
	@TableField("UPDATE_DATE")
	private Date updateDate;
	@TableField("IS_DELETE")
	private String isDelete;


}
