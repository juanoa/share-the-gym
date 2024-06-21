import React, {useLayoutEffect, useRef, useState} from "react";
import {Box, TextField} from "@radix-ui/themes";
import {DetectClickOutside} from "@/components/detect-click-outside/detect-click-outside";
import styles from "@/components/input-box/input-box.module.css";

interface Props {
  value: string | number;
  onChange: (value: string) => void;
  type?: "number" | "text";
  size?: "1" | "2" | "3";
  children: React.ReactNode;
  maxWidth?: string;
  slot?: React.ReactNode;
}

export const InputBox: React.FC<Props> = ({value, onChange, type = "text", children, size = "1", maxWidth = "50px", slot}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [tempValue, setTempValue] = useState<string>(value.toString())
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select()
    }
  }, [isEditing])

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnChange()
    }
  }

  const handleOnChange = () => {
    setIsEditing(false)
    onChange(tempValue)
  }


  if (isEditing) {
    return (
      <DetectClickOutside onClickOutside={handleOnChange}>
        <Box maxWidth={maxWidth}>
          <TextField.Root
            size={size}
            value={tempValue}
            onChange={(e) => setTempValue(e.currentTarget.value)}
            autoFocus
            type={type}
            onKeyDown={handleOnEnter} ref={inputRef}
            className={styles.input}
          >
            {slot && <TextField.Slot side="right">{slot}</TextField.Slot>}
          </TextField.Root>
        </Box>
      </DetectClickOutside>
    )
  }

    return <div onClick={() => setIsEditing(true)}>{children}</div>
}