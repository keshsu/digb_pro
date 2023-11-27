import React, { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step8Props {
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

const Step8: FC<Step8Props> = ({ setStep, methods }) => {
  const fieldEntities = [
    {
      type: "check",
      name: "tax_accepted",
      placeHolder: "Accepted",
      label: "Accepted",
      isRequired: true,
      fullRow: true,
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Accepted</h4>
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
      <div className="step-action-button my-3 d-flex align-items-center justify-content-between">
        <Button
          variant="primary"
          onClick={() => setStep((curr: number) => curr - 1)}
        >
          Back
        </Button>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Step8;
