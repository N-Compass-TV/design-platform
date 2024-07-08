export interface NewsTemplateType {
  id: string;
  newsTitle: string;
  newsDescription: string;
  newsObject: object | undefined | null;
  assignedDealer: {
    dealerId: string;
    dealerBusinessName: string;
  };
  createdBy: {
    name: string;
    id: string;
  };
  dateCreated: string;
  dateUpdated: string;
}
