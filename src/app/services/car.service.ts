import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
	providedIn: 'root'
})
export class CarService {

	private carsCollection: AngularFirestoreCollection<Car>;
	private carDoc: AngularFirestoreDocument<Car>;
	private car: Observable<Car>;

	constructor(private db: AngularFirestore) { 
		this.carsCollection = this.db.collection<Car>('cars');
	}

	getCars() {
		return this.carsCollection.valueChanges({ idField: 'id'});
	}

	getCar(id: string) {
        this.carDoc = this.db.doc(`cars/${id}`);
        this.car = this.carDoc.valueChanges();
        return this.car;
    }

	//---CRUD operations---
	addCar(car: Car) {
		this.carsCollection.add(car);
	}

	updateCar(car: Car) {
		console.log('ID: ', car.id);
		this.carDoc = this.db.doc(`cars/${car.id}`);
		this.carDoc.update(car);
	}

	deleteCar(car: Car) {
        this.carDoc = this.db.doc(`cars/${car.id}`);
        this.carDoc.delete();
    }
}
