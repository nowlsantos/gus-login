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

	get brand() {
        return this.carForm.get('brand');
    }
	

	onEdit(car: Car) {
		this.editState = true;
		this.carToEdit = car;
	}

	updateCar(car: Car) {
		car.brand = this.carForm.value.brand;
		console.log("updateCar: ", car, "Value:", this.carForm.value);
		this.carService.updateCar(car);
		this.clearState();

	}

	deleteCar(car: Car) {
		this.carService.deleteCar(car);
		this.clearState();
	}

	clearState() {
		this.editState = false;
		this.carToEdit = null;
	}

	/* onSubmit() {
		this.submitted = true;

		if (this.carForm.invalid) {
			return;
		}

		console.log('OnSubmit: ', this.carForm.value);
	} */

}
