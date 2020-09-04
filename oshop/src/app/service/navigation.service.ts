import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService  {

  private RETURN_URL: string;

  currentUrl: string = "/";
  previousUrl: string = "/";
  
  urlChange(url) {
    this.previousUrl = this.currentUrl;
    this.currentUrl = url;

    if (this.currentUrl === '/login' && this.previousUrl === '/shopping-cart') {
      localStorage.setItem(this.RETURN_URL, '/checkout');   
    } 
  }

  getReturnUrl(): string {
    let returnUrl = localStorage.getItem(this.RETURN_URL);
    if (returnUrl) {
      localStorage.removeItem(this.RETURN_URL);
      return returnUrl;
    }

    return '/';
  }
}
