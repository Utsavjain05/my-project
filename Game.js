class Game {
  constructor() {
    this.button2 = createButton("next");
  }
//get the gameState from database
  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }
// update the gamestate in databse
  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

   start() {
    if (gameState === 0) {
      player = new Player();
      player.getCount();
      player.counter();
      player.count1();
      form = new Form()
      form.display();
    }
//creating sprites fro players
    player10 = createSprite(100, 200);
    player10.addImage("player1", player1Img);
    player10.scale = 0.2;
    player20 = createSprite(300, 200);
    player20.addImage("player2", player2Img);
    player20.scale = 0.2;
    player30 = createSprite(500, 200);
    player30.addImage("player3", player3Img);
    player30.scale = 0.2;
    player40 = createSprite(700, 200);
    player40.addImage("player4", player4Img);
    player40.scale = 0.2;
    players = [player10, player20, player30, player40];
    dino = createSprite(500, 500);
    dino.addImage("dino", dinoImg);
    dino.scale = 0.2;
    enemy=createSprite(500,500,30,30);
    enemy.addImage("enemy", enemyImg);
    enemy.scale = 0.5;
    enemy.visible=false;

    //  life1=createSprite(400,400);
    //life2=createSprite(600,400);
    //life3=createSprite(800,400);
  }

// maam to position cars little away i made a var z and increased it by 100pixel
//+= means z=z+1
  play() {
    form.hide();

    Player.getPlayerInfo();
    player.count();
    if (allPlayers !== undefined) {
      background("white");

      var index = 0;
      var position = 100;
      //x and y position of the cars
      var x = 200;
      var y;
     

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
        position = position + 100;
        
        // if(index===player.index) {//position the cars a little away from each other in x direction
        x = displayWidth - allPlayers[plr].distanceX;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        players[index - 1].x = x;
        players[index - 1].y = y;
        //use data from database to write their name and life
        text(allPlayers[plr].name + "=" + allPlayers[plr].life, position);
        //console.log(allPlayers[plr]);
       // console.log(plr);
        //console.log(index);
        //  }
        if (index === player.index) {
          // console.log(player.index);
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          players[index - 1].shapeColor = "red";
          camera.position.x = players[index - 1].x;
          camera.position.y = players[index - 1].y;


        }


        //textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }


    }
    // console.log(player.index);
//giving movements to the players
    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distanceY += 10
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {

      player.distanceY -= 10
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {

      player.distanceX -= 10
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null) {

      player.distanceX += 10
      player.update();
    }
// making the players lose their life
    if (player10.isTouching(dino) && player.index === 1) {
      player.life = player.life - 1;
    player.update();
      if (player.life === 0) {
        player10.destroy();
      }
    }

    if (player20.isTouching(dino) && player.index === 2) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player20.destroy();
      }
    }

    if (player30.isTouching(dino) && player.index === 3) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player30.destroy();
      }
    }

    if (player40.isTouching(dino) && player.index === 4) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player40.destroy();
      }
    }

//shooting the bullets by the players based on their player.index
    if (keyWentDown("space") && player.index !== null) {
      var bullet1 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      // player.update();
      bullet1.velocityY = -3;
      bullet1.lifetime = 100;
      bullet1Group.add(bullet1);
     // console.log(bullet1Group);
    }

    /*if (keyWentDown("space") && player.index === 2) {
      var bullet2 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      // player.update();
      bullet2.velocityY = -3;
      bullet2.lifetime = 100;
      bullet2Group.add(bullet2);
    }

    if (keyWentDown("space") && player.index === 3) {
      var bullet3 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      //  player.update();
      bullet3.velocityY = -3;
      bullet3.lifetime = 100;
      bullet3Group.add(bullet3);
    }
    if (keyWentDown("space") && player.index === 4) {
      var bullet4 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
      // player.update();
      bullet4.velocityY = -3;
      bullet4.lifetime = 100;
      bullet4Group.add(bullet4);
    }
    */
    //making dino destroy when bullets touch him
    for(var i=0; i<bullet1Group.length;i++){
      if(dino.isTouching(bullet1Group.get(i))){
        count=count+1;
        bullet1Group.get(i).destroy();
        console.log(count);
      
        player.updateCount3(count);
      }
    }
    //why to call the player.update() as if inside it we update the datatbase by global var of 'this' 
    //so if we change that global var it should automatically change in the player.update() na. It should
    //automatically see distance:player.distance so whereber we change player.distance it should go in 
    //update function and and assign player.distance to distance as player.distance is global.Why 
    // player.distance cant go in player.updte() and change the datatbase 
    //ask for initial problem with isTouching
    //problem with keyDown
    //why we put counter function in start function
    //why created count1 variable and why count was not working
    //why was hide function not working for button2
    //why the enemy was not destroying after 30 bullets earleir but after creating it in start it destroyed
    //why when we took the same bulletGroup name it was increasing count1 value as 2
    //in setup getstate would work continuously after setupp is also called becos that is a permamnent 
    //listener
    //when we reseted it we called start becos start() would be called once as it is in setup.so it was
    //not being called up again 
    //in if condition why  we cant use functions
    //how the for loop is working and what happens if the bullet is missed in the for loop. if we shot
    //2 bullets and for loop index is still zero because if the bullet is missed then if condition wont
    //be executed so block of statements is not executed so it will not increment +1 
    //and if we conitunously (case if it icrements without dependence of if condition and jst reads)
    //shot 3 bullets so for loop i will become 2 but our 1st bullet is travelling so our code would hang
    //and 1st and 2nd bullet would not be considered  
    //and if it will not increment +1 till the time bullet is not touched then if the 1st bullet is missed 
    // then it would never increment 
