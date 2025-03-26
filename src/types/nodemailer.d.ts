declare module 'nodemailer';

declare module 'nodemailer' {
  export interface SendMailOptions {
    from?: string;
    to?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
  }

  export interface TransportOptions {
    service?: string;
    host?: string;
    port?: number;
    secure?: boolean;
    auth: {
      user: string;
      pass: string;
    };
  }

  export interface Transporter {
    sendMail(mailOptions: SendMailOptions): Promise<any>;
  }

  export function createTransport(options: TransportOptions): Transporter;
  
  const nodemailer: {
    createTransport: typeof createTransport;
  };
  
  export default nodemailer;
} 