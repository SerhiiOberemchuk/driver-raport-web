"use client";

import { Box, Button, Text } from "@mantine/core";
import React from "react";

type Props = { error: Error; reset: () => void };

function Error({ error, reset }: Props) {
  return (
    <Box>
      <Text>
        Error:<span>{error.message}</span>{" "}
      </Text>
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </Box>
  );
}

export default Error;
