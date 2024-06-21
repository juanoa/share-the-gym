import { Routine } from "@/types/Routine";
import React, {useState} from "react";
import {Share2Icon} from "@radix-ui/react-icons";
import {Button} from "@radix-ui/themes";

export interface Props {
  routine: Routine;
}

export const ShareRoutineButton: React.FC<Props> = ({routine}) => {
  const [isCopied, setIsCopied] = useState(false);

  const onHandleClick = () => {
    const routineString = JSON.stringify(routine);
    const encodedRoutine = encodeURIComponent(routineString);
    const url = `${window.location.origin}/routine/${encodedRoutine}`;
    navigator.clipboard.writeText(url).then(() => setIsCopied(true));
  }

  return (
    <Button size="3" variant="soft" onClick={onHandleClick}>
      <Share2Icon/> {isCopied ? "URL Copied!" : "Share"}
    </Button>
  )
}