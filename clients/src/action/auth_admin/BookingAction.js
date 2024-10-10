import {
  GET_ALL_BOOKING_FAIL,
  GET_ALL_BOOKING_REQUEST,
  GET_ALL_BOOKING_SUCCESS,
  GET_SINGLE_BOOKING_REQUEST,
  GET_SINGLE_BOOKING_SUCCESS,
  GET_SINGLE_BOOKING_FAIL,
  REFRESH_BOOKING_REQUEST,
  UPDATE_BOOKING_WORKER_REQUEST,
  UPDATE_BOOKING_WORKER_SUCCESS,
  UPDATE_BOOKING_WORKER_FAIL,
  UPDATE_PAYMENT_STATUS_REQUEST,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  GET_ALL_NEW_BOOKING_REQUEST,
  GET_ALL_NEW_BOOKING_SUCCESS,
  GET_ALL_NEW_BOOKING_FAIL
} from "../../constances/BookingConstance";
import { Localhost } from "../host/HostConnection";
import axios from "axios";

//get all booking
export const GetAllBookingAction = () => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_BOOKING_REQUEST });
    const config = {
      headers: {
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/bookings/get/all/bookings`,
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_BOOKING_SUCCESS,
        payload: data.bookings,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all booking
export const GetAllNewBookingAction = () => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_NEW_BOOKING_REQUEST });
    const config = {
      headers: {
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/bookings/get/all/new/bookings`,
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_NEW_BOOKING_SUCCESS,
        payload: data.bookings,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_NEW_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all booking
export const GetSingleBookingAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_SINGLE_BOOKING_REQUEST });
    const config = {
      headers: {
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/bookings/get/unique/booking/${id}/`,
      config
    );
    if (data) {
      dispatch({
        type: GET_SINGLE_BOOKING_SUCCESS,
        payload: data.booking,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

//add service worker this  booking
export const updateBookingWorkerAction =
  (workerId, bookingId) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: UPDATE_BOOKING_WORKER_REQUEST });
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + `/api/bookings/update/booking/worker/${bookingId}/`,
        { workerId },
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_BOOKING_WORKER_SUCCESS,
          payload: data.bookings,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_BOOKING_WORKER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update payment status
export const updatePaymentStatusAction =
  (bookingId,paymentStatus) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: UPDATE_PAYMENT_STATUS_REQUEST });
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + `/api/bookings/update/payment_status/${bookingId}/`,
        {paymentStatus},
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_PAYMENT_STATUS_SUCCESS,
          payload: data.bookings,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENT_STATUS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//update payment status
export const bookingDeleteAction =
  (bookingId) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: BOOKING_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.delete(
        Localhost + `/api/bookings/delete/${bookingId}/`,
        config
      );
      if (data) {
        dispatch({
          type: BOOKING_DELETE_SUCCESS,
          payload: data.bookings,
        });
      }
    } catch (error) {
      dispatch({
        type: BOOKING_DELETE_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  
///refresh booking
export const refreshBookingAction = () => (dispatch) => {
  dispatch({ type: REFRESH_BOOKING_REQUEST });
};
