"use client";
import React from "react";

import clsx from "clsx";
import styles from "./Modal.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { closeModal } from "@/lib/feauters/modal/modalSlice";

interface ModalProps {}

const Toast: React.FC<ModalProps> = ({}) => {
  const { isModalOpen, titleModalWindow, description, typeModal } =
    useAppSelector((state) => state.modal);

  const distatch = useAppDispatch();

  const onClose = () => distatch(closeModal());

  return (
    <div
      className={`${styles.backdrop} ${isModalOpen ? styles.open : ""}`}
      onClick={onClose}
    >
      <div
        className={clsx(
          styles.modal,
          typeModal === "error" && styles.error,
          typeModal === "success" && styles.success,
          typeModal === "alert" && styles.alert
        )}
      >
        {" "}
        <h2>{titleModalWindow}</h2>
        <p>{description}</p>
        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
};
