import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BudgetService } from "./budget.service";
import { ExpenseEditComponent } from "./expense/expense-edit/expense-edit.component";
import { Expense } from "./expense/expense.model";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit{
    expenses: Expense[];

    constructor(public budgetService: BudgetService, public dialog: MatDialog){
    }

    ngOnInit() {
        this.getExpenses();
    }

    onAddNewExpense(){
        this.budgetService.addExpense();
        this.getExpenses();
    }

    getExpenses(){
        this.expenses = this.budgetService.expenses.slice();
    }

    openDialog(){
        const dialogRef = this.dialog.open(ExpenseEditComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog result: ${result}')
        })
    }
}

// @Component({
//     selector: 'add-expense-dialog',
//     templateUrl: './add-new-expense-dialog.html'
// })
// export class AddNewExpenseDialog {
//     @ViewChild('f', {static: false}) newExpenseForm: NgForm

//     onSubmit(){}

// }