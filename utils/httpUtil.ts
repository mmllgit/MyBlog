/* 
  请求url配置
*/
// 引入请求方法
import { httpReq } from "./httpReq";
// 引入参数类型
import { upload } from "./params";

class HttpUtil {
  uploadFile = (params: upload) => httpReq("post", "/upload", params);
}

export default new HttpUtil();
