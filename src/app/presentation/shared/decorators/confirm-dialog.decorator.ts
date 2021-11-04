import { ConfirmDialogModel } from 'src/app/core/domain/confirm-dialog.model';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog/confirm-dialog.service';
import { ConfirmDialogModule } from '../modals/confirm-dialog/confirm-dialog.module';

export function confirmModal(options: ConfirmDialogModel) {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = function (...args: any[]) {
      const confirmDialogService = ConfirmDialogModule.injector.get<ConfirmDialogService>(ConfirmDialogService);
      confirmDialogService.open(options);
      confirmDialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          originalMethod.apply(this, args);
        }
      });
    };
  };
}
