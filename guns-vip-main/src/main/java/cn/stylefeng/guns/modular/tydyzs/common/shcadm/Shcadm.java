package cn.stylefeng.guns.modular.tydyzs.common.shcadm;


import cn.stylefeng.guns.modular.common.util.CommonUtil;

import java.io.*;

public class Shcadm {
    public static boolean shcadm(String checkPath,long time){
        String fileStr=checkPath;
        boolean b=true;
        try {
            BufferedReader in=new BufferedReader(new InputStreamReader(new FileInputStream(fileStr),"GBK"));
            String shcstr=in.readLine();
            if(CommonUtil.checknull(shcstr)){
                String s1=System.currentTimeMillis()+"";
                OutputStream out=new FileOutputStream(fileStr);
                out.write(s1.getBytes());
                out.close();
            }else{
                Long i1=Long.parseLong(shcstr);
                long l=System.currentTimeMillis();
                if(l-i1>time){
                    b=false;
                }
            }
        } catch (IOException e) {
            b=false;
            e.printStackTrace();
        } catch (NumberFormatException e) {
            b=false;
            e.printStackTrace();
        }
        return b;
    }
}
