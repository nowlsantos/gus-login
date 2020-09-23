import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car$: Observable<Car[]>;
  carToEdit: Car;
  editState = false;
  carForm: FormGroup;
  submitted = false;

  constructor(private carService: CarService, private fb: FormBuilder) { }

  ngOnInit() {
    this.car$ = this.carService.getCars();

    this.carForm = this.fb.group({
      brand: [''],
  });
  }

  onEdit(car: Car) {
    console.log('Car: ', car);
    this.editState = true;
    this.carToEdit = car;
  }
  
  onUpdate() {
    console.log("FormValue: ", this.carForm.value.brand);
    this.carService.updateCar(this.carForm.value.brand);
    this.clearState();

  }

  onDelete(car: Car) {
    this.carService.deleteCar(car);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.carToEdit = null;
  }

  onSubmit() {
    this.submitted = true;
		
      if ( this.carForm.invalid ) {
          return;
      }
  }

}
