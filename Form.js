class Form {

    constructor() {
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.greeting = createElement('h2');
      this.title = createElement('h2');
      this.reset = createButton('reset');
    }
    hide(){
      this.greeting.hide();
      this.button.hide();
      this.input.hide();
      this.title.hide();
    }
  
    display(){
      this.title.html("Village adventure game");
      this.title.position(displayWidth/2 - 50, 0);
  
      this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
      this.button.position(displayWidth/2 + 30, displayHeight/2);
      this.reset.position(displayWidth/4,20);
  
      this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        player.name = this.input.value();
       // console.log(this.input.value());
        playerCount+=1;
        player.index = playerCount;
        player.update();
        player.updateCount(playerCount);
//console.log(player.index);

                this.greeting.html("Hello " + player.name)
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      });
      this.reset.mousePressed(()=>{
  player.updateCount(0);
  game.update(0);
  player.updateCount3(0);
  player.updateCounter(0);
  player.updatecount1(0);
  game.start();
      });
  
    }
  }
  