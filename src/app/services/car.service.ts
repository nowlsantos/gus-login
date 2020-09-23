import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
	providedIn: 'root'
})
export class CarService {

	private tasksCollection: AngularFirestoreCollection<Car>;
	private taskDoc: AngularFirestoreDocument<Car>;
	private task: Observable<Car>;

	constructor(private db: AngularFirestore) { 
		this.tasksCollection = this.db.collection<Car>('cars');
	}

	getCars() {
		return this.tasksCollection.valueChanges({ idField: 'id'});
	}

	getCar(id: string) {
        this.taskDoc = this.db.doc(`cars/${id}`);
        this.task = this.taskDoc.valueChanges();
        return this.task;
    }

	//---CRUD operations---
	addCar(task: Car) {
		this.tasksCollection.add(task);
	}

	updateCar(car: Car) {
		this.taskDoc = this.db.doc(`cars/${car.id}`);
		this.taskDoc.update(car);
	}

	deleteCar(car: Car) {
        this.taskDoc = this.db.doc(`cars/${car.id}`);
        this.taskDoc.delete();
    }
}
