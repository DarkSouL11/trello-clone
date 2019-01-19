import { extendObservable, action } from 'mobx';

class DialogStore {
  constructor() {
    extendObservable(this, {
      isOpen: false,
      title: null,
      message: null,
      onOk: null,
      okLabel: null,
      onCancel: null,
      cancelLabel: null,

      open: action(({
        title,
        message,
        okLabel,
        cancelLabel,
        onOk,
        onCancel
      }) => {
        this.title = title;
        this.message = message;
        this.okLabel = okLabel;
        this.cancelLabel = cancelLabel;
        this.onOk = onOk;
        this.onCancel = onCancel;
        this.isOpen = true;
      }),

      close: action(() => {
        this.isOpen = false;
      }),

      areYouSure: action(options => {
        this.open(Object.assign({
          title: 'Are You Sure?',
          okLabel: 'Yes, Go Ahead',
          cancelLabel: 'No, Cancel'
        }, options));
      })
    });
  }
}

export default new DialogStore();
