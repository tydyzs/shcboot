package cn.stylefeng.guns.modular.tydyzs.model.entity;

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
@ApiModel(value = "3D模型对象", description = "3D模型对象")
@TableName("TB_EXHIBITION3D_MODEL")
public class Model implements Serializable {

	private static final long serialVersionUID = 1L;

	@TableId(value = "MODE_ID", type = IdType.UUID)
	private String modeId;

	@TableField("MODE_NAME")
	private String modeName;
	@TableField("MODE_TYPE")
	private String modeType;
	@TableField("MODEL_FILE")
	private String modelFile;
	private String remarks;


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
