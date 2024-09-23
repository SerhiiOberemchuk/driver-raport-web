"use client";

import { allTracksAsync } from "@/lib/feauters/tracks/trackSlice";
import { AppStore, makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import NextPersistWrapper from "next-persist/lib/NextPersistWrapper";
interface Props {
  readonly children: ReactNode;
}

const npConfig = {
  method: "localStorage",
  allowList: {
    userState: [],
    // trackSlice: ["stateItemOne", "stateItemTwo"],
    // modalSlice: [],
  },
};

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(allTracksAsync());
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <NextPersistWrapper wrapperConfig={npConfig}>
        {children}
      </NextPersistWrapper>
    </Provider>
  );
};
