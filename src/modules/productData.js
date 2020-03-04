import axios from "axios";

const getData = async () => {
  let headers = await sessionStorage.getItem("products");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };

  const response = await axios.get("/products", {
    headers: headers
  });

  return response;
};

export { getData };