/**
 * @name ClienteListComponent
 * @description Listar clientes
 */

// Core
import { Component, OnInit, ViewChild} from '@angular/core';
// Servicios
import { Cliente } from '@models/cliente';
import { ClienteService } from '@services/cliente.service';
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

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  standalone: true,
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = []; // Array para almacenar los clientes
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'actions']; // Columnas de la tabla
  dataSource: any = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.paginator = new MatPaginator;
    this.sort = new MatSort;
  }

  ngOnInit(): void {
    this.getClientes(); // Obtener los clientes al iniciar
    this.filterTable();
  }

  /** init paginator y el sorter */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Obtener todos los clientes
   */
  getClientes(): void {
    this.clienteService.getAllClientes().subscribe(clientes => this.dataSource.data = clientes);
  }

  /**
   * Filtrado en la tabla de clientes y actualizacion de la vista al usuaio
   * @param event 
   */
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Filtrado por columnas especificas */
  filterTable() {
    this.dataSource.filterPredicate = (data: Cliente, filter: string): boolean => {
      return (
        data.id.toString().trim().includes(String(filter)) || data.name.toLocaleLowerCase().includes(filter) || data.email.toLocaleLowerCase().includes(filter)
      )
    }
  }

  /**
   * New, update cliente
   * @param cliente 
   */
  openNewClienteForm(cliente: Cliente | null) {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      height: 'auto',
      width: '800px',
      data: {
        cliente: cliente,
        userEdit: false
      },
    });

    // refresh
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{ this.getClientes(); }, 800);
    });
  }

  /**
   * Delete cliente
   * @param cliente 
   */
  openDeleteDialog(cliente: Cliente) {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      height: 'auto',
      width: '400px',
      data: {
        mensaje: 'Confirmación para eliminar el cliente: ',
        action: 'Eliminar',
        target: cliente.name
      },
    });

    /**
     * Action despues del dialogo delete
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si el usuario confirma
        this.clienteService.deleteCliente(cliente.id).subscribe({
          next: () => {
            this.getClientes(); // Actualiza la lista de clientes
            this.snackBar.open('Cliente eliminado correctamente', 'Cerrar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
            this.snackBar.open('Error al eliminar cliente', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

}