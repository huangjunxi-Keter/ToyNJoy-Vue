import { request } from "@/utils/request";

const api = {
  email: "/api/System/getVerificationCode",
};

export function getVerificationCode(email, title) {
  return request({
    url: api.email,
    params: { email, title },
  });
}
