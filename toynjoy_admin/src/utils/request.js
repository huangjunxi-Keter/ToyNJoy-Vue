import axios from "axios";

const base = {
  address: "http://localhost:8001",
};

const request = ({ url, data, params, method }) => {
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
        // localStorage.setItem("AdminToken", "");
        reject(err);
      });
  });
};

export default request;
