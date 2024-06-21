'use client';

import {Routine} from "@/types/Routine";
import {RoutineContainer} from "@/components/routine-container/routine-container";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const routineDecoded = decodeURIComponent(params.slug);
  const routineParsed: Routine = JSON.parse(routineDecoded);

  return (
    <main>
      <RoutineContainer routineValue={routineParsed} />
    </main>
  );
}