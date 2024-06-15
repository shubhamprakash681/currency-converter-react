import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "../index.type";

const useAxiosGet = (url: string, config?: AxiosRequestConfig<any>) => {
  const [apiResponse, setAPiResponse] = useState<AxiosResponse<
    ApiResponse,
    any
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<ApiResponse>(url, config);
        setAPiResponse(res);
      } catch (err: any) {
        console.log("In useAxiosGet, err: ", err);
        err.message ? setError(err.message) : setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { apiResponse, error, isLoading };
};

export default useAxiosGet;
