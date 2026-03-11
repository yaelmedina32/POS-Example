import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../shared/services/inventory.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card class="stat-card shadow-box">
          <mat-card-header>
            <mat-card-title>Total Inventario</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-value">{{ inventoryService.totalStock() }}</div>
            <mat-icon class="stat-icon">inventory</mat-icon>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card shadow-box">
          <mat-card-header>
            <mat-card-title>Valor Total</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-value">{{ inventoryService.totalValue() | currency }}</div>
            <mat-icon class="stat-icon">attach_money</mat-icon>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card shadow-box warn">
          <mat-card-header>
            <mat-card-title>Bajo Stock</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-value">{{ inventoryService.lowStockItems().length }}</div>
            <mat-icon class="stat-icon">warning</mat-icon>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="recent-activity">
        <h2>Actividad Reciente</h2>
        <p>Sistema iniciado correctamente.</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .stat-card {
      position: relative;
      overflow: hidden;
    }
    .stat-value {
      font-size: 3rem;
      font-weight: bold;
      color: var(--secondary-color);
      margin-top: 10px;
    }
    .stat-icon {
      position: absolute;
      right: -20px;
      bottom: -20px;
      font-size: 8rem;
      width: 8rem;
      height: 8rem;
      opacity: 0.1;
      color: var(--text-color);
    }
    .warn .stat-value {
      color: var(--accent-color);
    }
  `]
})
export class DashboardComponent {
  inventoryService = inject(InventoryService);
}
