export interface Contributor {
  name: string;
  email: string;
  organization?: string;
  contributionType: string;
  pledgeAmount?: number;
  message: string;
  dateSubmitted?: string;
}

export interface FeedbackRecord {
  name: string;
  email: string;
  message: string;
  dateSubmitted?: string;
}
