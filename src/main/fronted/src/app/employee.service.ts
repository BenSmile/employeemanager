import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/Employee";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerURL = environment.apiBaseUrl;


  constructor(private http: HttpClient) {
  }


  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerURL}/api/employee/`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerURL}/api/employee/`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerURL}/api/employee/`, employee);
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<any>(`${this.apiServerURL}/api/employee/${employeeId}`);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/api/employee/${employeeId}`);
  }
}
