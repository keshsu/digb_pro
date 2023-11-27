import { Subject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

interface Alert {
  id?: string;
  type: string;
  message: string;
}

const alertSubject = new Subject<Alert>();
const defaultId = "default-alert";

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
};

export const alertType = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

function onAlert(id: string = defaultId): Observable<Alert> {
  return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

function success(message: string, options?: any) {
  alert({ ...options, type: alertType.success, message });
}

function error(message: string, options?: any) {
  alert({ ...options, type: alertType.error, message });
}

function info(message: string, options?: any) {
  alert({ ...options, type: alertType.info, message });
}

function warn(message: string, options?: any) {
  alert({ ...options, type: alertType.warning, message });
}

function alert(alert: Alert) {
  alert.id = alert.id || defaultId;
  alertSubject.next(alert);
}

function clear(id: string = defaultId) {
//   alertSubject.next({ id });
}
