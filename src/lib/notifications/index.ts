import { writable, type Writable } from "svelte/store";

const options = {
    duration: 2000, // ms
    maxAmount: 3,
};

export class Notification {
    message: string;
    duration: number;
    id: number;

    constructor(message: string, duration: number = options.duration) {
        this.message = message;
        this.duration = duration;
        this.id = Date.now();

        setTimeout(() => this.close(), this.duration);
    }

    close() {
        notifications.update((snackbars) => snackbars.filter((snackbar) => snackbar !== this));
    }
}

const limitNotificationAmount = (snackbars: Notification[]) => {
    if (snackbars.length > options.maxAmount) {
        snackbars[snackbars.length - 1].close();
    }
};

export const notifications: Writable<Notification[]> = writable([]);
notifications.subscribe(limitNotificationAmount);

export const createNotification = (message: string) => {
    notifications.update((snackbars) => {
        return [new Notification(message), ...snackbars];
    });
};
