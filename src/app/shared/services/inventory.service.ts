import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Tire } from '../models/tire.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // Mock Data
  private initialData: Tire[] = [
    { id: 1, brand: 'Michelin', model: 'Pilot Sport 4', size: '225/45 R17', price: 150, stock: 20, category: 'Summer' },
    { id: 2, brand: 'Continental', model: 'PremiumContact 6', size: '205/55 R16', price: 120, stock: 15, category: 'Summer' },
    { id: 3, brand: 'Goodyear', model: 'Vector 4Seasons', size: '195/65 R15', price: 100, stock: 30, category: 'All-Season' },
    { id: 4, brand: 'Bridgestone', model: 'Blizzak LM005', size: '215/60 R17', price: 180, stock: 8, category: 'Winter' },
    { id: 5, brand: 'Pirelli', model: 'P Zero', size: '245/40 R19', price: 250, stock: 5, category: 'Summer' },
  ];

  // Signal for Inventory State
  tires: WritableSignal<Tire[]> = signal(this.initialData);

  // Computed Signals
  totalStock = computed(() => this.tires().reduce((acc, tire) => acc + tire.stock, 0));
  lowStockItems = computed(() => this.tires().filter(tire => tire.stock < 10));
  totalValue = computed(() => this.tires().reduce((acc, tire) => acc + (tire.price * tire.stock), 0));

  constructor() {}

  addTire(tire: Tire): void {
    this.tires.update(currentTires => [...currentTires, tire]);
  }

  removeTire(id: number): void {
    this.tires.update(currentTires => currentTires.filter(t => t.id !== id));
  }

  updateStock(id: number, newStock: number): void {
    this.tires.update(currentTires => 
      currentTires.map(t => t.id === id ? { ...t, stock: newStock } : t)
    );
  }
}
