import React, { ReactNode } from "react";
import { Modal, Box, Typography } from "@mui/material";

interface ReusableModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  content?: ReactNode;
  actions?: ReactNode;
  width: string;
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
      className=" overflow-auto"
    >
      <div
        className={`absolute ${width} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    bg-white shadow-xl px-4 pt-4 pb-0 rounded-lg`}
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
      </div>
    </Modal>
  );
};

export default UiModal;
