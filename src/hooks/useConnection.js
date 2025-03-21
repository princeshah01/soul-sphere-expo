import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import axios from "axios";
import { addConnection } from "../Store/Slice/ConnectionSlice";
import env from "../Constant/env";

const useConnections = (IsFavToggle, request = null) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Connection.data, shallowEqual);
  const token = useSelector((state) => state.Auth.token);

  const getConnections = useCallback(async () => {
    try {
      const response = await axios.get(`${env.API_BASE_URL}/user/connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        dispatch(addConnection(response?.data?.data));
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
      showToast("error", error?.response?.data?.message);
    }
  }, [token]);

  useEffect(() => {
    getConnections();
  }, [IsFavToggle, request]);

  return { data };
};

export default useConnections;
