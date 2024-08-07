"use client";
import React, { useState } from "react";
import Container from "@/components/container";
import { useAppDispatch } from "@/lib/hook";
import { openModal } from "@/lib/feauters/modal/modalSlice";
import { useUser } from "@clerk/nextjs";

type Props = {};

export default function RepotPage({}: Props) {
  const user = useUser();
  const dispatch = useAppDispatch();
  const titleModalWindow = `${user.user?.firstName} "tratata"`;

  return (
    <Container>
      <div>
        <h1>pegggggggg</h1>
        <button
          type="button"
          onClick={() => {
            dispatch(
              openModal({
                typeModal: "success",
                titleModalWindow,
                description: "yyyy",
              })
            );
          }}
        >
          Open modal
        </button>
      </div>
    </Container>
  );
}
