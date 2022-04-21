export interface PromptModel {
  title: string;
  required: boolean;
  inputLabel: string;
  inputPlaceholder: string;
  submitButtonText: string;
  refuseButtonText: string;
}




export interface DropdownModal<T> {
  title: string;
  description: string;
  list: T[];
}