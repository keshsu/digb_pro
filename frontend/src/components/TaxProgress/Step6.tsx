import React, { FC, ChangeEvent } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step6Props {
  setStep: (step: number) => void;
  methods: {
    trigger: () => Promise<boolean>;
    setValue: (name: string, value: any) => void;
    getValues: (name: string) => any;
    formState: {
      isValid: boolean;
    };
  };
}

const Step6: FC<Step6Props> = ({ setStep, methods }) => {
  const handleNext = async (): Promise<void> => {
    const isValidNext: boolean = await methods.trigger();

    isValidNext && setStep((curr: number) => curr + 1);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    methods.setValue(e.target.name, e.target.files ? e.target.files[0] : "");
  };

  const fieldEntities = [
    {
      type: "file",
      name: "tax_esign",
      placeHolder: "Tax eSign",
      label: "Tax eSign",
      onImageChange: handleImageChange,
      isRequired: false,
      fullRow: true,
      acceptType: "image/*", // Accept images
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">eSign</h4>
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
              },
              index
            ) => (
              <Col sm={12} md={fullRow ? 12 : 6} key={index}>
                <Input
                  type={type}
                  name={name}
                  label={label}
                  placeholder={placeHolder}
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

export default Step6;
