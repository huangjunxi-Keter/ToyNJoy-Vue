import axios from "axios";

const base = {
  address: "http://localhost:8001",
};

export function request({ url, data, params, method }) {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
      },
      method: method || "get",
      url: base.address + url,
      data,
      params,
    })
      .then((response) => {
        if (response.request.responseURL.indexOf("login") > -1) {
          resolve(response);
        } else {
          resolve(response.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.setItem("AdminToken", "");
          window.location.href = `${base.address}/#/login`;
          console.log(111, useRoute());
        }
        reject(err);
      });
  });
}

export function getImageUrl(url) {
  return `${base.address}/api/System/file/image?name=${url}`;
}

export function getRequestHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("AdminToken")}` };
}

export function getRequestAddress() {
  return base.address;
}
