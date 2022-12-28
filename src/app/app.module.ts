import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from'@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpenseEditComponent } from './budget/expense/expense-edit/expense-edit.component';
import { ExpenseComponent } from './budget/expense/expense.component';
import { HeaderComponent, InputDialog } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from './budget/warning/warning.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './shared/confirm-dialog/confirm-dialog.service';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    HeaderComponent,
    ExpenseComponent,
    ExpenseEditComponent,
    WarningComponent,
    ConfirmDialogComponent,
    InputDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
