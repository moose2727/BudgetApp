import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-expense-edit',
    templateUrl: './expense-edit.component.html',
    styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<any>){}

    ngOnInit() {
        this.dialogRef.updateSize('70%')
    }

    onSubmit(form: NgForm){
        console.log(form)
    }
}