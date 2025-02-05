import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formFieldValidationErrors',
  standalone: true,
})
export class FormFieldValidationErrorsPipe implements PipeTransform {
  transform(
    value: ValidationErrors | undefined | null,
    ...args: unknown[]
  ): unknown {
    if (value) {
      let messages: string[] = [];

      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const errorDetail = value[key];
          if (key === 'required') 
            messages.push('Este campo es requerido');
          if (key === 'pattern')
            messages.push('No cumple con el formato requerido');
          if (key === 'maxlength')
            messages.push(
              `No puede tener mas de ${errorDetail.requiredLength} caracteres`
          );
          if (key === 'max')
            messages.push(
              `La calificación máxima es 20.`
            );
          if (key === 'minlenght')
            messages.push(
              `Debe tener al menos ${errorDetail.requiredLength} caracteres`
            );
        }
      }

      return messages.join('. ');
    }

    return null;
  }
}