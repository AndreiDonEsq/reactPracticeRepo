import React from "react";
import { useState } from "react";
import { type ComponentPropsWithoutRef } from "react";


type WithLoadingButtonProps = ComponentPropsWithoutRef<'button'> & {
  onClick: () => Promise<void> | void;
  theme: 'light' | 'dark';
};

export default function WithLoadingButton({ onClick, children, ...rest }: WithLoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleInternalClick() {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  }

  return (
    <button
      {...rest}
      className={`with-loading-button ${rest.className || ''} ${rest.theme}`}
      onClick={handleInternalClick}
      disabled={isLoading}>
      {isLoading ? "Loading..." : children}
    </button>
  );
}
