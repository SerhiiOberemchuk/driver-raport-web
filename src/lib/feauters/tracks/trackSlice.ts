import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Vehicle, VehicleUser } from "../../../models/VehicleModel";
import axios, { AxiosError } from "axios";
import { showNotification } from "@mantine/notifications";

export interface TracksSliceState {
  tracksArrey: Vehicle[];
  status: "idle" | "loading" | "failed";
  error: null | string | {};
}

const initialState: TracksSliceState = {
  tracksArrey: [],
  status: "idle",
  error: null,
};

export const trackSlice = createAppSlice({
  name: "tracks",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state) => {
      // Example reducer function
    }),

    allTracksAsync: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const response = await axios.get("/api/track");
          return response.data;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            axiosError.response?.data || axiosError.message || "Unknown error";
          showNotification({
            title: "Error",
            message: `${errorMessage}`,
            color: "green",
            autoClose: 3000,
            withCloseButton: true,
          });
          return thunkApi.rejectWithValue(errorMessage);
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<Vehicle[]>) => {
          state.status = "idle";
          state.tracksArrey = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch tracks";
        },
      }
    ),

    addNewVehicleAsync: create.asyncThunk(
      async ({ type, licensePlateNumber }: Partial<Vehicle>, thunkApi) => {
        try {
          const response = await axios.post("api/track", {
            type,
            licensePlateNumber,
          });

          if (response.status === 200) {
            showNotification({
              title: "Success",
              message: "Vehicle added successfuly",
              color: "green",
              autoClose: 3000,
              withCloseButton: true,
            });
          }
          return response.data;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            axiosError.response?.data || axiosError.message || "Unknown error";
          showNotification({
            title: "Error",
            message: `${errorMessage}`,
            color: "red",
            autoClose: 3000,
            withCloseButton: true,
          });
          return thunkApi.rejectWithValue(errorMessage);
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<Vehicle[]>) => {
          state.status = "idle";
          state.tracksArrey = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to add vehicle";
        },
        settled: () => {},
      }
    ),

    pickupVehicleAsync: create.asyncThunk(
      async (
        {
          id,
          data,
        }: {
          id: string;
          data: { isUse: boolean; userData: VehicleUser };
        },
        thunkApi
      ) => {
        try {
          const response = await axios.patch(`api/track/pickup/${id}`, data);
          if (response.status === 200) {
            showNotification({
              title: "Success",
              message: "You have pick up vehicle successfuly",
              color: "green",
              autoClose: 3000,
              withCloseButton: true,
            });
          }
          return response.data;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            axiosError.response?.data || axiosError.message || "Unknown error";
          showNotification({
            title: "Error",
            message: `${errorMessage}`,
            color: "red",
            autoClose: 3000,
            withCloseButton: true,
          });
          return thunkApi.rejectWithValue(errorMessage);
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<Vehicle[]>) => {
          state.status = "idle";
          state.tracksArrey = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload ?? action.error;
        },
        settled: () => {},
      }
    ),
    putVehicleAsync: create.asyncThunk(
      async (
        {
          id,
          data,
        }: {
          id: string;
          data: { isUse: boolean; userData: VehicleUser };
        },
        thunkApi
      ) => {
        try {
          const response = await axios.patch(`api/track/put/${id}`, data);
          if (response.status === 200) {
            showNotification({
              title: "Success",
              message: "You have put vehicle successfuly",
              color: "green",
              autoClose: 3000,
              withCloseButton: true,
            });
          }
          return response.data;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            axiosError.response?.data || axiosError.message || "Unknown error";
          showNotification({
            title: "Error",
            message: `${errorMessage}`,
            color: "red",
            autoClose: 3000,
            withCloseButton: true,
          });

          return thunkApi.rejectWithValue(errorMessage);
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<Vehicle[]>) => {
          state.status = "idle";
          state.tracksArrey = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload ?? action.error;
        },
        settled: () => {},
      }
    ),
  }),

  selectors: {
    selectAllTracks: (state) => state.tracksArrey || [],
    selectStatusTrack: (state) => state.status,
    selectErrorTrack: (state) => state.error,
  },
});

export const {
  allTracksAsync,
  increment,
  addNewVehicleAsync,
  pickupVehicleAsync,
  putVehicleAsync,
} = trackSlice.actions;

export const { selectAllTracks, selectStatusTrack, selectErrorTrack } =
  trackSlice.selectors;

export default trackSlice.reducer;
