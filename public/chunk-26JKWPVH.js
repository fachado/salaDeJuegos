import{a as O}from"./chunk-PO6BKCYX.js";import{a as v,b}from"./chunk-26P5D4RR.js";import"./chunk-EQEK2HY6.js";import"./chunk-5JQXZNA7.js";import{a as j}from"./chunk-6TQQLW6Z.js";import{La as u,Oa as i,Pa as m,Ya as C,Zb as P,_a as l,ab as r,bb as a,cb as h,cc as S,da as f,e as y,g,hb as p,mb as c,ob as k,vb as _}from"./chunk-42U72ICL.js";var d=y(j());function E(o,t){if(o&1&&(r(0,"div",9),h(1,"img",10),a()),o&2){let e=t.$implicit;i(),l("src",e.image,u)("alt",e.code)}}function x(o,t){if(o&1&&(r(0,"div",9),h(1,"img",10),a()),o&2){let e=t.$implicit;i(),l("src",e.image,u)("alt",e.code)}}var M=class o{constructor(t,e,n){this.cardsService=t;this.resultadosService=e;this.userService=n}deckId="";playerCards=[];dealerCards=[];playerScore=0;dealerScore=0;gameStatus="En curso";gameEnded=!1;ngOnInit(){this.startGame()}startGame(){this.cardsService.createDeck().subscribe(t=>{this.deckId=t.deck_id,this.playerCards=[],this.dealerCards=[],this.playerScore=0,this.dealerScore=0,this.gameStatus="En curso",this.gameEnded=!1,this.drawPlayerCard(),this.drawPlayerCard(),this.drawDealerCard()})}drawPlayerCard(){this.gameEnded||this.cardsService.drawCard(this.deckId).subscribe(t=>{let e=t.cards[0];this.playerCards.push(e),this.playerScore=this.calculateScore(this.playerCards),this.checkGameStatus()})}drawDealerCard(){this.cardsService.drawCard(this.deckId).subscribe(t=>{let e=t.cards[0];this.dealerCards.push(e),this.dealerScore=this.calculateScore(this.dealerCards)})}calculateScore(t){let e=0,n=0;for(t.forEach(s=>{s.value==="ACE"?(e+=11,n++):["KING","QUEEN","JACK"].includes(s.value)?e+=10:e+=parseInt(s.value)});e>21&&n;)e-=10,n--;return e}stand(){return g(this,null,function*(){if(!this.gameEnded){for(this.gameEnded=!0;this.dealerScore<17;)yield this.dealToDealerWithDelay();this.finalizeGame()}})}dealToDealerWithDelay(){return g(this,null,function*(){return new Promise(t=>{setTimeout(()=>{this.dealerScore<17&&this.drawDealerCard(),t()},800)})})}finalizeGame(){this.dealerScore>21||this.playerScore>this.dealerScore?(this.gameStatus="Ganaste",this.saveScore(!0),d.default.fire({title:"Ganaste",html:`\xA1Felicitaciones!<br>Puntaje final: ${this.playerScore}`,icon:"success",timer:2e3})):(this.gameStatus="Perdiste",this.saveScore(!1),d.default.fire({title:"Perdiste",html:`Puntaje del dealer: ${this.dealerScore}<br>Tu puntaje: ${this.playerScore}`,icon:"error",timer:2e3}))}checkGameStatus(){this.playerScore>21?(this.gameEnded=!0,this.gameStatus="Perdiste",this.saveScore(!1),d.default.fire({title:"Perdiste",html:`Te pasaste de 21<br>Tu puntaje: ${this.playerScore}`,icon:"error"})):this.playerScore===21&&(this.gameEnded=!0,this.gameStatus="Ganaste",this.saveScore(!0),d.default.fire({title:"\xA1Blackjack!",html:`Lograste 21<br>Puntaje final: ${this.playerScore}`,icon:"success"}))}saveScore(t){let e=this.userService.getUserEmail();if(e){let n=this.playerScore,s=t?"Victoria":"Derrota";this.resultadosService.guardarResultado(e,"Blackjack",n)}}static \u0275fac=function(e){return new(e||o)(m(O),m(b),m(v))};static \u0275cmp=f({type:o,selectors:[["app-black-jack"]],standalone:!0,features:[_],decls:24,vars:6,consts:[[1,"blackjack-container"],[1,"score-board"],[1,"cards-container"],[1,"player"],["class","card",4,"ngFor","ngForOf"],[1,"dealer"],[1,"controls"],[3,"click","disabled"],[3,"click"],[1,"card"],[3,"src","alt"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"h1"),c(2,"Blackjack"),a(),r(3,"div",1)(4,"p"),c(5),a(),r(6,"p"),c(7),a()(),r(8,"div",2)(9,"div",3)(10,"h2"),c(11,"Jugador"),a(),C(12,E,2,2,"div",4),a(),r(13,"div",5)(14,"h2"),c(15,"Dealer"),a(),C(16,x,2,2,"div",4),a()(),r(17,"div",6)(18,"button",7),p("click",function(){return n.drawPlayerCard()}),c(19,"Pedir Carta"),a(),r(20,"button",7),p("click",function(){return n.stand()}),c(21,"Plantarse"),a(),r(22,"button",8),p("click",function(){return n.startGame()}),c(23,"Volver a Jugar"),a()()()),e&2&&(i(5),k("Tu Puntuaci\xF3n: ",n.playerScore,""),i(2),k("Puntuaci\xF3n del Dealer: ",n.dealerScore,""),i(5),l("ngForOf",n.playerCards),i(4),l("ngForOf",n.dealerCards),i(2),l("disabled",n.gameStatus!=="En curso"),i(2),l("disabled",n.gameStatus!=="En curso"))},dependencies:[S,P],styles:[".blackjack-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;color:#e0e0ff;background:#2e0352;padding:2rem;border-radius:15px;box-shadow:0 0 20px #0000ff80}.blackjack-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2.5rem;color:#b0a8f0;text-shadow:0px 0px 10px #6c6cff}.blackjack-container[_ngcontent-%COMP%]   .score-board[_ngcontent-%COMP%]{font-size:1.5rem;margin-bottom:1rem}.blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;width:100%;margin:1.5rem 0}.blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .player[_ngcontent-%COMP%], .blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .dealer[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .player[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .dealer[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.8rem;color:#8c72ef}.blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .player[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%], .blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .dealer[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{margin:.3rem}.blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .player[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .dealer[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:auto;border-radius:5px;transition:transform .3s ease;box-shadow:0 0 10px #00f7ff}.blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .player[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover, .blackjack-container[_ngcontent-%COMP%]   .cards-container[_ngcontent-%COMP%]   .dealer[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.blackjack-container[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]{display:flex;gap:1rem}.blackjack-container[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:#5e40f0;color:#fff;border:none;padding:.8rem 1.5rem;font-size:1.2rem;border-radius:5px;cursor:pointer;transition:background .3s}.blackjack-container[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#9b80ff}"]})};export{M as BlackjackComponent};