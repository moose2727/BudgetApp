import { Component, Input, OnInit } from "@angular/core";
import { BudgetService } from "../budget.service";
import { Expense } from "./expense.model";

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
    @Input() expense: Expense;
    @Input() id: number;

    constructor(private budgetService: BudgetService){}

    ngOnInit(){}

    onAdd(){
        this.budgetService.weeklyAdd(this.id);
    }
}