import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
    selector: "app-warning",
    templateUrl: './warning.component.html'
})
export class WarningComponent implements OnInit {
    public message: string;
    public title: string;

    constructor( @Inject(MAT_DIALOG_DATA) public data ){}

    ngOnInit(){
        this.message = this.data.message
    }
}