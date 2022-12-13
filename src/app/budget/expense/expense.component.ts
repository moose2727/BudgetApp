import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BudgetService } from "../budget.service";
import { ExpenseEditComponent } from "./expense-edit/expense-edit.component";
import { Expense } from "./expense.model";

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
    @Input() expense: Expense;
    @Input() id: number;
    amount: number;
    addAmount: number;

    constructor(private budgetService: BudgetService, private dialog: MatDialog){}

    ngOnInit(){
        this.addAmount = this.expense.weeklyAdd;
    }

    onAdd(){
        this.budgetService.addToFund(this.id, this.addAmount);
    }

    onPay(){
        this.budgetService.pay(this.id, 20);
    }

    onEdit(){
        const dialogRef = this.dialog.open(
            ExpenseEditComponent, 
            { data: 
                {
                    id: this.id
                }
            });

        dialogRef.afterClosed().subscribe(result => {
            console.log('working')
        })
    }
}