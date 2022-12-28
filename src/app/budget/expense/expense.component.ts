import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
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

    constructor(
        private budgetService: BudgetService, 
        private dialog: MatDialog,
        //private dialogService: ConfirmDialogService
        ){}

    ngOnInit(){
        this.addAmount = this.expense.weeklyAdd;
    }

    onAdd(){
        this.budgetService.addToFund(this.id, this.addAmount);
    }

    onPay(){
        this.budgetService.pay(this.id, this.addAmount);
    }

    onEdit(){
        const dialogRef = this.dialog.open(
            ExpenseEditComponent, 
            { data: 
                {
                    name: this.expense.name,
                    currentTotal: this.expense.currentTotal,
                    weeklyAdd: this.expense.weeklyAdd,
                    target: this.expense.target,
                    id: this.id
                }
            });
    }

    onDelete() {
        const options = {
            title: 'Delete?',
            message: 'Are you sure you want to delete this fund?',
            cancelText: 'No',
            confirmText: 'Yes'
        }

        this.dialog.open(ConfirmDialogComponent, {
            data: options
        }).afterClosed().subscribe(response => {
            if(response == 'Yes'){
                this.budgetService.deleteExpense(this.id);
            }
        });
    }
}