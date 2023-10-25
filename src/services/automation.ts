import AxoisApi from "../api";
import { APIS } from "../api/api";

export const getAutomationList = (
  orderBy: string,
  page: number,
  size: number
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.AUTOMATION.LIST(orderBy, page, size)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
