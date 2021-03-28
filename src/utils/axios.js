import { useState, useEffect } from "react";
import axios from "axios";

// custom hook for performing GET request
export const get = (url, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch ({ message, response }) {
        setData({ error: message, status: response ? response.status : "500" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data };
};

export const post = (url, body) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(url, body);
        setData(response.data);
      } catch ({ message, response }) {
        setData({ error: message, status: response ? response.status : "500" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data };
};
