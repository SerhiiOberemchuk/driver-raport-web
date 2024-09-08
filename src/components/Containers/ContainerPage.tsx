import React from "react";
import { Container } from "@mantine/core";

type Props = { children: React.ReactNode };

const ContainerPage = ({ children }: Props) => {
  return (
    <Container fluid h="100vh" pt={70} bg="var(--mantine-color-gray-light)">
      {children}
    </Container>
  );
};

export default ContainerPage;
