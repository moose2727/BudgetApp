import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
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
    private subscription: Subscription

    constructor(public budgetService: BudgetService, public _dialog: MatDialog){}

    ngOnInit() {
        this.getExpenses();
        this.subscription = this.budgetService.expensesChanged.subscribe(
            (expenses: Expense[]) => {
                this.expenses = expenses;
            }
        )
    }

    // onAddNewExpense(){
    //     this.getExpenses();
    // }

    getExpenses(){
        this.expenses = this.budgetService.expenses.slice();
    }

    onAddNewExpense(){
        this._dialog.open(ExpenseEditComponent);
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