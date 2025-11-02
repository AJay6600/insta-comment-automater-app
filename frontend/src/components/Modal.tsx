import { Modal as AntdModal } from "antd";
import type React from "react";
import { IoCloseSharp } from "react-icons/io5";

type ModalPropsType = {
  isOpen: boolean;
  title?: React.ReactNode;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalPropsType) => {
  return (
    <AntdModal
      open={isOpen}
      footer={null}
      maskClosable={false}
      title={title}
      closeIcon={<IoCloseSharp size={22} color="var(--color-primary)" />}
      onCancel={() => onClose(false)}
      className="p-0 border border-secondary-100 rounded-lg shadow-glow-accent"
      styles={{
        header: {
          backgroundColor: "var(--color-modalBg)",
        },
        body: {
          marginTop: "20px",
        },
        content: {
          backgroundColor: "var(--color-modalBg)",
          borderColor: "white",
        },
        mask: { backgroundColor: "var(--color-modalMaskBg)" },
      }}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
