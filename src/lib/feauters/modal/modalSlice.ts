import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isModalOpen?: boolean;
  titleModalWindow: string;
  description: string;
  typeModal: "alert" | "success" | "error";
}

const initialState: ModalState = {
  isModalOpen: false,
  titleModalWindow: "",
  description: "",
  typeModal: "success",
};
export const modalSlice = createAppSlice({
  name: "modal",
  initialState,
  reducers: (creators) => ({
    openModal: creators.reducer((state, actions: PayloadAction<ModalState>) => {
      state.titleModalWindow = actions.payload.titleModalWindow;
      state.description = actions.payload.description;
      state.isModalOpen = true;
    }),
    closeModal: creators.reducer((state) => {
      state.isModalOpen = false;
      state.titleModalWindow = "";
      state.typeModal = "success";
      state.description = "";
    }),
  }),
  selectors: { selectIsModalOpen: (state) => state.isModalOpen },
});
export const { openModal, closeModal } = modalSlice.actions;
export const { selectIsModalOpen } = modalSlice.selectors;

export default modalSlice.reducer;
