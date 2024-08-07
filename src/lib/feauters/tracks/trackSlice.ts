import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addNewVehicle, fetchTracks } from "./trackApi";
import { Vehicle } from "@/types/types";

export interface TracksSliceState {
  tracksArrey: Vehicle[];
  status: "idle" | "loading" | "failed";
  error: null | string;
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
    increment: create.reducer((state) => {}),

    allTracksAsync: create.asyncThunk(
      async () => {
        const data = await fetchTracks();

        if (!data) throw new Error("ooppsss");
        return data;
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
      async ({ type, licensePlateNumber }: Partial<Vehicle>) => {
        const data = await addNewVehicle({ type, licensePlateNumber });
        return data;
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.tracksArrey = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to add vehicle";
        },
      }
    ),
  }),

  selectors: {
    selectAllTracks: (state) => state.tracksArrey || [],
    selectStatusTrack: (state) => state.status,
    selectErrorTrack: (state) => state.error,
  },
});

export const { allTracksAsync, increment, addNewVehicleAsync } =
  trackSlice.actions;
export const { selectAllTracks, selectStatusTrack, selectErrorTrack } =
  trackSlice.selectors;

export default trackSlice.reducer;
