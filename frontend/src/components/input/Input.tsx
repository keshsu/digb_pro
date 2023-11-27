import React, { FC, ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  isMulti?: boolean;
  options?: { value: string; label: string }[];
  onImageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  acceptType?: string;
}

const Input: FC<InputProps> = (props) => {
  const { control, getValues } = useFormContext();
  const {
    name,
    type,
    placeholder,
    label,
    onImageChange,
    isRequired = false,
    acceptType = "",
    isMulti = false,
  } = props;

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field: { onChange, value, ref } }) => (
          <Form.Group className="mb-3" ref={ref}>
            {type === "file" ? (
              <Form.Label className="w-100 m-0">
                {label}
                <div className="position-relative cursor-pointer mt-2">
                  <Form.Control
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onImageChange && onImageChange(e)
                    }
                    type="file"
                    name={name}
                    placeholder={placeholder}
                    required={isRequired}
                    accept={acceptType}
                    multiple={isMulti}
                  />
                  <span className="file-custom"></span>
                </div>
              </Form.Label>
            ) : type === "check" ? (
              <>
                <Form.Label className="w-100">{label}</Form.Label>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Active"
                    id="radio1"
                    onChange={onChange}
                    inline
                    checked={
                      value === "true" || getValues(name) === true
                        ? true
                        : false
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="Inactive"
                    id="radio2"
                    onChange={onChange}
                    inline
                    checked={
                      value === "false" || getValues(name) === false
                        ? true
                        : false
                    }
                  />
                </Form.Group>
              </>
            ) : type === "description" ? (
              <>
                <Form.Label className="w-100">{label}</Form.Label>
                <div className="form-control p-0 overflow-hidden">
                  <textarea id="inputText" onChange={onChange} name={name}>
                    {value}
                  </textarea>
                </div>
              </>
            ) : (
              <>
                <Form.Label className="w-100">{label}</Form.Label>
                <Form.Control
                  onChange={onChange}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={value || ""}
                />
              </>
            )}
          </Form.Group>
        )}
      />
    </div>
  );
};

export default Input;
