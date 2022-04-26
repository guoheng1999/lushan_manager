import axios from 'axios';
import { reset } from 'echarts/lib/visual/seriesColor';
import { loginreq, req, postRequest,getRequest,putRequest,deleteRequest,fileDownloadRequest } from './axiosFun';

/*获取反馈数据*/

export const feedbackDataList = (params) => { return getRequest("/comment/") };
/*获取反馈数据文件*/
export const feedbackFileList = (params) => { return getRequest("/commentFile/commentId/"+params) };

/*下载反馈数据文件*/
export const downloadFeedbackFile = (params) => {
  const data = {
    'fileName': params
  }
  return fileDownloadRequest("/file/download/comment/", data)
};
// /file/download/comment/{commentFileName}
