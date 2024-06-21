import React, {useEffect, useRef} from "react";

interface Props {
  onClickOutside: () => void;
  children: React.ReactNode;

}

export const DetectClickOutside: React.FC<Props> = ({onClickOutside, children}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, [onClickOutside, ref]);

  return <div ref={ref}>{children}</div>
}