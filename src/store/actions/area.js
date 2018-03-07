import {
  REC_AREA_LIST, REC_DOMAIN_INFO
} from '@constants/ActionTypes';
import config from '@config';

import { message } from 'antd';
import axios from 'axios';

export const getAreaInfo = (body = {}) => async dispatch => {
  try {
    const areaListRes = await axios({
      method: 'post',
      url: `${config.areaHost}/tmops/api/v1/ops/tmplusZone`,
      data: body,
    });
    if (areaListRes.data.code !== 0) {
      message.error('areaList获取失败');
      return false;
    };
    const areasDomain = await axios({
      method: 'post',
      url: `${config.areaHost}/tmops/api/v1/ops/tmplusZone/domains`,
      data: {
        serverName: 'tdashboard',
        tmplusZones: areaListRes.data.data.tmplusZone,
        requestId: `TmplusZone-domain-${process.env.DEPLOYMENT_ENV}`
      }
    });
    if (areasDomain.data.code !== 0) {
      message.error('areasDomain获取失败');
      return false;
    };
    dispatch({
      type: REC_AREA_LIST,
      payload: {
        areasDomain: areasDomain.data.data
      }
    })
  } catch (error) {
    message.error('error actions ==> area');
  }
}

export const getDomainInfo = (domainList = []) => async dispatch => {
  try {
    domainList.reduce(
      async (data, domainItem) => {
        if (!domainItem.domain) return data;
        const domainInfo = await axios({
          method: 'get',
          url: `${domainItem.domain}/v2/tdashboard/overview`,
        });
        const result = [...data, {...domainItem, ...domainInfo.data}]
        dispatch({
          type: REC_DOMAIN_INFO,
          payload: {
            domainsInfo: result
          }
        });
        return result;
      }, [])
  } catch (error) {
    message.error('error actions ==> area');
  }
}