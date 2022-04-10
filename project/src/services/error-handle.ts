import request from 'axios';
import { toast } from 'react-toastify';
import { HTTP_CODE } from '../const';

export const errorHandle = (error: Error | unknown): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.SERVER_ERROR:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.SERVICE_UNAVAILABLE:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.NOT_IMPLEMENTED:
        toast.info(response.data.error);
        break;
    }
  }
};
