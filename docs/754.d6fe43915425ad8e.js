"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[754],{9754:(S,C,c)=>{c.r(C),c.d(C,{ROUTES:()=>N});var t=c(4650),_=c(1096),m=c(4859),f=c(6264),x=c(9263),p=c(6087),g=c(6895),r=c(3546),T=c(5229),h=c(4144),l=c(4006),v=c(3336),Z=c(4004),y=c(9549);function A(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),t._uU(3),t.qZA(),t.TgZ(4,"mat-card-subtitle"),t._uU(5),t.qZA()(),t.TgZ(6,"mat-card-content")(7,"mat-form-field",6)(8,"input",7),t.NdJ("ngModelChange",function(i){const d=t.CHM(n).$implicit,P=t.oxw();return t.KtG(P.changeCartItemQuantity(d.id,i))}),t.qZA()(),t.TgZ(9,"button",8),t.NdJ("click",function(){const u=t.CHM(n).$implicit,d=t.oxw();return t.KtG(d.deleteCartItem(u.id))}),t.TgZ(10,"mat-icon"),t._uU(11,"delete"),t.qZA()()()()}if(2&e){const n=a.$implicit;t.xp6(3),t.Oqu(n.name),t.xp6(2),t.AsE("Price: ",n.price,"; Total: ",n.price*n.quantity,""),t.xp6(3),t.Q6J("ngModel",n.quantity)}}function M(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"mat-list-option",13),t.NdJ("selectedChange",function(){const u=t.CHM(n).$implicit,d=t.oxw(3);return t.KtG(d.selectCard(u))}),t._uU(1),t.qZA()}if(2&e){const n=a.$implicit;t.Q6J("value",n),t.xp6(1),t.hij(" ",n," ")}}const $=function(){return[]};function I(e,a){if(1&e&&(t.TgZ(0,"div")(1,"h3"),t._uU(2,"Select a card to pay:"),t.qZA(),t.TgZ(3,"mat-selection-list",11),t.YNc(4,M,2,2,"mat-list-option",12),t.qZA()()),2&e){const n=t.oxw().ngIf;t.xp6(3),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("ngForOf",n||t.DdM(2,$))}}const J=function(){return{account:"view"}},Q=function(e){return{outlets:e}},U=function(e){return["/",e]};function O(e,a){1&e&&(t._uU(0," There is no cards to pay. Please go to the "),t.TgZ(1,"a",14),t._uU(2,"Account"),t.qZA(),t._uU(3," and add a payment method. ")),2&e&&(t.xp6(1),t.Q6J("routerLink",t.VKq(4,U,t.VKq(2,Q,t.DdM(1,J)))))}function F(e,a){if(1&e&&(t.ynx(0),t.YNc(1,I,5,3,"div",9),t.YNc(2,O,4,6,"ng-template",null,10,t.W1O),t.BQk()),2&e){const n=a.ngIf,o=t.MAs(3);t.xp6(1),t.Q6J("ngIf",null==n?null:n.length)("ngIfElse",o)}}class s{constructor(){this.cartService=(0,t.f3M)(T.N),this.router=(0,t.f3M)(f.F0),this.account$=(0,t.f3M)(x.B).account$,this.cart$=this.cartService.cart$,this.totalPrice$=this.cart$.pipe((0,Z.U)(a=>a.reduce((n,o)=>n+o.price*o.quantity,0))),this.selectedCard=null}selectCard(a){this.selectedCard=a}changeCartItemQuantity(a,n){this.cartService.changeQuantity(a,n)}deleteCartItem(a){this.cartService.deleteProduct(a)}clear(){this.cartService.clear(),this.router.navigate([{outlets:{cart:null}}])}}s.\u0275fac=function(a){return new(a||s)},s.\u0275cmp=t.Xpm({type:s,selectors:[["router-outlet-side-panel-cart"]],standalone:!0,features:[t.jDz],decls:14,vars:13,consts:[[3,"title"],[1,"flex"],["mat-button","","color","primary",3,"disabled","click"],[1,"plain-wrapper"],[4,"ngFor","ngForOf"],[4,"ngIf"],["appearance","outline"],["type","number","matInput","",3,"ngModel","ngModelChange"],["mat-icon-button","",3,"click"],[4,"ngIf","ngIfElse"],["noPaymentsMethods",""],[3,"multiple"],[3,"value","selectedChange",4,"ngFor","ngForOf"],[3,"value","selectedChange"],[3,"routerLink"]],template:function(a,n){if(1&a&&(t.TgZ(0,"side-panel-header",0)(1,"div",1)(2,"h3"),t._uU(3,"Total:"),t.qZA(),t._uU(4),t.ALo(5,"async"),t.TgZ(6,"button",2),t.NdJ("click",function(){return n.clear()}),t.ALo(7,"async"),t._uU(8," Buy "),t.qZA()()(),t.TgZ(9,"div",3),t.YNc(10,A,12,4,"mat-card",4),t.ALo(11,"async"),t.YNc(12,F,4,2,"ng-container",5),t.ALo(13,"async"),t.qZA()),2&a){let o,i;t.Q6J("title","Cart"),t.xp6(4),t.hij(" ",t.lcZ(5,5,n.totalPrice$)," "),t.xp6(2),t.Q6J("disabled",!n.selectedCard||!(null!=(o=t.lcZ(7,7,n.cart$))&&o.length)),t.xp6(4),t.Q6J("ngForOf",t.lcZ(11,9,n.cart$)),t.xp6(2),t.Q6J("ngIf",null==(i=t.lcZ(13,11,n.account$))?null:i.cards)}},dependencies:[_.$0,m.ot,m.lW,m.RK,f.rH,p.ie,p.Ub,p.vS,g.sg,g.Ov,g.O5,r.QW,r.a8,r.dn,r.dk,r.$j,r.n5,h.c,h.Nt,y.KE,l.u5,l.Fj,l.wV,l.JJ,l.On,v.Ps,v.Hw],styles:[".flex[_ngcontent-%COMP%]{display:flex;align-items:center}.flex[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:4px}"],changeDetection:0});const N=[{path:"",component:s}]}}]);