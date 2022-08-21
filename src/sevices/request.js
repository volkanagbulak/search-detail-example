import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://dummyjson.com/";

const client = (() => {
  return axios.create({
    baseURL: API_URL,
  });
})();

const request = async function (options, store) {
  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {
    const errorData = error?.response?.data;
    if (errorData.length > 1 || errorData?.errors?.length > 0) {
      errorData?.errors.forEach(function (error) {
        return toast.error(error.msg);
      });
    } else {
      return toast.error(errorData);
    }
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
