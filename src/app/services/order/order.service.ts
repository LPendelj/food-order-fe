import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDERS_CREATE_URL } from 'src/app/shared/constants/urls';
import { Order } from 'src/app/shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  create(order: Order){
    return this.httpClient.post<Order>(ORDERS_CREATE_URL, order);
  }
}
