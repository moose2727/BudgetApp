import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { BudgetService } from "../budget/budget.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    total: number = this.budgetService.total;
    added: number = this.budgetService.unassigned;
    private addedSub: Subscription

    constructor(private budgetService: BudgetService){}

    ngOnInit(){
        this.addedSub = this.budgetService.unassignedChanged.subscribe(
            (added: number) =>{
                this.added = added;
        })
    }

    onUpdate(){
        this.total = this.budgetService.total;
        this.added = this.budgetService.unassigned;
    }

    onTransfer(){
        //this.added += 785;
        //this.total += 785;
        this.budgetService.unassigned += 785;
        this.budgetService.total += 785;
        this.onUpdate();
    }

    ngOnDestroy() {
        this.addedSub.unsubscribe()
    }
}