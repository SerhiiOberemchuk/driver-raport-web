import { Vehicle } from "@/types/types";
import axios from "axios";

export const fetchTracks = async () => {
  try {
    const response = await axios.get("/api/track");
    return response.data.vehicles;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const addNewVehicle = async ({ type, licensePlateNumber }: Vehicle) => {
  try {
    const response = await axios.post("api/track", {
      type,
      licensePlateNumber,
    });

    return response.data.vehicles;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
