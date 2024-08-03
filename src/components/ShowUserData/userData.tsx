"use client";

import React, { useEffect } from "react";
import styles from "./userData.module.css";
import { useUser } from "@clerk/nextjs";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import {
  allTracksAsync,
  selectAllTracks,
  selectStatusTrack,
} from "@/lib/feauters/tracks/trackSlice";

const UserData = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(allTracksAsync());
  }, [dispatch]);

  const tracks = useAppSelector(selectAllTracks) || [];

  const status = useAppSelector(selectStatusTrack);

  return (
    <div className={styles.userSection}>
      <h3>{user?.fullName}</h3>

      {/* {tracks.length > 0 && (
        <p>
          Camion: {tracks[tracks.length - 1].numberTrack}{" "}
          {tracks[tracks.length - 1].numberTrailer}
        </p>
      )} */}
    </div>
  );
};

export default UserData;
