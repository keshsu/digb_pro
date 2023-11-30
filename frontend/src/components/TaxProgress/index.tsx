import React, { useEffect, useState } from "react";
import { Card, Form, Container, ProgressBar } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { alertService } from "services/alertService";
import { taxService } from "services/taxService";

import Step1 from "./Step1";
import Step2 from "./Step5";
import Step3 from "./Step2";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";

interface TaxDocsProps {
  file: File;
}
interface TaxMissingInfoProps {
  tax_info: String;
}

const TaxProgress: React.FC = () => {
  const methods = useForm({ mode: "all" });
  const [step, setStep] = useState<number>(0);

  const [data, setData] = useState<{ tax: any[] }>({
    tax: [],
  });

  // formSubmit
  const submit = (data: any) => {
    const _tax_docs = data?.tax_docs?.map((tax_doc: TaxDocsProps) => ({
      file: tax_doc?.file,
    }));

    const _tax_missing_info = data?.tax_missing_info?.map(
      (tax_missing_info: TaxMissingInfoProps) => ({
        file: tax_missing_info?.tax_info,
      })
    );

    const payload = {
      user: data?.user,
      tax_return: data?.tax_return ? "True" : "False",
      tax_review: data?.tax_review,
      tax_esign: data?.tax_esign,
      tax_submitted_to_irs: data?.tax_submitted_to_irs ? "True" : "False",
      tax_accepted: data?.tax_accepted ? "True" : "False",
      tax_doc: _tax_docs,
      tax_missing_info: _tax_missing_info,
    };

    let form_data = new FormData();

    if (payload?.tax_esign && payload.tax_esign?.name)
      form_data.append("tax_esign", payload.tax_esign, payload.tax_esign.name);

    form_data.append("user", payload?.user);
    form_data.append("tax_return", payload?.tax_return);
    form_data.append("tax_review", payload?.tax_review);
    form_data.append("tax_submitted_to_irs", payload?.tax_submitted_to_irs);
    form_data.append("tax_accepted", payload?.tax_accepted);

    for (let i = 0; i < payload?.tax_doc?.length; i++) {
      const taxDocEntry = Object.entries(payload?.tax_doc[i]);

      taxDocEntry.forEach(([key, value]: [string, any]) => {
        if (value?.file && value.file?.name) {
          form_data.append(
            `tax_docs[${i}][${key}]`,
            value.file,
            value.file.name
          );
        }
      });
    }

    for (let i = 0; i < payload?.tax_missing_info?.length; i++) {
      const taxMissingInfoEntry = Object.entries(payload?.tax_missing_info[i]);

      taxMissingInfoEntry.forEach(([key, value]: [string, any]) => {
        form_data.append(`tax_infos[${i}][${key}]`, value);
      });
    }

    createtaxprogress(form_data);
  };

  function createtaxprogress(fields: any) {
    taxService
      .create(fields)
      .then((res: any) => {
        if (res.status === 201) {
          alertService.success("Tax Progress added Successfully", {
            keepAfterRouteChange: true,
            autoClose: true,
          });
        } else {
          alertService.error(res.data, {
            keepAfterRouteChange: true,
            autoClose: true,
          });
        }
      })
      .catch((err: any) => {
        alertService.error(err, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      });
  }

  const stepper = [
    {
      id: 1,
      title: "Account info",
    },
    {
      id: 2,
      title: "Provide tax docs",
    },
    {
      id: 3,
      title: "Provide missing infos",
    },
    {
      id: 4,
      title: "Tax return progress",
    },
    {
      id: 5,
      title: "Review",
    },
    {
      id: 6,
      title: "eSign",
    },
    {
      id: 7,
      title: "Submitted to IRS",
    },
    {
      id: 8,
      title: "Accepted",
    },
  ];

  const [progress, setProgress] = useState<number>(0);
  const progressPercent: number = 100 / stepper.length;

  useEffect(() => {
    if (step) {
      setProgress((curr) => curr + progressPercent);
    }
  }, [step, progressPercent]);

  return (
    <>
      <Container>
        <Card className="custom-card w-100 m-auto mt-5 h-100 shadow-sm mb-4">
          <Card.Body className="pb-0">
            <ProgressBar now={progress} className="rounded-3"/>
            <div className="stepper position-relative d-flex align-items-center justify-content-center">
              {stepper.map((st, index) => (
                <>
                  {/* {stepper.length !== st.id ? (
                    <div
                      className={`stepper-dash flex-fill w-100 ${
                        step >= st.id + 1 ? "active" : ""
                      }`}
                    ></div>
                  ) : (
                    ""
                  )} */}
                  <div
                    className="stepper-step d-flex flex-column align-items-center justify-content-between flex-fill"
                    key={st.id}
                  >
                    <div
                      className={`stepper-step-info pt-4 d-flex align-items-center flex-column position-relative ${
                        step >= st.id ? "active" : ""
                      }`}
                    >
                      <h3>{st.title}</h3>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </Card.Body>
        </Card>
        <Card className="p-4 w-75 m-auto">
          <div className="university-form-wrapper">
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(submit)}>
                {step === 0 && <Step1 setStep={setStep} methods={methods} />}
                {step === 1 && <Step2 setStep={setStep} methods={methods} />}
                {step === 2 && <Step3 setStep={setStep} methods={methods} />}
                {step === 3 && <Step4 setStep={setStep} methods={methods} />}
                {step === 4 && <Step5 setStep={setStep} methods={methods} />}
                {step === 5 && <Step6 setStep={setStep} methods={methods} />}
                {step === 6 && <Step7 setStep={setStep} methods={methods} />}
                {step === 7 && <Step8 setStep={setStep} methods={methods} />}
              </Form>
            </FormProvider>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default TaxProgress;
