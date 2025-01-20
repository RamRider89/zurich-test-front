// Core
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
// Servicios
import { Cliente } from '@models/cliente';
import { ClienteService } from '@services/cliente.service';
// Material
import { SharedModule } from '@shared/shared.module';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
// Directives
import { ChangeTextDirective } from '@directives/restringir-text.directive.';
import {merge} from 'rxjs';
// Modal
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  standalone: true,
  imports: [
        SharedModule,
        ChangeTextDirective,
        MatDialogModule, 
        MatDialogTitle, 
        MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteFormComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA);
  cliente: Cliente = {} as Cliente; // Inicializa un cliente vacío
  clienteForm!: FormGroup; // Define el FormGroup
  errorMessage: any;
  userDataEdit = signal(false); // identificar edicion de datos por parte del usuario

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
  ) { 

    this.clienteForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255), this.noEspaciosBlancosValidator]), // Validación para el nombre
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(255), this.noEspaciosBlancosValidator]), // Validación para el email
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12), this.noEspaciosBlancosValidator]), // Validación para el teléfono
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255), this.noEspaciosBlancosValidator]) // Validación para la dirección
    });

    merge(this.clienteForm.statusChanges, this.clienteForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    this.errorMessage = {
      name: signal(''),
      phone: signal(''),
      email: signal(''),
      address: signal(''),
    }

  }

  ngOnInit(): void {
    this.getCliente(); // Obtiene el cliente si se está editando
  }


  getCliente(): void {
    // posible llamada a servicio rest mediante el id
    // se elije obtener los datos directamente del objeto
    this.cliente = this.data.cliente ? this.data.cliente : {} as Cliente;
    this.clienteForm.patchValue(this.cliente);

    if(this.data.userEdit){
      this.clienteForm.controls['name'].disable();
      this.clienteForm.controls['email'].disable();
    }

  }

  /**
   * Guarda y actualiza
   */
  guardarCliente() {
    if (this.clienteForm.valid) {
      // Guarda o actualiza el cliente
      const clienteToSave = { ...this.cliente, ...this.clienteForm.value };
      if (this.cliente.id) {
        this.clienteService.updateCliente(this.cliente.id, clienteToSave)
          .subscribe((res) => this.exit(res));
      } else {
        this.clienteService.createCliente(clienteToSave)
          .subscribe((res) => this.exit(res));
      }
    }
  }

  /**
   * mensaje de salida
   * @param res 
   */
  exit(res: any): void {
    console.info(res);
     if (res?.id) { // comprobando el guardado
        this.snackBar.open('Cliente guardado correctamente', 'Cerrar', { duration: 3000 });
      }
      else {
        console.error('Error al guardar el cliente:', res);
        this.snackBar.open('Error al guardar el cliente', 'Cerrar', { duration: 3000 });
      }

  }

  onSubmit() {}

  noEspaciosBlancosValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  updateErrorMessage() {
    // name
    if (this.clienteForm.get('name')?.hasError('required')) {
      this.errorMessage.name.set('Campo obligatorio');
    } else if (this.clienteForm.get('name')?.hasError('minLength')) {
      this.errorMessage.name.set('No es un nombre valido');
    } else {
      this.errorMessage.name.set('');
    }
    // phone
    if (this.clienteForm.get('phone')?.hasError('required')) {
      this.errorMessage.phone.set('Campo obligatorio');
    } else if (this.clienteForm.get('phone')?.hasError('pattern') || this.clienteForm.get('phone')?.hasError('minLength')) {
      this.errorMessage.phone.set('No es un telefono valido');
    } else {
      this.errorMessage.email.set('');
    }
    //email
    if (this.clienteForm.get('email')?.hasError('required')) {
      this.errorMessage.email.set('Campo obligatorio');
    } else if (this.clienteForm.get('email')?.hasError('email')) {
      this.errorMessage.email.set('No es un email valido');
    } else {
      this.errorMessage.email.set('');
    }
    // address
    if (this.clienteForm.get('address')?.hasError('required')) {
      this.errorMessage.address.set('Campo obligatorio');
    } else if (this.clienteForm.get('address')?.hasError('minLength')) {
      this.errorMessage.phone.set('No es una direccion valido');
    } else {
      this.errorMessage.address.set('');
    }
  }

}