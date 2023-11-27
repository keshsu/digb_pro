import React, { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step4Props {
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

const Step4: FC<Step4Props> = ({ setStep, methods }) => {
  const handleNext = async (): Promise<void> => {
    const isValidNext: boolean = await methods.trigger();

    isValidNext && setStep((curr: number) => curr + 1);
  };

  const fieldEntities = [
    {
      type: "check",
      name: "tax_return",
      placeHolder: "Tax Return",
      label: "Tax Return",
      isRequired: true,
      fullRow: true,
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Tax Return In Progress</h4>
      <div className="fields">
        <Row>
          {fieldEntities.map(
            (
              { type, name, placeHolder, label, isRequired, fullRow },
              index
            ) => (
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
      </div>
      <div className="step-action-button my-3 d-flex align-items-center justify-content-end">
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

export default Step4;
