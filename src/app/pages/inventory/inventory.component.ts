import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InventoryService } from '../../shared/services/inventory.service';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CustomButtonComponent
  ],
  template: `
    <div class="inventory-container">
      <div class="header">
        <h1>Inventario de Llantas</h1>
        <app-custom-button color="accent" (onClick)="addItem()">
          <mat-icon>add</mat-icon> Nueva Llanta
        </app-custom-button>
      </div>

      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Buscar</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ej. Michelin" #input>
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="table-container shadow-box">
        <table mat-table [dataSource]="filteredData()" class="mat-elevation-z8">
          
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let element"> {{element.id}} </td>
          </ng-container>

          <!-- Brand Column -->
          <ng-container matColumnDef="brand">
            <th mat-header-cell *matHeaderCellDef> Marca </th>
            <td mat-cell *matCellDef="let element"> {{element.brand}} </td>
          </ng-container>

          <!-- Model Column -->
          <ng-container matColumnDef="model">
            <th mat-header-cell *matHeaderCellDef> Modelo </th>
            <td mat-cell *matCellDef="let element"> {{element.model}} </td>
          </ng-container>

          <!-- Size Column -->
          <ng-container matColumnDef="size">
            <th mat-header-cell *matHeaderCellDef> Medida </th>
            <td mat-cell *matCellDef="let element"> {{element.size}} </td>
          </ng-container>

          <!-- Price Column -->
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef> Precio </th>
            <td mat-cell *matCellDef="let element"> {{element.price | currency}} </td>
          </ng-container>

          <!-- Stock Column -->
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef> Stock </th>
            <td mat-cell *matCellDef="let element" [class.low-stock]="element.stock < 10"> 
              {{element.stock}} 
            </td>
          </ng-container>

           <!-- Actions Column -->
           <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="warn" (click)="deleteItem(element.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="7">No se encontraron datos para "{{input.value}}"</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .inventory-container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .search-field {
      width: 100%;
      max-width: 400px;
    }
    .table-container {
      overflow-x: auto;
    }
    table {
      width: 100%;
      background-color: transparent;
    }
    .low-stock {
      color: var(--accent-color);
      font-weight: bold;
    }
    th.mat-header-cell {
      color: var(--secondary-color);
      font-weight: bold;
      font-size: 1.1rem;
    }
    td.mat-cell {
      color: var(--text-color);
      border-bottom-color: #333;
    }
    tr.mat-row:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  `]
})
export class InventoryComponent {
  inventoryService = inject(InventoryService);
  displayedColumns: string[] = ['id', 'brand', 'model', 'size', 'price', 'stock', 'actions'];
  
  filterValue = signal('');
  
  // Computed Signal for Filtering
  filteredData = computed(() => {
    const filter = this.filterValue().toLowerCase();
    const tires = this.inventoryService.tires();
    if (!filter) return tires;
    return tires.filter(t => 
      t.brand.toLowerCase().includes(filter) ||
      t.model.toLowerCase().includes(filter) ||
      t.size.toLowerCase().includes(filter)
    );
  });

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue.set(filterValue.trim());
  }

  addItem() {
    // Mock adding an item
    this.inventoryService.addTire({
      id: Math.floor(Math.random() * 1000) + 100,
      brand: 'Nueva Marca',
      model: 'Nuevo Modelo',
      size: '205/55 R16',
      price: 150,
      stock: 5,
      category: 'Summer'
    });
  }

  deleteItem(id: number) {
    this.inventoryService.removeTire(id);
  }
}
