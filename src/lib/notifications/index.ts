import { writable, type Writable } from "svelte/store";

export class Notification {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    close() {
        notifications.update((snackbars) => snackbars.filter((snackbar) => snackbar !== this));
    }
}

export const notifications: Writable<Notification[]> = writable([new Notification("Hello world 2"), new Notification("Hello world")]);

export const createSnackbar = (message: string) => {
    notifications.update((snackbars) => [new Notification(message), ...snackbars]);
};
