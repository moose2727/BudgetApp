import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { BudgetService } from "../budget/budget.service";
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    total: number = this.budgetService.total;
    added: number = this.budgetService.unassigned;
    private addedSub: Subscription

    constructor(private budgetService: BudgetService, private _dialog: MatDialog){}

    ngOnInit(){
        this.addedSub = this.budgetService.unassignedChanged.subscribe(
            (added: number) =>{
                this.added = added;
        })
    }

    onUpdate(){
        this.total = this.budgetService.total;
        this.added = this.budgetService.unassigned;
    }

    onTransfer(){
        this._dialog.open(InputDialog).afterClosed().subscribe(result => {

            this.onUpdate();
        })
    }

    ngOnDestroy() {
        this.addedSub.unsubscribe()
    }
}

@Component ({
    selector: 'ng-input-dialog',
    templateUrl: './input-dialog.html'
})
export class InputDialog{
    public addAmount: number;

    constructor(
        public dialogRef: MatDialogRef<InputDialog>, 
        public budgetService: BudgetService
    ){}

    onAdd(){
        if(this.addAmount){
            this.budgetService.total += this.addAmount;
            this.budgetService.unassigned += this.addAmount;
            this.dialogRef.close();
        }
    };

    onCancel(){
        this.dialogRef.close()
    };
}