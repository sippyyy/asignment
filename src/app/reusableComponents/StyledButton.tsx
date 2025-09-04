import React from 'react'

interface StyledButtonProps {
  textTitle: string,
  isDisabled: boolean,
  onClick: () => void,
  type?: "button" | "submit" | "reset",
  className?: string,
}

const StyledButton = ({ textTitle, isDisabled, onClick, type = "button", className }: StyledButtonProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className="w-full cursor-pointer bg-main-venice hover:bg-main-shine disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-xl rounded-md transition-colors text-lg"
    >
      {textTitle}
    </button>
  )
}
export default StyledButton;
