import {isString} from "lodash";
import {NotificationManager} from "react-notifications";

export const createNotification = (status = 'success', message = 'Done!') => {
    switch (status) {
        case 'info':
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message);
            break;
        case 'warning':
            NotificationManager.warning(message);
            break;
        case 'error':
            NotificationManager.error(message);
            break;
    }
};
export const summarizeIfLong = (text, threshold = 35) => {
    return !isString(text) || text.length < threshold ? text : text.substring(0, threshold - 5) + '...';
};
