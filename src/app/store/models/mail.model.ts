import { Subscription } from 'rxjs/Subscription';

export interface Mail {
  id?: number;
  content: string;
  folder: string;
  read?: boolean;
  starred?: boolean;
  send?: boolean;
  mailbox: number;
  from?: string;
  checked?: boolean;
  sender?: string;
  subject?: string;
  encryption?: Array<any>;
  attachments?: Array<any>;
  receiver?: Array<string>;
  cc?: Array<string>;
  bcc?: Array<string>;
  destruct_date?: string;
  delayed_delivery?: string;
  dead_man_duration?: string;
  datetime?: string;
  marked?: boolean;
  is_encrypted?: boolean;
  sent_at?: string;
  created_at?: string;
}

export interface Mailbox {
  id?: number;
  folders: string[];
  messages: string[];
  email: string;
  is_active?: boolean;
  private_key: string;
  public_key: string;
  signature?: string;
}


export enum MailFolderType {
  INBOX = 'inbox',
  SENT = 'sent',
  DRAFT = 'draft',
  STARRED = 'starred',
  ARCHIVE = 'archive',
  SPAM = 'spam',
  TRASH = 'trash',
  OUTBOX = 'outbox'
}

export interface Attachment {
  id?: number;
  draftId: number;
  document: any;
  name: string;
  size: string;
  message: number;
  progress?: number;
  attachmentId?: number;
  inProgress: boolean;
  isInline: boolean;
  contentId?: string;
  request?: Subscription;
  isRemoved?: boolean;
}
