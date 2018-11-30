enchant();
let game, scene;
const panel = Class.create (Label,{
 initialize : function(id,x,y){
 Label.call(this,id);
     this.id = id;
     this.width = 100;
     this.height = 100;
     this.font = '49px bold monospace';
     this.textAlign = 'center';
     this.color = 'red'
     this.moveTo(x,y);
     this.on('touchstart',this.check)
},
    check: function(){
        if (this.id === game.index){
         this.visible = false;
         game.index += 1;
        }
    }
});
window.onload = function(){
 game = new Core(300,300);
 game.index = 1; 
 scene = game.rootScene

game.onload = function(){
    for (let i = 0;i<9;i++){
        scene.addChild(new panel(i+1,(i*100)%300,~~(i/3)*100));
    }
    /*bear.on('enterframe', function(){
     if(bear.age % 5 == 0)
     bear.moveBy(1,0)
    });*/
};
game.start();

};
