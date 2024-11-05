// src/components/Button.tsx
import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: "contained" | "outlined" | "text"; // Use MUI variants
  isLoading?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  borderColor?: string;
  styles?: string;
  rippleColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  variant = "contained",
  isLoading = false,
  disabled = false,
  type = "submit",
  rounded = false,
  fullWidth = false,
  borderColor = "#e5e7eb",
  rippleColor = "#6c6c6c",
  styles,
}) => {
 
  const backgroundColor = "#2684FF"

  return (
    <Button
      type={type}
      sx={{
        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
          backgroundColor: rippleColor,
        },
        backgroundColor: variant === "contained" ? backgroundColor : undefined,
        color: variant === "contained" ? "#fff" : undefined, // Set text color for readability
        "&:hover": {
          backgroundColor:
            variant === "contained" ? `${backgroundColor}CC` : undefined, // Slightly darken on hover
        },
      }}
      onClick={isLoading || disabled ? undefined : onClick}
      variant={variant}
      disabled={isLoading || disabled}
      className={` overflow-hidden  shadow-none `}
      fullWidth={fullWidth}
      style={{
        boxShadow: "none",
        borderRadius: rounded ? "50px" : "4px",
        border:
          variant === "outlined" && borderColor
            ? `1px solid ${borderColor}`
            : undefined, // Apply border color if outlined
      }}
      endIcon={
        isLoading ? (
          <div className=" absolute top-0   case right-0 w-full h-full flex items-center justify-center bg-gray-100">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : null
      } // Show loader when loading
    >
      <span style={{ textTransform: "none" }} className={styles}>
        {children}
      </span>
    </Button>
  );
};

export default CustomButton;
