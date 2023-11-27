import React, { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step5Props {
  setStep: (step: number) => void;
  methods: {
    trigger: () => Promise<boolean>;
    formState: {
      isValid: boolean;
    };
  };
}

const Step5: FC<Step5Props> = ({ setStep, methods }) => {
  const handleNext = async (): Promise<void> => {
    const isValidNext = await methods.trigger();

    isValidNext && setStep((curr) => curr + 1);
  };
  const fieldEntities = [
    {
      type: "description",
      name: "tax_review",
      placeHolder: "Review",
      label: "Review",
      fullRow: true,
      isRequired: true,
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Review</h4>
      <Row>
        {fieldEntities.map(
          ({ type, name, placeHolder, label, fullRow, isRequired }, index) => (
            <Col sm={12} md={fullRow ? 12 : 6} key={index}>
              <Input
                type={type}
                name={name}
                placeholder={placeHolder}
                label={label}
                isRequired={isRequired}
              />
            </Col>
          )
        )}
      </Row>
      <div className="step-action-button my-3 d-flex align-items-center justify-content-between">
        <Button variant="primary" onClick={() => setStep((curr) => curr - 1)}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!methods?.formState?.isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step5;
