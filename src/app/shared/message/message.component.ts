import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessageScopes } from './messages.model';
import { BlogMessageService } from './blog-message-service.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MessageModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  readonly scope = input.required<MessageScopes>();
  readonly messageService = inject(BlogMessageService);
  readonly messages = computed(() => {
    const scope = this.scope();
    return this.messageService.messages().filter((message) => message.key === scope);
  });
}
