import axios from "axios";



export const GET_METHOD = (query, auth) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  let token = import.meta.env.VITE_TOKEN;
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI5NzQ4MDkxLCJleHAiOjE3Mjk3NTE2OTF9.Hz_ghfDb3yMhxMwvAYDOYbFkSuU9J6faP3g8r-sBxQU';
  var config = {};
  if (auth) {
    config = {
      method: "get",
      url: url + "/" + query,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    config = {
      method: "get",
      url: url + "/" + query,
    };
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

// GET Method with raAW URL


export const POST_METHOD = (query, body, auth) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  let token = import.meta.env.VITE_TOKEN;
  
  var config = {};
  if (auth) {
    config = {
      method: "post",
      url: url + "/" + query,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: body,
    };
  } else {
    config = {
      method: "post",
      url: url + "/" + query,
      data: body,
    };
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};



