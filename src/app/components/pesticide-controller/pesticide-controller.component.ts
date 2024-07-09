import { Component, Input, OnInit } from '@angular/core';
import { OverviewObject } from '../../models/OverviewObject';
import { PesticideObject } from '../../models/PesticideObject';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PesticideManagerComponent } from '../pesticide-manager/pesticide-manager.component';

@Component({
  selector: 'app-pesticide-controller',
  templateUrl: './pesticide-controller.component.html',
  styleUrl: './pesticide-controller.component.css',
})
export class PesticideControllerComponent implements OnInit {
  @Input() overviewObject!: OverviewObject;
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  loadStatus() {
    if (
      this.overviewObject?.allPesticides != null &&
      this.overviewObject.allPesticides.length > 0
    ) {
      for (let category of this.overviewObject.allPesticides) {
        for (let pesticide of category.pesticides) {
          pesticide.currentStatus = this.getStatus(pesticide);
        }
      }
    }
  }

  refreshStatus(pesticide: PesticideObject) {
    if (pesticide.currentStatus == true) {
      if (
        pesticide.allowedForField.find(
          (p) => p == this.overviewObject.field.fieldId,
        ) == null
      ) {
        pesticide.allowedForField.push(this.overviewObject.field.fieldId);
      }
    } else {
      const index = pesticide.allowedForField.indexOf(
        this.overviewObject.field.fieldId,
        0,
      );
      if (index > -1) {
        pesticide.allowedForField.splice(index, 1);
      }
    }
  }

  getStatus(pesticide: PesticideObject): boolean {
    if (
      pesticide.allowedForField == null ||
      pesticide.allowedForField.length <= 0
    ) {
      return false;
    }
    const status = pesticide.allowedForField.find(
      (p) => p == this.overviewObject.field.fieldId,
    );
    if (status == null) {
      return false;
    }
    return true;
  }

  show() {
    this.ref = this.dialogService.open(PesticideManagerComponent, {
      header: 'Manage Pesticides',
      data: this.overviewObject,
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    this.ref.onClose.subscribe(() => {
      console.log('Dialog Closed!');
    });
  }
}
