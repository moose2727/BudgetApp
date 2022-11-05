import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Expense } from "./expense/expense.model";

@Injectable({providedIn: 'root'})
export class BudgetService{
    public unassignedChanged = new Subject<number>()
    public total: number = 50178
    public unassigned: number = 0
    public expenses = [
        new Expense('House', 42015, 401.25, 50000),
        new Expense('Invest', 75, 25, 100)
    ];
    

    addExpense(){
        this.expenses.push(
            new Expense('New Expense', 0, 0, 0)
        )
    }

    ////ASK ABOUT OBSERVABLES/SUBJECTS///////
    weeklyAdd(id: number){
        let amountToAdd: number = this.expenses[id].weeklyAdd;

        if(this.unassigned >= amountToAdd){
            this.expenses[id].currentTotal += this.expenses[id].weeklyAdd;
            this.unassigned -= amountToAdd;

            this.unassignedChanged.next(this.unassigned);
            
        }
        else{
            console.log('Insufficient funds!')
        }
        
        
    }
}