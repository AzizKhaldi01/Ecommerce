import React, { ReactNode } from "react";
import { Modal, Box, Typography } from "@mui/material";

interface ReusableModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  content?: ReactNode;
  actions?: ReactNode;
  width: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
  };
}

const UiModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  content,
  width,
  actions,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width, // Responsive width directly from props
          bgcolor: "background.paper",
          boxShadow: 24,
          px: 4,
          pb: 0,
          pt: 4,
          borderRadius: 2,
        }}
      >
        {title && (
          <Typography id="modal-title" variant="h6" mb={2}>
            {title}
          </Typography>
        )}
        <Typography id="modal-content" mb={3}>
          {content}
        </Typography>
        {actions && <Box mt={2}>{actions}</Box>}
      </Box>
    </Modal>
  );
};

export default UiModal;
