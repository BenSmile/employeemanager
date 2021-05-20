package cd.bensmile.employeemanager.controller;

import cd.bensmile.employeemanager.model.Employee;
import cd.bensmile.employeemanager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeResource {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public ResponseEntity<List<Employee>> findAllEmployees() {
        List<Employee> allEmployees = employeeService.findAllEmployees();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findEmployeeById(@PathVariable("id") Long id) {

        try {
            Employee e = employeeService.findEmployeeById(id);
            return new ResponseEntity<>(e, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
        Employee e = employeeService.addEmployee(employee);
        return new ResponseEntity<>(e, HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee employee) {
        Employee e = employeeService.addEmployee(employee);
        return new ResponseEntity<>(e, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployees(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
