package cd.bensmile.employeemanager.service;


import cd.bensmile.employeemanager.exception.UserNotFoundException;
import cd.bensmile.employeemanager.model.Employee;
import cd.bensmile.employeemanager.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {


    private EmployeeRepo employeeRepo;


    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {

        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployees(Employee employee) {
        return employeeRepo.save(employee);
    }


    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id).orElseThrow(() -> new UserNotFoundException("User with id = " + id + " was not found"));
    }

    public void deleteEmployees(Long id) {
        employeeRepo.delete(findEmployeeById(id));
//        employeeRepo.deleteEmployeeById(id);
    }


}
