import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscriber } from 'rxjs/';

export interface ModalRef {
  observer?: <T>() => Subscriber<T>;
  modal: BsModalRef;
}

export class ModalService {

  constructor(private modalService: BsModalService) { }

  public addModal<T, K>(component: Component, model: T): Observable<K> {
    const modalRef: ModalRef = { modal: this.modalService.show(component) };

    for (const prop of Object.getOwnPropertyNames(model)) {
      modalRef.modal.content[prop] = model[prop];
    }

    function close(result: K): void {
      modalRef.modal.hide();
      modalRef.observer().next(result);
    }

    modalRef.modal.content['close'] = close;

    return new Observable<K>((observer) => modalRef.observer = <K>() => observer);
  }

}
