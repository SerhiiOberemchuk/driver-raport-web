"use client";
import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/lib/hook";
import { selectAllTracks } from "@/lib/feauters/tracks/trackSlice";
import { VEHICLE_TYPE, VehicleType } from "@/types/types";
import ButtonTake from "./ButtonsTake";
import ButtonPut from "./ButtonPut";
import { Box, Flex, Select } from "@mantine/core";

type VehicleSelectProps = {
  label: string;
  placeholder: string;
  vehicleType: VehicleType;
  selectedVehicleId: string | null;
  onChange: (value: string | null) => void;
  clear: () => void;
};

function VehicleSelect({
  label,
  placeholder,
  vehicleType,
  selectedVehicleId,
  onChange,
  clear,
}: VehicleSelectProps) {
  const tracks = useAppSelector(selectAllTracks);

  const vehicleOptions = useMemo(() => {
    if (tracks && tracks.length > 0) {
      const array = tracks
        ?.filter((item) => item.type === vehicleType)
        .map((item) => ({
          value: item._id,
          label: `${item.licensePlateNumber}${
            item.isUse
              ? ` (${item.users[item.users.length - 1].userFullName})`
              : ""
          }`,
        }));
      return array;
    } else {
      return [];
    }
  }, [tracks, vehicleType]);

  return (
    <Box>
      <Select
        label={label}
        placeholder={placeholder}
        data={vehicleOptions}
        searchable
        onClear={() => console.log()}
        onChange={onChange}
        defaultValue=""
        allowDeselect
        clearable
        comboboxProps={{
          transitionProps: { transition: "pop", duration: 200 },
        }}
        nothingFoundMessage="Se non hai trovarto veicolo vai sotto e agiungi nuovo mezzo"
      />
      {selectedVehicleId && (
        <Flex gap="lg">
          <ButtonTake
            clear={clear}
            selectedVehicleId={selectedVehicleId}
            title={`Prendo ${vehicleType}`}
          />
          <ButtonPut
            clear={clear}
            selectedVehicleId={selectedVehicleId}
            title={`Lascio ${vehicleType}`}
          />
        </Flex>
      )}
    </Box>
  );
}

function SelectUserVehicle() {
  const [trackId, setTrackId] = useState<string | null>(null);
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [furgoneId, setFurgoneId] = useState<string | null>(null);

  const handleClearSelect = () => {
    setTrackId(null);
    setTrailerId(null);
    setFurgoneId(null);
  };
  return (
    <>
      <VehicleSelect
        clear={handleClearSelect}
        label="Uso camion:"
        placeholder="Camion"
        vehicleType={VEHICLE_TYPE.track}
        selectedVehicleId={trackId}
        onChange={setTrackId}
      />
      <VehicleSelect
        clear={handleClearSelect}
        label="Uso rimorchio"
        placeholder="Rimorchio"
        vehicleType={VEHICLE_TYPE.trailer}
        selectedVehicleId={trailerId}
        onChange={setTrailerId}
      />
      <VehicleSelect
        clear={handleClearSelect}
        label="Uso furgone:"
        placeholder="Furgone"
        vehicleType={VEHICLE_TYPE.furgone}
        selectedVehicleId={furgoneId}
        onChange={setFurgoneId}
      />
    </>
  );
}

export default SelectUserVehicle;
