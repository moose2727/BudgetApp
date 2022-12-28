import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { BudgetService } from "../../budget.service";
import { Expense } from "../expense.model";

@Component({
    selector: 'app-expense-edit',
    templateUrl: './expense-edit.component.html',
    styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit{
    // @ViewChild('f', {static: false}) expenseForm: NgForm;
    expense: Expense;
    editMode: boolean = false;
    id: number;

    constructor(
        public dialogRef: MatDialogRef<any>, 
        @Inject(MAT_DIALOG_DATA) public data,
        public budgetService: BudgetService,
        public _dialog: MatDialog
        ){}

    ngOnInit() {
        this.dialogRef.updateSize('70%')
        if(this.data){
            this.id = this.data.id
            this.updatefields();
        }
        else{
            this.expense = new Expense(null, null, null, null)
            this.editMode = false;
        }
    }

    updatefields(){
        this.editMode = true;
            this.expense = new Expense(
                this.budgetService.expenses[this.id].name, 
                this.budgetService.expenses[this.id].currentTotal,
                this.budgetService.expenses[this.id].weeklyAdd,
                this.budgetService.expenses[this.id].target);
    }

    onSubmit(){   
        //this._dialog.openDialogs.pop();
        const options = {
            title: 'Confirm',
            message: 'Are you sure you want to submit this fund?',
            cancelText: 'Cancel',
            confirmText: 'Submit'
        }
        this._dialog.open(ConfirmDialogComponent, {
            data: options
        }).afterClosed().subscribe(response => {
            //debugger
            if(response == 'Submit'){
                
                if(this.editMode){
                    this.budgetService.updateExpense(this.id, this.expense)
                }
                else{
                    this.budgetService.addExpense(this.expense)
                }
            }
            else {
                //this.editMode = true;
                // this._dialog.open(ExpenseEditComponent, {
                //     data: this.id
                // }) 
                
            }
        })
    }
}