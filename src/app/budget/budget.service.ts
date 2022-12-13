import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Expense } from "./expense/expense.model";
import { MatDialog } from "@angular/material/dialog";
import { WarningComponent } from "./warning/warning.component";

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


    constructor(private dialog: MatDialog) {}

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

    ////ASK ABOUT OBSERVABLES/SUBJECTS///////
    addToFund(id: number, addAmount: number){
        //let amountToAdd: number = this.expenses[id].weeklyAdd;

        if(this.unassigned >= addAmount){
            this.expenses[id].currentTotal += addAmount;
            this.unassigned -= addAmount;

            this.unassignedChanged.next(this.unassigned);
            
        }
        else{
            const dialogRef = this.dialog.open(WarningComponent, 
                { data: 
                {
                    message: 'Insufficient Funds!'
                }
            })
        }
    }

    pay(id: number, value: number){
        this.expenses[id].currentTotal -= value;
    }
}