import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BudgetService } from "../../budget.service";
import { Expense } from "../expense.model";

@Component({
    selector: 'app-expense-edit',
    templateUrl: './expense-edit.component.html',
    styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit{
    @ViewChild('f', {static: false}) expenseForm: NgForm;
    expense: Expense;
    editMode: boolean = false;
    id: number;

    constructor(
        public dialogRef: MatDialogRef<any>, 
        @Inject(MAT_DIALOG_DATA) public data,
        public budgetService: BudgetService){}

    ngOnInit() {
        this.dialogRef.updateSize('70%')
        if(this.data){
            this.id = this.data.id
            this.editMode = true;
            this.expense = new Expense(
                this.budgetService.expenses[this.id].name, 
                this.budgetService.expenses[this.id].currentTotal,
                this.budgetService.expenses[this.id].weeklyAdd,
                this.budgetService.expenses[this.id].target);
        }
        else{
            this.expense = new Expense(null, null, null, null)
            this.editMode = false;
        }
    }

    onSubmit(form: NgForm){        
        const value = form.value;
        this.expense.name = value.expenseTitle;
        this.expense.currentTotal = value.currentTotal;
        this.expense.target = value.goal, 
        this.expense.weeklyAdd = value.weeklyAdd;
        if(this.editMode){
            this.budgetService.updateExpense(this.id, this.expense)
        }
        else{
            this.budgetService.addExpense(this.expense)
        }
    }
}