import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { history } from "utils/history";
import { alertService, alertType } from "services/alertService";

interface AlertProps {
  id?: string;
  fade?: boolean;
}

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: "default-alert",
  fade: true,
};

const Alert: React.FC<AlertProps> = ({ id, fade }) => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      // clear alerts when an empty alert is received
      if (!alert.message) {
        // filter out alerts without 'keepAfterRouteChange' flag
        const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

        // remove 'keepAfterRouteChange' flag on the rest
        filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);

        setAlerts(filteredAlerts);
        return;
      }

      // add alert to array
      setAlerts([...alerts, alert]);

      // auto close alert if required
      // if (alert.autoClose) {
      //   setTimeout(() => removeAlert(alert), 3000);
      // }
    });

    // clear alerts on location change
    const historyUnlisten = history.listen(() => {
      alertService.clear(id);
    });

    return () => {
      // unsubscribe & unlisten to avoid memory leaks
      subscription.unsubscribe();
      historyUnlisten();
    };
  }, [id, alerts]);

  const removeAlert = (alertToRemove: any) => {
    if (fade) {
      // fade out alert
      const alertWithFade = { ...alertToRemove, fade: true };

      setAlerts((prevAlerts) =>
        prevAlerts.map((x) => (x === alertToRemove ? alertWithFade : x))
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((prevAlerts) =>
          prevAlerts.filter((x) => x !== alertWithFade)
        );
      }, 250);
    } else {
      // remove alert
      setAlerts((prevAlerts) => prevAlerts.filter((x) => x !== alertToRemove));
    }
  };

  const cssClasses = (alert: any) => {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [alertType.success]: "alert alert-success",
      [alertType.error]: "alert alert-danger",
      [alertType.info]: "alert alert-info",
      [alertType.warning]: "alert alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  };

  if (!alerts.length) return null;

  return (
    <div className="alert-bar position-fixed end-0 w-auto bottom-0">
      {alerts.map((alert, index) => (
        <div key={index} className={cssClasses(alert)}>
          <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          <button
            className="close button p-2"
            onClick={() => removeAlert(alert)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export default Alert;
