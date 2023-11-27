import React, { FC, useEffect, useState } from "react";
import { Button, Col, FormLabel, Row } from "react-bootstrap";

import Input from "../input/Input";

interface Step2Props {
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

const Step2: FC<Step2Props> = ({ setStep, methods }) => {
  const [taxt_missing_infos, setTaxMissingInfos] = useState([]);
  const [addTaxMissingInfo, setAddTaxMissingInfo] = useState(true);

  const handleNext = async (): Promise<void> => {
    const isValidNext: boolean = await methods.trigger();

    isValidNext && setStep((curr: number) => curr + 1);
  };

  const fieldEntities = [
    {
      type: "description",
      name: "taxt_missing_infos",
      placeHolder: "Tax Missing Info",
      label: "Tax Missing Info",
      fullRow: true,
      isRequired: true,
    },
  ];

  useEffect(() => {
    methods.setValue("taxt_missing_infos", taxt_missing_infos);
    setTaxMissingInfos(true);
  }, [taxt_missing_infos]);

  
  const addTaxMissingInfoHandler = () => {
    methods.setValue("tax_info", "");
  };

  const editTaxMissingInfoHandler = (id) => {
    const course = taxt_missing_infos.filter((course) => course.id === id)[0];

    setAddTaxMissingInfo(false);
    setId(id);
    methods.setValue("courseDescription", course?.description);
  };

  const updateTaxMissingInfoHandler = () => {
    let course = taxt_missing_infos.filter((course) => course.id === id)[0];

    course.description = methods.getValues("courseDescription");
    
    const taxt_missing_infosArray = taxt_missing_infos.filter((course) => course.id !== id);

    setTaxMissingInfos([...taxt_missing_infosArray, course]);
    methods.setValue("courseName", "");
    methods.setValue("courseHandbook", "");
    methods.setValue("courseDescription", "");
    methods.setValue("courseStatus", "");
  };

  const deleteTaxMissingInfoHandler = (id) => {
    const taxt_missing_infosArray = taxt_missing_infos.filter((course) => course.id !== id);

    setTaxMissingInfos([...taxt_missing_infosArray]);
  };

  return (
    <div className="university-step">
      <div className="step-divider"></div>
      <h4 className="university-step-label">Missing Infos</h4>
      {taxt_missing_infos?.map((t_info, index) => (
        <div key={index}>
          <div className="singleCourse my-4">
            <FormLabel>{t_info?.tax_info}</FormLabel>
            <div className="course-action-button-wrapper position-absolute">
              <button
                onClick={() => editCourseHandler(t_info?.id)}
                type="button"
                className="button small ghost course-action-button"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteCourseHandler(t_info?.id)}
                className="button small ghost course-action-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <h4 className="university-step-label">Provide Missing Info</h4>
      <div className="fields">
        <Row>
          {fieldEntities.map(
            (
              { type, name, placeHolder, label, fullRow, isRequired },
              index
            ) => (
              <Col sm={12} md={fullRow ? 12 : 6} key={index}>
                <Input
                  type={type}
                  name={name}
                  label={label}
                  isRequired={isRequired}
                  placeholder={placeHolder}
                />
              </Col>
            )
          )}
          
          <div className="my-3 d-flex justify-content-center w-100">
              <button
                className="add-course-btn button ghost small w-button w-100"
                onClick={addTaxMissingInfo ? addTaxMissingInfoHandler : updateTaxMissingInfoHandler}
              >
                {addTaxMissingInfo ? "Add TaxMissingInfo" : "Update TaxMissingInfo"}
              </button>
            </div>
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

export default Step2;
