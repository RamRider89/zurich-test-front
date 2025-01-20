// Core
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
// Servicios
import { Cliente } from '@models/cliente';
import { ClienteService } from '@services/cliente.service';
import { Poliza } from '../models/poliza';
import { PolizaType, PolizaStatus } from '../models/poliza-type';
import { PolizaService } from '../services/poliza.service';
import { PolizaTypeService } from '../services/poliza-type.service';
// Material
import { SharedModule } from '@shared/shared.module';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
// Modal
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Date
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {merge} from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-poliza-form',
  templateUrl: './poliza-form.component.html',
  styleUrls: ['./poliza-form.component.css'],
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatDialogModule, 
    MatDialogTitle, 
    MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolizaFormComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA);
  poliza: Poliza = {} as Poliza;
  polizaForm!: FormGroup;
  clientes: Cliente[] = [];
  tiposPoliza: PolizaType[] = [];
  statusPolis: PolizaStatus[] = [];
  errorMessage: any;

  constructor(
    private polizaService: PolizaService,
    private clienteService: ClienteService,
    private polizaTypeService: PolizaTypeService,
    private snackBar: MatSnackBar
  ) { 

    this.statusPolis = [
      {value: 1, name: 'Activa'},
      {value: 0, name: 'Cancelada'}
    ];

    this.polizaForm = new FormGroup({
      clienteId: new FormControl(Number, Validators.required),
      cliente: new FormControl<Cliente | null>(null),
      typePoliza: new FormControl(Number, Validators.required),
      dateStart: new FormControl(Date, Validators.required),
      dateExpiration: new FormControl(Date, Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(1)]),
      status: new FormControl(Number(1), [Validators.required]) // Por defecto, la póliza está activa
    });

    merge(this.polizaForm.statusChanges, this.polizaForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    this.errorMessage = {
      cliente: signal(''),
      typePoliza: signal(''),
      dateStart: signal(''),
      dateExpiration: signal(''),
      monto: signal(''),
      status: signal(''),
    }

  }

  ngOnInit(): void {
    this.getClientes();
    this.getTiposPoliza();
    this.cargarPoliza();
  }

  cargarPoliza(): void {
    // posible llamada a servicio rest mediante el id
    // se elije obtener los datos directamente del objeto
    this.poliza = this.data.poliza ? this.data.poliza : {} as Poliza;

    if (this.poliza){      
      this.poliza.clienteId = this.poliza.cliente?.id;
      this.poliza.status = Number(this.poliza?.status) + 0;
      // Ajustando el formato de fechas para el datepicker
      this.polizaForm.patchValue({
        ...this.poliza,
        dateStart: moment(this.poliza.dateStart).toDate(),
        dateExpiration: moment(this.poliza.dateExpiration).toDate()
      }); 

    }
  }

  getClientes(): void {
    this.clienteService.getAllClientes().subscribe(clientes => this.clientes = clientes);
  }

  getTiposPoliza(): void {
    this.polizaTypeService.getAllPolizaTypes().subscribe(tiposPoliza => this.tiposPoliza = tiposPoliza);
  }


  /**
   * mensaje de salida
   * @param res 
   */
    exit(res: any): void {
      console.info(res);
       if (res?.id) { // comprobando el guardado
          this.snackBar.open('Poliza guardada correctamente', 'Cerrar', { duration: 3000 });
        }
        else {
          console.error('Error al guardar la poliza:', res);
          this.snackBar.open('Error al guardar la poliza', 'Cerrar', { duration: 3000 });
        }
    }


  /**
   * Guarda y actualiza
   */
  guardarPoliza() {
    if (this.polizaForm.valid) {
      const nuevaPoliza: Poliza = { 
        ...this.poliza, 
        ...this.polizaForm.value,
        cliente: this.getClienteObj(Number(this.polizaForm.value.clienteId)), // Asignar el objeto cliente
        status: Boolean(this.polizaForm.value.status),
        dateStart: this.formatDate(this.polizaForm.value.dateStart), // Formatear fecha de inicio
        dateExpiration: this.formatDate(this.polizaForm.value.dateExpiration) // Formatear fecha de expiración
      };

      if (this.poliza.id) {
        this.polizaService.updatePoliza(this.poliza.id, nuevaPoliza)
          .subscribe((res) => this.exit(res));
      } else {
        this.polizaService.createPoliza(nuevaPoliza)
          .subscribe((res) => this.exit(res));

      }

    }
  }

  getClienteObj(typeId: number): Cliente | undefined {
    const cliente: Cliente | undefined = this.clientes.find(t => t.id === typeId);
    return cliente;
  }

  // Método auxiliar para formatear fechas
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateErrorMessage() {

    // cliente
    if (this.polizaForm.get('cliente')?.hasError('required')) {
      this.errorMessage.cliente.set('Campo obligatorio');
    } else {
      this.errorMessage.cliente.set('');
    }
    // typePoliza
    if (this.polizaForm.get('typePoliza')?.hasError('required')) {
      this.errorMessage.typePoliza.set('Campo obligatorio');
    } else {
      this.errorMessage.typePoliza.set('');
    }
    // monto
    if (this.polizaForm.get('monto')?.hasError('required')) {
      this.errorMessage.monto.set('Campo obligatorio');
    } else {
      this.errorMessage.monto.set('');
    }
    // status
    if (this.polizaForm.get('status')?.hasError('required')) {
      this.errorMessage.status.set('Campo obligatorio');
    } else {
      this.errorMessage.status.set('');
    }

    //dateStart
    if (this.polizaForm.get('dateStart')?.hasError('required')) {
      this.errorMessage.dateStart.set('Campo obligatorio');
    } else {
      this.errorMessage.dateStart.set('');
    }
    // dateExpiration
    if (this.polizaForm.get('dateExpiration')?.hasError('required')) {
      this.errorMessage.dateExpiration.set('Campo obligatorio');
    } else {
      this.errorMessage.dateExpiration.set('');
    }

  }

  resetFiltros(){
    this.polizaForm.reset();
  }

}