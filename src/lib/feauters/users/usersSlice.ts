import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { showNotification } from "@mantine/notifications";
import { User } from "@/types/userTypes";
import { getLocalStore } from "next-persist";
export interface UserSliceState {
  user: {};
  status: "idle" | "loading" | "failed";
  error: null | string | {};
  isLogined: boolean;
}

const initialState: UserSliceState = {
  user: {},
  status: "idle",
  error: null,
  isLogined: false,
};

const persistedState = getLocalStore("userState", initialState);

export const userSlice = createAppSlice({
  name: "userState",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state) => {
      // Example reducer function
    }),

    // geoooooooAsync: create.asyncThunk(
    //   async (_, thunkApi) => {
    //     try {
    //       const response = await axios.get("/api/track");
    //       return response.data;
    //     } catch (error) {
    //       const axiosError = error as AxiosError;
    //       const errorMessage =
    //         axiosError.response?.data || axiosError.message || "Unknown error";
    //       toast.error(`${errorMessage}`, { theme: "colored" });
    //       return thunkApi.rejectWithValue(errorMessage);
    //     }
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //       state.error = null;
    //     },
    //     fulfilled: (state, action: PayloadAction<Vehicle[]>) => {
    //       state.status = "idle";
    //       state.tracksArrey = action.payload;
    //     },
    //     rejected: (state, action) => {
    //       state.status = "failed";
    //       state.error = action.error.message || "Failed to fetch tracks";
    //     },
    //   }
    // ),

    createUserAsync: create.asyncThunk(
      async ({ name, password, surname, email }: Partial<User>, thunkApi) => {
        try {
          const response = await axios.post("api/register", {
            name,
            password,
            surname,
            email,
          });

          if (response.status === 200) {
            showNotification({
              title: "Success",
              message: "Your registered successfuly",
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
            message: `${errorMessage}`,
            title: "Error",
            color: "red",
          });
          return thunkApi.rejectWithValue(errorMessage);
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<User>) => {
          state.status = "idle";
          state.user = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Failed to create user";
        },
        settled: () => {},
      }
    ),

    userLoginAsync: create.asyncThunk(
      async ({ email, password }: Partial<User>, thunkApi) => {
        try {
          const response = await axios.post(`api/login`, {
            email,
            password,
          });

          if (response.status === 200) {
            showNotification({
              title: "Success",
              message: "Your logined successfuly",
              color: "green",
              autoClose: 3000,
              withCloseButton: true,
            });
          }

          return response.data;
        } catch (error) {
          const axiosError = error as AxiosError;
          console.log(axiosError);

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
        pending: (state = persistedState) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state = persistedState, action: PayloadAction<User>) => {
          state.status = "idle";
          state.user = action.payload;
          state.isLogined = true;
        },
        rejected: (state = persistedState, action) => {
          state.status = "failed";
          state.error = action.payload ?? action.error;
          state.isLogined = false;
        },
        settled: () => {},
      }
    ),
  }),

  selectors: {
    selectUser: (state) => state.user,
    selectStatusUser: (state) => state.status,
    selectErrorUser: (state) => state.error,
  },
});

export const { createUserAsync, userLoginAsync } = userSlice.actions;

export const { selectErrorUser, selectStatusUser, selectUser } =
  userSlice.selectors;

export default userSlice.reducer;