// maam if i change my code how it was before like all were having different groups remove the for loop
// uncooment line 217 and all but if i would write in line 162 as it is newly written ie playerindex!==null
//but rest all as playerindex ===23 or4 then in the output all the players would be able to shot 2 bullets but 1st 
//1st player not becos all other players can go in 2 loops and make 2 sprites but player1 can go only in
//loop1.
//make a note for how for loop is working
//maam if it is working seperately for different i values then if we make a shape using it in code.org
//then it would 1st make shape with i value as 0 then it would seperately make a shape using i value as 
//+10 so with i value as 0 it would again and again make a shape and overlap it on the first shape na.
//I would explain maam using ms paint my question  like with i value as 0 it creates a for loop 
//then with i value as 10 it agains creates a for loop but it is hidden.It creates different for loops 
//for different i values (in lay man language we can say);
//ask for for loop if i remove it in play2 function sprite should disappear aand not be positioned but they 
//were being positoined
    //if (dino.isTouching(bullet1Group)||dino.isTouching(bullet2Group)||dino.isTouching(bullet3Group)||dino.isTouching(bullet4Group)) {

      //count = count + 1;
      //player.updateCount3(count);
     // console.log(count);
    //}
     //console.log(count);

    if (count === 15) {
      dino.destroy();
      gameState = 2;
      game.update(2);
    }
   // console.log(gameState);
    drawSprites();
  }

  play2() {
    form.hide();
    Player.getPlayerInfo();
    var index=0;
    var position;
    var y;
    var x;
    
    for (var plr in allPlayers) {
      //add 1 to the index for every loop
      index = index + 1;
      
      //position cars a little away from each other
      position = position + 100;
      // if(index===player.index) {//position the cars a little away from each other in x direction
      x = displayWidth - allPlayers[plr].distanceX;
      //use data form the database to display the cars in y direction
      y = displayHeight - allPlayers[plr].distanceY;
      players[index - 1].x = x;
      players[index - 1].y = y;
      text(allPlayers[plr].name + "=" + allPlayers[plr].life, position);
      //console.log(allPlayers[plr]);
      //console.log(plr);
      //console.log(index);
      //  }
      if (index === player.index) {
        // console.log(player.index);
        stroke(10);
        fill("red");
        ellipse(x, y, 60, 60);

        players[index - 1].shapeColor = "red";
        camera.position.x = players[index - 1].x;
        camera.position.y = players[index - 1].y;


      }


      //textSize(15);
      // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
    }
    
    // when button is pressed by player his counter should update
      text("NEXT LEVEL", 400, 400);
     
      this.button2.position(500,500);
      this.button2.mousePressed(() => {
      this.button2.hide();
      Counter = Counter + 1;
     // console.log(Counter);
      player.updateCounter(Counter);
    })
    //console.log("Counter"+Counter);
// when counter is updated to 4 it should go to next gamstate
    if (Counter === 4) {
     // console.log("hello");
      game.update(3);
    }
    drawSprites();
  }

  play3() {
    background("white");
    form.hide();
    Player.getPlayerInfo();
    player.count1();
   // console.log(count1);
    var index=0;
    var position;
    var x;
    var y;
    
    for (var plr in allPlayers) {
      //add 1 to the index for every loop
      index = index + 1;
      position = position + 100;
      
      // if(index===player.index) {//position the cars a little away from each other in x direction
      x = displayWidth - allPlayers[plr].distanceX;
      //use data form the database to display the cars in y direction
      y = displayHeight - allPlayers[plr].distanceY;
      players[index - 1].x = x;
      players[index - 1].y = y;
      text(allPlayers[plr].name + "=" + allPlayers[plr].life, position);
     // console.log(allPlayers[plr]);
      //console.log(plr);
      //console.log(index);
      //  }
      if (index === player.index) {
        // console.log(player.index);
        stroke(10);
        fill("red");
        ellipse(x, y, 60, 60);

        players[index - 1].shapeColor = "red";
        camera.position.x = players[index - 1].x;
        camera.position.y = players[index - 1].y;


      }


      //textSize(15);
      // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
    }
    
    
    
    
  //  if (enemy.isTouching(bullet1Group)) {
    //  count1 = count1 + 1;
      
    //}
    enemy.visible=true;
    enemy.x=500;
    enemy.x=500;
    
   
// making player life again as 3
    player.life = 3;
   player.update();
   // maam by default only  the life would be updated to respected players only na due to their  different 
   //player.indexes because computer is of player 1 the code would change this.life to 3 but in update
   //player 1 computer would have player.index as 1 so player + player.imdex 1 would become player 1 so 
   // lifw would change only for player 1 and same for other players in other splayers in update () due to 
   //player.index name would become different and tis.life would be changed to that player only

// when player touch the enemy they whould get their life reduced
    if (player10.isTouching(enemy) && player.index === 1) {
      player.life = player.life - 1;
      player.update();
      if (player.life === 0) {
        player10.destroy();
      }
    }
// maam if we want to write if condition of player.life =0 then destroy outside  if of player10 is touching 
//then we would have to write like this player.life===0 && player.index===1 and so on . So that computer does not get confused which player life is tlked about.
// and if we write it outside as it is then it would assume player.life of player1 and as soon as life becomes 0 it would destroy all the sprites of all te players.
//because according to its life is 0 and written is if player.life is 0 then destroy sprites so it would destroy rest of the sprites too becasue we ddint specified when life is 0 whose all sprite to be destroyed.
//i would explain like if we are on 1st player window and his index is 1 so but acc to code player10,20,30,40 sprite can be destroyed when this.life is 0 so as soon as only player1 life would be 0 it would enter into all others condition too and destroy them.
    if (player20.isTouching(enemy) && player.index === 2) {
        player.life = player.life - 1;
        player.update();
        if (player.life === 0) {
          player20.destroy();
        }
      }

    if (player30.isTouching(enemy) && player.index === 3) {
          player.life = player.life - 1;
          player.update();
          if (player.life === 0) {
            player30.destroy();
          }
        }
      
    if (player40.isTouching(enemy) && player.index === 4) {
            player.life = player.life - 1;
            player.update();
            if (player.life === 0) {
              player40.destroy();
            }
          }
// giving movements to players based on their player.index
    if (keyIsDown(UP_ARROW) && player.index !== null) {
              player.distanceY += 10
              player.update();
      }

   if (keyIsDown(DOWN_ARROW) && player.index !== null) {

              player.distanceY -= 10
              player.update();
            }
            if (keyIsDown(RIGHT_ARROW) && player.index !== null) {

              player.distanceX -= 10
              player.update();
            }
            if (keyIsDown(LEFT_ARROW) && player.index !== null) {

              player.distanceX += 10
              player.update();
            }
            //shooting the bullets
            if (keyWentDown("space") && player.index !== null) {
              var bullet1 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              // player.update();
              bullet1.velocityY = -3;
              bullet1.lifetime = 100;
              bullet2Group.add(bullet1);
              console.log(bullet2Group);
            }
            for(var i=0; i<bullet2Group.length;i++){
              //console.log(i);
              if(enemy.isTouching(bullet2Group.get(i))){
                count1=count1+1;
                bullet2Group.get(i).destroy();
                console.log(count1);
               // console.log(i);
              
                player.updatecount1(count1);
              }}
              if (count1 === 30) {
                enemy.destroy();
                text("well played", 400, 400)
              }
            /*
            if (keyDown("space") && player.index === 2) {
              var bullet2 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              // player.update();
              bullet2.velocityY = -3;
              bullet2.lifetime = 100;
              bullet2Group.add(bullet2);
            }
            if (keyDown("space") && player.index === 3) {
              var bullet3 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              //  player.update();
              bullet3.velocityY = -3;
              bullet3.lifetime = 100;
              bullet3Group.add(bullet3);
            }
            if (keyDown("space") && player.index === 4) {
              var bullet4 = createSprite(displayWidth - player.distanceX, displayHeight - player.distanceY, 10, 20);
              // player.update();
              bullet4.velocityY = -3;
              bullet4.lifetime = 100;
              bullet4Group.add(bullet4);
            }
            */
            //if(dino.isTouching(bullet1Group || bullet2Group || bullet3Group || bullet4Group)){
            //player.count();

            //count=count+1;
            //player.updateCount(count);
            //}
            if(count1===30&&gameState===3){
              player.updateCount(0);
              game.update(0);
              player.updateCount3(0);
              player.updateCounter(0);
              player.updatecount1(0);
              game.start(); 


            }

           
            drawSprites();
          }
          // end(){
          //console.log("game ended")
          // console.log(player.rank);
          //game.update(2);

          //}
        }
  //why we createdd sprite in start function.
  //are they taking in built width and height.
  //what position we give to an image is taken from its centre or corner.
  //what is 0,0 in the canvas.
  //why is it happening like to which car we are pressing up arrow only that distance increse.
  //what about camera.
  //maam we are changing gameState in database and so on what basis we are saying if gameState===1 in sketch.j we have nowhere changed 
  //variable gameState of visual studio
  //index
  //why sprites are not bieng created as they are called in start function;
  //if(keyDown(knw)){
    //var bullet= create
  //
//if(SVGFEGaussianBlurElement.isTouching dino{
  //count=count+1;
  //gameState=3;
//}
//if()
//for next mission 
//If(gameStae 3)
//if player.index is one then it is prfeeded in computer to take things of that player.index
//if there are 4 vars of this.distanceX then why it is wrong here it should know by itself which this.distance to take
// why bullet position are not working.




//here gameState is changed to 3 but not in the play function . so sprites should disappear from there.