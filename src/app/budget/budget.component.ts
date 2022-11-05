import { Component, OnInit } from "@angular/core";
import { BudgetService } from "./budget.service";
import { Expense } from "./expense/expense.model";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit{
    expenses: Expense[];

    constructor(public budgetService: BudgetService){
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
}