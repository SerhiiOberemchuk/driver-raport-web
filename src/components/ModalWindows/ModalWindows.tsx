"use client";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clsx from "clsx";
import styles from "./Modal.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { closeModal, selectIsModalOpen } from "@/lib/feauters/modal/modalSlice";

interface ModalProps {}

const Modal: React.FC<ModalProps> = ({}) => {
  const { isModalOpen, titleModalWindow, description, typeModal } =
    useAppSelector((state) => state.modal);

  const distatch = useAppDispatch();

  const onClose = () => distatch(closeModal());

  const fade = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? `translateY(0)` : `translateY(-200%)`,
    config: { mass: 1, tension: 200, friction: 26 },
  });

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (!down && mx < 10 && my < 10) onClose();
  });

  return (
    <div
      className={`${styles.backdrop} ${isModalOpen ? styles.open : ""}`}
      onClick={onClose}
    >
      <animated.div
        className={clsx(
          styles.modal,
          typeModal === "error" && styles.error,
          typeModal === "success" && styles.success,
          typeModal === "alert" && styles.alert
        )}
        style={fade}
        {...bind()}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{titleModalWindow}</h2>
        <p>{description}</p>
        <button onClick={onClose}>Chiudi</button>
      </animated.div>
    </div>
  );
};

export default Modal;
