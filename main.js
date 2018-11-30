enchant();
let game, scene;
const Base = Class.create(Sprite,{
 initialize : function(width,height,x,y){
 Sprite.call(this,width,height);
 this.moveTo(x || 0,y || 0);
 }
});
const Bear = Class.create(Base,{
 initialize : function(x,y){
 Base.call(this,32,32,x,y);
 this.image = game.assets['./assets/imags/chara1.png']
}
});

window.onload = function(){
 game = new Core();
 scene = game.rootScene
game.preload('./assets/imags/chara0.png');
game.preload('./assets/imags/chara1.png');

game.onload = function(){
    const bear = new Bear(32,32);
    scene.addChild(bear);

    bear.on('enterframe', function(){
     if(bear.age % 5 == 0)
     bear.moveBy(1,0)
    });
    bear.on('touchstart', () => {});
    };
game.start();

};

