# angular-shopping-cart-app
Shopping cart hosted on firebase with login and order mangement

#### Features 
- Single-page application 
- Login 
- User authentication 
- Add to cart
- View Orders
- Product mangement

## 

## Application Stack

Stack  | version |
--- | --- |  
*Frontend* | Angular 10
*Node* | v12.18.1
*Hosting* | firebase 
*Build Tool* | Angular CLI
*CI* | n/a 
*Code Coverage* | n/a
*Build env* | firebase

## Prerequisite 
- node
- npm
- Angular CLI
- Firebase Project (oshop-angular-v1)

#### NPM Packages
```
npm i --save firebase
npm i --save @angular/fire
npm i --save bootstrap
````

## Application Build 
```
ng new oshop
cd oshop
ng g c navbar
ng g c home
ng g c products
ng g c shopping-cart
ng g c checkout
ng g c order-success
ng g c my-orders
ng g c admin/admin-products
ng g c admin/admin-orders
```

## Application Run
```
cd oshop 
ng serve
````

## Application URL
http://localhost:4200


## Further enhancements 
