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

export const addNewVehicle = async ({
  type,
  licensePlateNumber,
}: Partial<Vehicle>) => {
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

interface Request {
  id: string;
  data: {
    isUse: boolean;
    userData: {
      userId: string;
      userFullName: string;
      dateStart?: Date;
      dateFinish?: Date;
    };
  };
}
export const addNewDataTrack = async ({ id, data }: Request) => {
  try {
    const response = await axios.patch(`api/track/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
