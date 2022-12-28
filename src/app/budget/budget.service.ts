import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Expense } from "./expense/expense.model";
import { MatDialog } from "@angular/material/dialog";
import { WarningComponent } from "./warning/warning.component";
import { ConfirmDialogService } from "../shared/confirm-dialog/confirm-dialog.service";

@Injectable({providedIn: 'root'})
export class BudgetService{
    public expensesChanged = new Subject<Expense[]>()
    public unassignedChanged = new Subject<number>()
    public total: number = 50178
    public unassigned: number = 0
    public expenses = [
        new Expense('House', 42015, 401.25, 50000),
        new Expense('Invest', 75, 25, 100)
    ];


    constructor(private dialog: MatDialog, private dialogService: ConfirmDialogService) {}

    getExpenses(){
        return this.expenses.slice();
    }

    addExpense(expense: Expense){
        this.expenses.push(expense)
        this.expensesChanged.next(this.expenses.slice())
    }

    updateExpense(index: number, updatedExpense: Expense){
        this.expenses[index] = updatedExpense;
        this.expensesChanged.next(this.expenses.slice())
    }

    deleteExpense(index: number) {
        this.expenses.splice(index, 1);
        this.expensesChanged.next(this.expenses.slice())
    }

    ////ASK ABOUT OBSERVABLES/SUBJECTS///////
    addToFund(id: number, addAmount: number){
        //let amountToAdd: number = this.expenses[id].weeklyAdd;

        if(this.unassigned >= addAmount){
            this.expenses[id].currentTotal += addAmount;
            this.unassigned -= addAmount;

            this.unassignedChanged.next(this.unassigned);
            
        }
        else{ 
            const options = {
                title: 'Insufficient Funds!',
                message: 'Unable to add entered amount.',
                cancelText: null,
                confirmText: 'OK'
              };
            this.dialogService.open(options);

            // this.dialogService.confirmed().subscribe(confirmed => {
            //     if(confirmed) {
            //         console.log('confirmed')
            //     }
            // })
        }
    }

    pay(id: number, value: number){
        const options ={
            title: "Insufficient Funds!",
            message: 'Unable to subtract more than is in your fund.',
            cancelText: null,
            confirmText: 'Ok'
        }
        if(value > this.expenses[id].currentTotal){
            this.dialogService.open(options)
        }
        else{
            this.expenses[id].currentTotal -= value;
            this.unassigned += value;
            this.unassignedChanged.next(this.unassigned);

        }
    }
}