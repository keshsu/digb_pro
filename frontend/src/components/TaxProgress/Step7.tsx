import React, { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step7Props {
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

const Step7: FC<Step7Props> = ({ setStep, methods }) => {
  const handleNext = async (): Promise<void> => {
    const isValidNext: boolean = await methods.trigger();

    isValidNext && setStep((curr: number) => curr + 1);
  };

  const fieldEntities = [
    {
      type: "check",
      name: "tax_submitted_to_irs",
      placeHolder: "Tax Submitted to IRS",
      label: "Submitted",
      isRequired: true,
      fullRow: true,
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Submitted to IRS</h4>
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

export default Step7;
