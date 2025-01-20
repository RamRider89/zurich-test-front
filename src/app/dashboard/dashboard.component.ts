import { Component, OnInit, ViewChild } from '@angular/core';
// Servicios
import { Poliza } from '@models/poliza';
import { Cliente } from '@models/cliente';
import { PolizaType, PolizaStatus } from '@models/poliza-type';
import { PolizaService } from '@services/poliza.service';
import { ClienteService } from '@services/cliente.service';
import { PolizaTypeService } from '@services/poliza-type.service';
import { AuthService } from '@services/auth.service'; // Importa AuthService
import { RouterModule } from '@angular/router';
// Modal Form
import { ClienteFormComponent } from '@app/cliente-form/cliente-form.component';
import { ConfirmacionDialogComponent } from '@app/confirmacion-dialog/confirmacion-dialog.component'
// Material
import { SharedModule } from '@shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Date
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import moment from 'moment';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class DashboardComponent implements OnInit {
  polizas: Poliza[] = [];
  polizaTypes: PolizaType[] = [];
  cliente: Cliente | undefined;
  displayedColumns: string[] = ['id', 'tipoPoliza', 'fechaInicio', 'fechaExpiracion', 'monto', 'estado', 'actions'];

  constructor(
    private polizaService: PolizaService,
    private clienteService: ClienteService,
    private polizaTypeService: PolizaTypeService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPolizaTypes();
    this.getCliente();
  }

  /** init paginator y el sorter */
  ngAfterViewInit() {
    this.getPolizas();
  }

  getPolizas(): void {
    // Obtén el ID del cliente actual
    //const clienteId = this.authService.getUserId(); // Reemplaza con la forma en que obtienes el ID del usuario actual
    if (1) {
      this.polizaService.getPolizasByClienteId(1)
        .subscribe(
          polizas => {
              this.polizas = polizas.map(poliza => ({
                ...poliza,
                tipoPolizaName: this.getPolizaTypeName(poliza.typePoliza), // nombre del tipo de póliza
                dateStart: moment(poliza.dateStart).format('YYYY-MM-DD'),
                dateExpiration: moment(poliza.dateExpiration).format('YYYY-MM-DD')
            }))
        });
    }
  }

    /**
   * Obtener todos los tipos de polizas
   */
    getPolizaTypes(): void {
      this.polizaTypeService.getAllPolizaTypes().subscribe(tipos => this.polizaTypes = tipos);
    }
  
    /**
     * Actualiza la vista con el nombre de tipo de poliza
     */
    getPolizaTypeName(typeId: number): string {
      const tipo = this.polizaTypes.find(t => t.id === typeId);
      return tipo ? tipo.name : '';
    }

  getCliente(): void {
    // Obtén el ID del cliente actual
    //const clienteId = this.authService.getUserId(); // Reemplaza con la forma en que obtienes el ID del usuario actual
    if (1) {
      this.clienteService.getClienteById(1)
        .subscribe(cliente => this.cliente = cliente);
    }
  }

  solicitarCancelacion(polizaId: number): void {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: { 
        mensaje: '¿Estás seguro de que quieres solicitar la cancelación de esta póliza?',
        action: 'Cancelar Poliza'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.polizaService.solicitarCancelacion(polizaId)
          .subscribe({
            next: (data) => { // Recibir la respuesta del backend
              this.snackBar.open(`Solicitud de cancelación enviada. Folio: ${data.folio}`, 'Cerrar', { duration: 5000 });
              this.getPolizas();
            },
            error: (error) => {
              console.error('Error al solicitar cancelación:', error);
              this.snackBar.open('Error al solicitar cancelación', 'Cerrar', { duration: 3000 });
            }
          });
      }
    });
  }

    /**
     * Update datos
     * @param cliente 
     */
    openModalDatosCliente() {
      const dialogRef = this.dialog.open(ClienteFormComponent, {
        height: 'auto',
        width: '800px',
        data: {
          cliente: this.cliente,
          userEdit: true
        },
      });
  
      // refresh
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(()=>{ this.getCliente(); }, 800);
      });
    }
}