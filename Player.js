class Player {
    constructor(){
      this.index = null;
      this.distanceX = 0;
      this.distanceY=0;
      this.name = null;
  this.rank=null;
  this.life=3;
  //this.Count=0;
    }
  //static dino(){
    //  var dinoRef =database.ref('playerlive');
      //dinoRef.on("value",(data)=>{
    //playerlive=data.val();
      //})
    //}
    //updateLive(live){
//database.ref('/').update({
//playerlive:live

//})


   // }
   count1(){
var count1ref=database.ref('count1');
count1ref.on("value",(data)=>{
  count1=data.val();
  //console.log(count1);
})
   }
   updatecount1(count){
database.ref('/').update({
  count1:count
})
   } 
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
       // console.log(playerCount);

      })
    }
    count(){
    var Countref=database.ref('count');
    Countref.on("value",(data)=>{
      count=data.val();
      //console.log(count);
    })
  }
   updateCount3(count3){
    //console.log(count3);
database.ref('/').update({
count:count3
})
  }

    counter(){
      var counterref=database.ref('Counter');
counterref.on("value",(data)=>{
  Counter=data.val();
  //console.log(Counter);
})
}  
  updateCounter(count2){
  //console.log(count2);
  database.ref('/').update({
    Counter:count2
  })
}
    
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      })
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distanceY:this.distanceY,
        distanceX:this.distanceX,
        life:this.life
      })
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
      //console.log(allPlayers);
    }

  }
  

  //in actual i want when all the players had pressed the key then only thry should enter.for that i had made  a counter function.