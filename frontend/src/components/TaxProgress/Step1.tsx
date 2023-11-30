import React, { FC } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step1Props {
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

const Step1: FC<Step1Props> = ({ setStep, methods }) => {
  const handleNext = async (): Promise<void> => {
    const isValidNext: boolean = await methods.trigger();

    isValidNext && setStep((curr: number) => curr + 1);
  };

  const fieldEntities = [
    {
      type: "text",
      name: "name",
      placeHolder: "First Name",
      label: "First Name",
      isRequired: true,
      fullRow: false,
    },
    {
      type: "text",
      name: "surname",
      placeHolder: "Last Name",
      label: "Last Name",
      isRequired: true,
      fullRow: false,
    },
    {
      type: "email",
      name: "email",
      placeHolder: "Email Address",
      label: "Email Address",
      isRequired: true,
      fullRow: true,
    },
    {
      type: "text",
      name: "contact",
      placeHolder: "Contact",
      label: "Contact",
      isRequired: true,
      fullRow: true,
    },
  ];

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Account Info</h4>
      <div className="fields">
        <Row>
          {fieldEntities.map(
            (
              { type, name, placeHolder, label, fullRow, isRequired },
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

export default Step1;
