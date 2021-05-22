import {Component, OnInit} from '@angular/core';
import {Employee} from "../model/Employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {by} from "protractor";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fronted';
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;


  constructor(private emplyeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  public getEmployees(): void {

    this.emplyeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }


  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.emplyeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        addForm.reset();
        alert(error.message)
      }
    )
  }


  public onUpdateEmployee(employee: Employee): void {
    this.emplyeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        this.getEmployees();
        // alert('Employee updated successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onDeleteEmployee(employee: Employee): void {
    this.emplyeeService.deleteEmployee(employee.id).subscribe(
      (response: void) => {
        this.getEmployees();
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    alert('Employee deleted successfully');
  }
}
