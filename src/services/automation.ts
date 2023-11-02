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

export const getAutomationDetails = (id: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.AUTOMATION.AUTOMATION_DETAILS(id)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createAutomation = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTOMATION.CREATE_AUTOMATION}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadExcel = (id: number, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.AUTOMATION.UPLOAD_EXCEL(id)}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const reUploadExcel = (id: number, data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.AUTOMATION.UPLOAD_EXCEL(id)}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const runAutomation = (id: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTOMATION.RUN(id)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAutomation = (id: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.AUTOMATION.DELETE(id)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editMessage = (data: any[]) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.AUTOMATION.UPDATE_MESSAGE}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editDatapoints = (data: any[]) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.AUTOMATION.UPDATE_DATAPOINTS}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


