import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-field-errors",
  templateUrl: "./field-errors.component.html",
  styleUrls: ["./field-errors.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldErrorsComponent),
      multi: true,
    },
  ],
})
export class FieldErrorsComponent implements OnInit {
  @Input()
  public formField!: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
