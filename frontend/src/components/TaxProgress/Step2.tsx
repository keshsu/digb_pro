import React, { FC, ChangeEvent } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step3Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  methods: {
    trigger: () => Promise<boolean>;
    setValue: (name: string, value: any) => void;
    getValues: (name: string) => any;
    formState: {
      isValid: boolean;
    };
  };
}

const Step3: FC<Step3Props> = ({ setStep, methods }) => {
  const handleNext = async (): Promise<void> => {
    const isValidNext: boolean = await methods.trigger();

    isValidNext && setStep((curr: number) => curr + 1);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    methods.setValue(e.target.name, e.target.files);
  };

  const fieldEntities = [
    {
      type: "file",
      name: "file",
      placeHolder: "Tax Docs",
      label: "Tax Docs",
      onImageChange: handleImageChange,
      isRequired: false,
      fullRow: true,
      acceptType: "image/*", // Accept images
      isMulti: true, // Enable multiple file selection
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Provide tax docs</h4>
      <div className="fields">
        <Row>
          {fieldEntities.map(
            (
              {
                type,
                name,
                placeHolder,
                label,
                fullRow,
                onImageChange,
                isRequired,
                acceptType,
                isMulti,
              },
              index
            ) => (
              <Col sm={12} md={fullRow ? 12 : 6} key={index}>
                {type === "file" && methods?.getValues(name) ? (
                  <Image
                    height={120}
                    style={{ objectFit: "cover" }}
                    src={`${process.env.REACT_APP_BASE_URL}${methods?.getValues(
                      name
                    )}`}
                  />
                ) : null}
                <Input
                  type={type}
                  name={name}
                  isMulti={isMulti}
                  placeholder={placeHolder}
                  label={label}
                  onImageChange={onImageChange}
                  isRequired={isRequired}
                  acceptType={acceptType}
                />
              </Col>
            )
          )}
        </Row>
      </div>
      <div className="step-action-button my-3 d-flex align-items-center justify-content-between">
        <Button variant="primary" onClick={() => setStep((curr) => curr - 1)}>
          Back
        </Button>
        <Button
          variant="primary"
          // type="submit"
          onClick={handleNext}
          disabled={!methods?.formState?.isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
