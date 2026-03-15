import { Injectable, signal } from '@angular/core';
import { ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BlogMessageService {
  private readonly _messages = signal<ToastMessageOptions[]>([]);
  readonly messages = this._messages.asReadonly();

  showMessage(message: ToastMessageOptions): void {
    this._messages.update((messages) => [...messages, message]);
  }
}
