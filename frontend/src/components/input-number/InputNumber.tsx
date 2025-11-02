import React, { useRef, useEffect } from "react";
import { useController, type UseControllerProps } from "react-hook-form";
import { InputNumber as AntdInputNumber, Tooltip } from "antd";
import type { InputNumberProps as AntdInputNumberProps } from "antd";
import { BiErrorCircle } from "react-icons/bi";

type InputNumberPropsType = {
  name: string;
  defaultValue?: number | undefined;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rhfControllerProps: Omit<UseControllerProps<any>, "name" | "defaultValue">;
  customStyles?: React.CSSProperties;
  hasError?: boolean;
  antdInputNumberProps?: Omit<
    AntdInputNumberProps,
    "onChange" | "value" | "onBlur"
  >;
  onChange?: (value: number | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export const InputNumber = ({
  name,
  defaultValue = undefined,
  placeholder,
  customStyles = {},
  rhfControllerProps,
  hasError = false,
  antdInputNumberProps = {},
  onChange,
  onBlur,
}: InputNumberPropsType) => {
  const {
    field: { onChange: rhfOnChange, onBlur: rhfOnBlur, value, ref },
  } = useController({
    name,
    defaultValue,
    ...rhfControllerProps,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  /** attach react-hook-form ref manually */
  useEffect(() => {
    if (ref && inputRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref as any)(inputRef.current);
    }
  }, [ref]);

  /** safely handle value conversion */
  const handleChange = (val: string | number | null | undefined) => {
    let numVal: number | null = null;

    if (typeof val === "number") numVal = val;
    else if (typeof val === "string" && val.trim() !== "") {
      const parsed = Number(val);
      numVal = isNaN(parsed) ? null : parsed;
    }

    if (onChange) onChange(numVal);
    rhfOnChange(numVal);
  };

  const commonProps: AntdInputNumberProps & { "data-testid": string } = {
    placeholder,
    value,
    onChange: handleChange,
    onBlur: (e) => {
      if (onBlur) onBlur(e);
      rhfOnBlur();
    },
    style: { width: "100%", ...customStyles },
    className: `${
      hasError ? "border-error" : "py-2 px-3"
    } bg-secondary-200 !border-secondary-100 hover:bg-secondary-200 hover:border-primary text-white`,
    controls: true,
    "data-testid": name,
    ...antdInputNumberProps,
  };

  const errorSuffix = (
    <Tooltip title="Required field">
      <BiErrorCircle
        style={
          hasError
            ? { color: "var(--color-error)", fontSize: "1.2rem" }
            : { display: "none" }
        }
      />
    </Tooltip>
  );

  return (
    <div style={{ position: "relative" }}>
      <AntdInputNumber {...commonProps} ref={inputRef} />
      {hasError && (
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {errorSuffix}
        </span>
      )}
    </div>
  );
};
