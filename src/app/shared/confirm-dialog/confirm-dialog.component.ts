import { Component, Inject, Output, HostListener } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styles: []
})
export class ConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {
        cancelText: string,
        confirmText: string,
        message: string,
        title: string
    }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>){}

    public cancel() {
        this.close(this.data.cancelText);
    }

    public close(value) {
        this.mdDialogRef.close(value)
    }

    public confirm() {
        this.close(this.data.confirmText);
    }

    @HostListener("keydown.esc") public onEsc() {
        this.close(false);
    }
}