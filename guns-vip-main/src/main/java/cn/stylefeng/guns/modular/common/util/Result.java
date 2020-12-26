package cn.stylefeng.guns.modular.common.util;

import lombok.Data;

/*
*封装返回结果
 */
@Data
public class Result {
    private String state;//返回状态
    private String msg;//返回信息
    private Object data;//返回数据
}
