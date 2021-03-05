export interface Purchase {
  '@id'?: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerZip: string;
  customerCity: string;
  customerPhone: string;
  purchaseItems?: string[];
  readonly isShipped?: boolean;
  readonly createdAt?: Date;
  id?: string;
}
