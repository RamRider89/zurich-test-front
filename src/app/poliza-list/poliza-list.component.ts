import { Component, OnInit, ViewChild } from '@angular/core';
// Servicios
import { Poliza } from '@models/poliza';
import { PolizaType, PolizaStatus } from '@models/poliza-type';
import { PolizaService } from '@services/poliza.service';
import { PolizaTypeService } from '@services/poliza-type.service';
import { RouterModule } from '@angular/router';
// Modal Form
import { PolizaFormComponent } from '@app/poliza-form/poliza-form.component';
// Material
import { SharedModule } from '@shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Date
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-poliza-list',
  templateUrl: './poliza-list.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./poliza-list.component.css'],
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class PolizaListComponent implements OnInit {

  polizas: Poliza[] = [];
  polizaTypes: PolizaType[] = []; // Array para almacenar los tipos de póliza
  statusPolis: PolizaStatus[] = [];
  displayedColumns: string[] = ['id', 'cliente', 'tipoPoliza', 'fechaInicio', 'fechaExpiracion', 'monto', 'estado', 'actions'];
  dataSource: any = new MatTableDataSource<Poliza>();

  /** Filtros */
  filtrosPolizas = new FormGroup({
    type: new FormControl<Number | null>(null),
    estado: new FormControl<Number | null>(null),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  pipe: DatePipe;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private polizaService: PolizaService,
    private polizaTypeService: PolizaTypeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.paginator = new MatPaginator;
    this.sort = new MatSort;

    this.pipe = new DatePipe('en');

    this.statusPolis = [
      {value: 1, name: 'Activa'},
      {value: 0, name: 'Cancelada'}
    ];

  }

  ngOnInit(): void {
    this.getPolizaTypes(); // Obtener los tipos de póliza al iniciar
  }

  /** init paginator y el sorter */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Obtener todas las polizas
   * Se asigna el nombre del tipo de cada una de las polizas en el objeto
   */
  getPolizas(): void {
    this.polizaService.getAllPolizas().subscribe(polizas => {
      this.polizas = polizas.map(poliza => ({
        ...poliza,
        tipoPolizaName: this.getPolizaTypeName(poliza.typePoliza), // nombre del tipo de póliza
        dateStart: moment(poliza.dateStart).format('YYYY-MM-DD'), // Formatear con Moment.js
        dateExpiration: moment(poliza.dateExpiration).format('YYYY-MM-DD')
      }));
      this.dataSource.data = this.polizas;
    });
  }

  /**
   * Obtener todos los tipos de polizas
   */
  getPolizaTypes(): void {
    this.polizaTypeService.getAllPolizaTypes().subscribe(tipos => this.polizaTypes = tipos);
    this.getPolizas();
  }

  /**
   * Actualiza la vista con el nombre de tipo de poliza
   */
  getPolizaTypeName(typeId: number): string {
    const tipo = this.polizaTypes.find(t => t.id === typeId);
    return tipo ? tipo.name : '';
  }


  resetFiltros(){
    this.filtrosPolizas.reset();
    this.getPolizas();
  }

  /**
   * New, update poliza
   * @param poliza 
   */
  openNewPolizaForm(poliza: Poliza | null) {
    const dialogRef = this.dialog.open(PolizaFormComponent, {
      height: 'auto',
      width: '800px',
      data: {
        poliza: poliza
      },
    });

    // refresh
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{ this.getPolizas(); }, 1000);
    });

  }

  filtrarPolizas() {
    let params = new HttpParams();
    if (this.filtrosPolizas.value.type) {
      params = params.set('tipo', this.filtrosPolizas.value.type.toString());
    }
    if (this.filtrosPolizas.value.estado !== null) {
      params = params.set('estado', String(this.filtrosPolizas.value.estado?.toString()));
    }
    if (this.filtrosPolizas.value.start) {
      params = params.set('fechaInicio', moment(this.filtrosPolizas.value.start).format('YYYY-MM-DD'));
    }
    if (this.filtrosPolizas.value.end) {
      params = params.set('fechaFin', moment(this.filtrosPolizas.value.end).format('YYYY-MM-DD'));
    }
  
    this.polizaService.filtrarPolizas(params)
      .subscribe(polizas => {
        this.polizas = polizas.map(poliza => ({
          ...poliza,
          tipoPolizaName: this.getPolizaTypeName(poliza.typePoliza),
          dateStart: moment(poliza.dateStart).format('YYYY-MM-DD'),
          dateExpiration: moment(poliza.dateExpiration).format('YYYY-MM-DD')
    
        }));
        this.dataSource.data = this.polizas;        
      });
  }

}