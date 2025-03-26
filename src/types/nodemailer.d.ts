declare module 'nodemailer';

declare module 'nodemailer' {
  export interface SendMailOptions {
    from?: string;
    to?: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    sender?: string;
    headers?: Record<string, string>;
    attachments?: Array<{
      filename?: string;
      content?: string | Buffer;
      path?: string;
      contentType?: string;
      encoding?: string;
      headers?: Record<string, string>;
      raw?: string | Buffer;
    }>;
    alternatives?: Array<{
      contentType: string;
      content: string | Buffer;
    }>;
    encoding?: string;
    raw?: string | Buffer;
    textEncoding?: {
      textEncoding: string;
    };
    priority?: 'high' | 'normal' | 'low';
    references?: string | string[];
    replyTo?: string;
  }

  export interface TransportOptions {
    service?: string;
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
    tls?: {
      rejectUnauthorized?: boolean;
    };
    debug?: boolean;
  }

  export interface Transporter {
    sendMail(mailOptions: SendMailOptions): Promise<{
      messageId: string;
      envelope: Record<string, unknown>;
      accepted: string[];
      rejected: string[];
      pending: string[];
      response: string;
    }>;
  }

  export function createTransport(options: TransportOptions): Transporter;
  
  const nodemailer: {
    createTransport: typeof createTransport;
  };
  
  export default nodemailer;
}

type Attachment = {
  filename?: string;
  content?: string | Buffer;
  path?: string;
  contentType?: string;
  encoding?: string;
  headers?: Record<string, string>;
  raw?: string | Buffer;
}; 