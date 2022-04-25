import {
  BenefiaryTypeFieldMetadataInterface,
  BeneficiaryModel,
  BeneficiaryTypeFieldInterface,
} from "../../domain/beneficiary.model";
import { TransactionTypeConstants } from "./transaction-type.constants";

export class BeneficiaryField implements BeneficiaryTypeFieldInterface {
  fieldType: keyof BeneficiaryModel;
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor(private readonly _metadata: BenefiaryTypeFieldMetadataInterface) {
    this.metadata = _metadata;
  }
  setRequired(bool: any): BeneficiaryField {
    this.metadata.required = bool;
    return this;
  }
  setClick(fn: () => void | null): BeneficiaryField {
    this.metadata.onclick = fn;
    return this;
  }

  canSearchBy(bool: any): BeneficiaryField {
    this.metadata.acceptSearch = bool;
    return this;
  }
}

export class BeneficiaryFieldFullName extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "fullName";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "text",
      formControlName: "fullName",
      label: "Full Name",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldCountry extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "country";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "select",
      dataType: "object",
      formControlName: "country",
      label: "Country",
      valueFromField: "countryName",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldAccountName extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "fullName"; // Should by tracked by 'fullName' -- backeonly label differs
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "fullName",
      label: "Account Name",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldAccountNumber extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "accountNumber";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "accountNumber",
      label: "Account Number",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldBank extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "bank";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "select",
      dataType: "object",
      formControlName: "bank",
      label: "Bank",
      valueFromField: "bankName",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldFirstName extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "firstName";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "firstName",
      label: "First Name",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldLastName extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "lastName";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "lastName",
      label: "Last Name",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldMobilePhone extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "phoneNumber";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "mobile",
      dataType: "string",
      formControlName: "phoneNumber",
      label: "Mobile Phone",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldIBAN extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "IBANNumber";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "IBANNumber",
      label: "IBAN Number",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldStreetAddress extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "streetAddress";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "streetAddress",
      label: "Street Address",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldPostalAddress extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "postalAddress";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "postalAddress",
      label: "Postal Address",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldTillNumber extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "tillNumber";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "number",
      formControlName: "tillNumber",
      label: "Till number",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldTillName extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "tillName";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "input",
      dataType: "string",
      formControlName: "tillName",
      label: "Till name",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export class BeneficiaryFieldOperator extends BeneficiaryField {
  fieldType: keyof BeneficiaryModel = "mobileOperator";
  metadata: BenefiaryTypeFieldMetadataInterface;

  constructor() {
    super({
      controlType: "select",
      dataType: "object",
      formControlName: "mobileOperator",
      label: "Operator",
      valueFromField: "operatorName",
    });
    return this;
  }

  setClick(fn: () => void | null) {
    return super.setClick(fn);
  }

  setRequired(bool: boolean) {
    return super.setRequired(bool);
  }
}

export const BeneficiaryTypeFieldsDict: Map<string, BeneficiaryField[]> =
  new Map([
    [
      TransactionTypeConstants.TransferType.INTRA_BANK,
      [
        new BeneficiaryFieldFullName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldCountry().setRequired(true),
        new BeneficiaryFieldAccountNumber().setRequired(true).canSearchBy(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.EFT,
      [
        new BeneficiaryFieldFullName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldBank().setRequired(true),
        new BeneficiaryFieldAccountName().setRequired(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.SWIFT,
      [
        new BeneficiaryFieldCountry().setRequired(true),
        new BeneficiaryFieldBank().setRequired(true),
        new BeneficiaryFieldFirstName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldLastName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldAccountNumber().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldMobilePhone().setRequired(true),
        new BeneficiaryFieldIBAN().setRequired(true),
        new BeneficiaryFieldStreetAddress().setRequired(true),
        new BeneficiaryFieldPostalAddress().setRequired(true),
      ],
    ],

    [
      TransactionTypeConstants.TransferType.RTGS,
      [
        new BeneficiaryFieldBank().setRequired(true),
        new BeneficiaryFieldAccountName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldAccountNumber().setRequired(true).canSearchBy(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.BUY_GOODS,
      [
        new BeneficiaryFieldTillName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldTillNumber().setRequired(true).canSearchBy(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.BUY_AIRTIME,
      [
        new BeneficiaryFieldFullName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldOperator().setRequired(true),
        new BeneficiaryFieldMobilePhone().setRequired(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.MOBILE_MONEY,
      [
        new BeneficiaryFieldFullName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldOperator().setRequired(true),
        new BeneficiaryFieldMobilePhone().setRequired(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.PESALINK,
      [
        new BeneficiaryFieldFullName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldBank().setRequired(true),
        new BeneficiaryFieldMobilePhone().setRequired(true).canSearchBy(true),
      ],
    ],
    [
      TransactionTypeConstants.TransferType.SUBSIDIARY,
      [
        new BeneficiaryFieldFullName().setRequired(true).canSearchBy(true),
        new BeneficiaryFieldCountry().setRequired(true),
        new BeneficiaryFieldBank().setRequired(true),
        new BeneficiaryFieldAccountNumber().setRequired(true).canSearchBy(true),
      ],
    ],
  ]);
