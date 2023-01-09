import { AxiosError, AxiosInstance } from 'axios';
import { useEffect, useReducer, useRef } from 'react';
import { getAuthAxiosInstance } from '../api/axios';
import { Null } from '../types/types';

interface IState<T> {
  data: Null<T>;
  error: Null<AxiosError>;
}

type Action<T> = { type: 'loading' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: AxiosError };

export const useFetch = <T = unknown>(url: string): IState<T> => {
  const cancelRequest = useRef<boolean>(false);

  const initialState: IState<T> = {
    error: null,
    data: null,
  };

  const fetchReducer = (state: IState<T>, action: Action<T>): IState<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      try {
        const axiosInstance: AxiosInstance = await getAuthAxiosInstance();
        const { data } = await axiosInstance.get<T>(url);

        if (cancelRequest.current) return;
        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: 'error', payload: error as AxiosError });
      }
    };

    void fetchData();

    return () => {
      // avoid state update after unmounting component
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
};
