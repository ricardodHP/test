import {Injectable} from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public message: string;
  public title: string;

  constructor() {
  }

  showToast(type: string, mensaje: string) {
    this.message = mensaje;
    $('#peek-bar')
      .removeClass()
      .addClass(type + ' peek-a-bar animated fadeInDown');
    setTimeout(() => {
      $('#peek-bar')
        .removeClass('animated fadeInDown')
        .addClass('animated fadeOutUp');
    }, 3000);
  }

  /** type: string */
  /** title: string */
  /** message: string */
  /** showAccept?: boolean */
  /** showCancel?: boolean */

  /** acceptEvent?: () => void */
  /** cancelEvent?: () => void */
  showModal(
    options
  ) {
    if (!options.showAccept) {
      $('#' + options.type + '_accept').hide();
    } else {
      $('#' + options.type + '_accept')
        .off('click')
        .on('click', () => {
          options.acceptEvent();
        });
    }

    if (!options.showCancel) {
      $('#' + options.type + '_cancel').hide();
    } else {
      $('#' + options.type + '_cancel')
        .off('click')
        .on('click', () => {
          options.cancelEvent();
        });
    }

    this.title = options.title;
    this.message = options.message;
    $('#mensaje_' + options.type).modal('show');
  }
}
