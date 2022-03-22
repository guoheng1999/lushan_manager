import axios from 'axios';
import { loginreq, req, postReqeust,getRequest,putRequest } from './axiosFun';

export const downloadList = (params) => { return getRequest("downloadLog/", params) };