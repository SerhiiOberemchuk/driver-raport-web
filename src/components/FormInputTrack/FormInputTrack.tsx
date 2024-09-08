"use client";
import React from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "./Form";

type Props = {};

const FormInputTrack = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Agiungi mezzo"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Form close={close} />
      </Modal>

      <Button onClick={open}>Add new vehicle</Button>
    </>
  );
};

export default FormInputTrack;
