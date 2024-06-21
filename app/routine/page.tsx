"use client";

import React from "react";
import {Routine} from "@/types/Routine";
import {RoutineContainer} from "@/components/routine-container/routine-container";

export default function Page() {
  return (
    <main>
      <RoutineContainer routineValue={Routine.createDefault()} />
    </main>
  );
}
