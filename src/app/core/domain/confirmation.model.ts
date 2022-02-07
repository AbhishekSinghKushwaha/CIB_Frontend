export interface ConfirmationModel {
  title: string;
  subtitle: string;
  content: { key: string, value: string }[];
  submitButtonText: string;
}
