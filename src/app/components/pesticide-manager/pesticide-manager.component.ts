import { Component, OnInit } from '@angular/core';
import { OverviewObject } from '../../models/OverviewObject';
import { PesticideDisplayObject } from '../../models/PesticideDisplayObject';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pesticide-manager',
  templateUrl: './pesticide-manager.component.html',
  styleUrl: './pesticide-manager.component.css',
})
export class PesticideManagerComponent implements OnInit {
  pesticides: PesticideDisplayObject[] = [];
  cols: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit(): void {
    this.setUpColumns();
    this.fillTable();
  }

  setUpColumns() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'stockValue', header: 'Stock' },
      { field: 'allowedForField', header: 'Allowed for Fields' },
    ];
  }

  fillTable() {
    const overviewObject: OverviewObject = this.config.data;

    for (let pesticide of overviewObject.allPesticides) {
      for (let subordinated of pesticide.pesticides) {
        this.pesticides.push({
          name: subordinated.name,
          stockValue: subordinated.stockValue,
          allowedForField: subordinated.allowedForField.toString(),
          category: pesticide.name,
        });
      }
    }
  }
}
