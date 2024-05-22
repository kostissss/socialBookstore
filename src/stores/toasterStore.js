import { defineStore } from 'pinia';

export const useToasterStore = defineStore({
    id: 'toaster',
    state: () => ({
        toasts: [],
    }),
    actions: {
        addToast(toast) {


            this.toasts.push(toast);


            setTimeout(() => {
                this.removeToast(toast);
            }, 3000);
        },
        removeToast(toast) {
            this.toasts = this.toasts.filter((t) => t !== toast);
        },
    },
});