import { request } from "@/utils/request";

const api = {
  verificationCode: "/api/System/getVerificationCode",
  email: "/api/System/sendEmail",
  deleteFile: "/api/System/deleteFile"
};

export function getVerificationCode(email, title) {
  return request({
    url: api.verificationCode,
    params: { email, title },
  });
}

export function sendEmail(email, title, message) {
  return request({
    url: api.email,
    params: {
      email,
      title,
      message,
    },
  });
}

export function deleteFile(path, fileName) {
  return request({
    url: api.deleteFile,
    params: {
      path,
      fileName
    },
  });
}