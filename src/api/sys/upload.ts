import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { iCommonlist } from './model/common';

import { ErrorMessageMode } from '/#/axios';
const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
enum API {
  uploadImg = '/mz/upload/image',
}
/**
 * @description: Upload interface
 */
export function upload(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<iCommonlist>(
    {
      url: API.uploadImg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
