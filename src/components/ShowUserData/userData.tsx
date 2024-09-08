"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import {
  allTracksAsync,
  selectAllTracks,
  selectStatusTrack,
} from "@/lib/feauters/tracks/trackSlice";
import { Box, Title } from "@mantine/core";

const UserData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(allTracksAsync());
  }, [dispatch]);

  const user = {
    id: "jjjjj",
    fullName: "derrrr",
  };
  const tracks = useAppSelector(selectAllTracks) || [];

  const status = useAppSelector(selectStatusTrack);

  return (
    <Box>
      <Title order={2}>{user?.fullName}</Title>

      {/* {tracks.length > 0 && (
        <p>
          Camion: {tracks[tracks.length - 1].numberTrack}{" "}
          {tracks[tracks.length - 1].numberTrailer}
        </p>
      )} */}
    </Box>
  );
};

export default UserData;
