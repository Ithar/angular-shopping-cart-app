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
*Hosting* | firebase (8.9.0)
*Build Tool* | Angular CLI
*CI* | n/a 
*Code Coverage* | n/a

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
ng add @ng-bootstrap/ng-bootstrap
sudo npm i -g firebase-tools
```

## Application Build/Components 
```
ng new oshop
cd oshop
ng g c navbar
ng g c home
ng g c products
ng g c shopping-cart
ng g c checkout
ng g c order-success
ng g c login
ng g c my-orders
ng g c admin/admin-products
ng g c admin/admin-product-form
ng g c admin/admin-orders

ng g s service/auth
ng g s service/auth-guard
ng g s service/user
ng g s service/admin-auth-guard
```

## Application Run
```
cd oshop 
ng serve
```

## Application Deploy
```
cd oshop
ng build --prod

firebase login
firebase depoly
```


## Application URL
LocaL : http://localhost:4200
Hosting: https://oshop-angular-v1.web.app
Console: https://console.firebase.google.com/project/oshop-angular-v1/overview

## Further enhancements 
