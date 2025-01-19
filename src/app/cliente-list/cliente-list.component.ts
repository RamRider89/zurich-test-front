/**
 * @name ClienteListComponent
 * @description Listar clientes
 */

// Core
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild} from '@angular/core';
// Servicios
import { Cliente } from '@models/cliente';
import { ClienteService } from '@services/cliente.service';
import { RouterModule } from '@angular/router';
// Modal Form
import { ClienteFormComponent } from '@app/cliente-form/cliente-form.component';
import { ConfirmacionDialogComponent } from '@app/confirmacion-dialog/confirmacion-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ]
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = []; // Array para almacenar los clientes
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'actions']; // Columnas de la tabla
  filterValue: string = ''; // Variable para almacenar el valor del filtro
  dataSource: any = new MatTableDataSource<Cliente>();

  clickedRows: Cliente | undefined; 

  public mainLogo: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.mainLogo = 'assets/img/logo-blanco.png';
    this.paginator = new MatPaginator;
    this.sort = new MatSort;
    
  }

  ngOnInit(): void {
    this.getClientes(); // Obtener los clientes al iniciar
    this.filterTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClientes(): void {
    this.clienteService.getAllClientes().subscribe(clientes => this.dataSource.data = clientes); // Suscribirse al servicio
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** custom */
  filterTable() {
    this.dataSource.filterPredicate = (data: Cliente, filter: string): boolean => {
      return (
        data.id.toString().trim().includes(String(filter)) || data.name.toLocaleLowerCase().includes(filter) || data.email.toLocaleLowerCase().includes(filter)
      )
    }
  }

  openModal(cliente: Cliente){
    console.log(cliente);
    
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
        cliente: cliente
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
     * Action
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