enchant();
let game, scene;
var Gspeed = 0.2;//重力加速度
var enemy_Gspeed = 0.1;//重力加速度(敵)
var yuka = 148;//床の基準値
var Junp = 0;//ジャンプ中かどうか判定 1の状態はジャンプ中
var gravity_kuma = 0;//今の落下速度
var FPS = 5;
var Bomlist = [];//爆弾のリスト
var enemylist = [];//敵のリスト

const Bear_base = Class.create(Sprite,{
    initialize : function(){
       Sprite.call(this,32,32);
       this.image = game.assets['./assets/imags/chara1.png'];
    }
})

const Bear = Class.create(Bear_base,{//自機の管理
    initialize : function(){
       Bear_base.call(this);
       this.moveTo(132,yuka);
        this.addEventListener(Event.ENTER_FRAME, function(e) {//入力に応じて左右移動
            if(game.input.right){//右に移動
             this.x += 5;
                if(this.x+32 > 300){//画面から出ないように
                this.x = 300-32;
             }
            }else if(game.input.left){//左に移動
             this.x -= 5;
                if(this.x < 0){//画面から出ないように
                this.x = 0;
             }
         }
            if(game.input.up){//ジャンプ
             if(Junp == 0){
              this.tl.moveBy(0,-60,10);
         }
         }
     });
       this.addEventListener('enterframe',function(){
           if(game.frame % 2 == 0){
              this.frame = this.age % 3;
           }
           if(this.y < yuka){//クマが初期位置より上にいる時下に引っ張る
              Junp = 1;
              gravity_kuma = gravity_kuma +Gspeed;
              this.y += gravity_kuma;
           }else{//地上にいるときはJunpと落下速度を０にする
              gravity_kuma = 0;
              Junp = 0;
           }
    })
    }
});

const Bear_girl = Class.create(Bear_base,{//クマ　女の子
    initialize : function(){
       Bear_base.call(this);
       this.scaleX = -1;
       this.frame = 10;
       this.moveTo(330,yuka);
       this.addEventListener('enterframe',function(){
           if(this.x+32 > 280){
             this.x -= 1;
           }
    })
    }
})

const haikei = Class.create(Sprite,{
    initialize : function(){
       Sprite.call(this,180,180);
       this.image = game.assets['./assets/imags/mori.png'];
       this.x = 0;
   }
})

const ground = Class.create(Sprite,{//地面の画像`
    initialize : function(){
        Sprite.call(this,300,120);
        this.image = game.assets['./assets/imags/ground.jpg'];
        this.y = 180;
    }
})

const enemy1 = Class.create(Sprite,{//敵の管理
    initialize : function(){
        Sprite.call(this,32,24);
        var Speed = Math.floor( Math.random() * (5 + 1 - 2) ) + 2 ;//速度ランダムで決定
        this.image = game.assets['./assets/imags/chara6.png'];
        this.frame = 0;
        this.moveTo(300,yuka+8);
        this.addEventListener('enterframe',function(){
            this.x -= Speed;
            if(this.x+32 <= 0){
                this.parentNode.removeChild(this);
                }
    })
    }
})

const enemy2 = Class.create(enemy1,{//ジャンプし続ける敵
    initialize : function(){
        enemy1.call(this);
        var gravity_enemy = 0;
        this.addEventListener('enterframe',function(){
        if(this.y < yuka+8){
            gravity_enemy = gravity_enemy + enemy_Gspeed;
            this.y += gravity_enemy;
        }else{
            this.tl.moveBy(0,-100,20);
            gravity_enemy = 0;
            this.y = yuka+8;
        }
    })
    }
})

const enemy3 = Class.create(enemy1,{//自機に合わせてジャンプする敵
    initialize : function(){
        enemy1.call(this);
        var gravity_enemy = 0;
        var enemy_junp = 0;
        this.addEventListener(Event.ENTER_FRAME, function(e) {
            if(game.input.up){
                if(enemy_junp == 0){
                   this.tl.moveBy(0,-100,20);
             }
           }
         })
        this.addEventListener('enterframe',function(){
        if(this.y  < yuka+8){
            enemy_junp = 1;
            gravity_enemy = gravity_enemy +enemy_Gspeed;
            this.y += gravity_enemy;
        }else{
            enemy_junp = 0;
            gravity_enemy = 0;
            this.y = yuka+8;
        }
   })
  }
})


const bom = Class.create(Sprite,{//上から爆弾降ってくる
    initialize : function(){
        var gravity_bom = 0;//爆弾の落下速度
        var bakuhatu = 0;
        Sprite.call(this,16,16);
        this.frame = 24;
        this.image = game.assets['./assets/imags/icon0.png']
        this.moveTo(Math.random() * 300,-16);
        this.addEventListener('enterframe',function(){
            if(this.y -12 < yuka){//爆弾を落とす
                gravity_bom = gravity_bom +Gspeed;
                this.y += gravity_bom;
            }else{//地面に落ちたら爆発のエフェクトに変える
                this.image = game.assets['./assets/imags/effect0.png']
                if(game.frame % 4 == 0){
                    this.frame = bakuhatu;
                    bakuhatu += 1;
                    if(this.frame == 4){
                        this.parentNode.removeChild(this);
                        gravity_bom = 0;
                    }
                 }
            }

     })
   }
})

var gameover = function(){//ゲームオーバー画面の描写
    var end = new Sprite(190,94);
    end.image = game.assets['./assets/imags/end.png']
    scene.addChild(end);
    game.stop();
}

var gameclear = function(){//ゲームクリア画面の描写
    var end = new Sprite(189,48);
    end.image = game.assets['./assets/imags/clear.png']
    scene.addChild(end);
    game.stop();
}

window.onload = function(){
 game = new Game(300,300);
 scene = game.rootScene
scene.backgroundColor  = "#A0D8EF";
 game.preload('./assets/imags/chara1.png','./assets/imags/mori.png','./assets/imags/chara6.png','./assets/imags/icon0.png','./assets/imags/effect0.png','./assets/imags/end.png','./assets/imags/ground.jpg','./assets/imags/clear.png');

    game.onload = function(){
     var bear = new Bear();
     var Ground = new ground();
     var girl = new Bear_girl();
     scene.addChild(Ground);
	 scene.addChild(bear);
     game.addEventListener("enterframe",function(){
         if(game.frame % 20 == 0){//爆弾生成
             var Bom = new bom();
             scene.addChild(Bom);
             Bomlist.push(Bom);
         }
         if(game.frame % 600 == 0){//敵生成
             var Type = Math.floor( Math.random() * (3 + 1 - 1) ) + 1 ;//３種類の敵の中からランダムで決める
             if(Type == 1){
                var Enemy = new enemy1();
             }else if(Type == 2){
                var Enemy = new enemy2();
             }else{
                var Enemy = new enemy3();
             }
             scene.addChild(Enemy);
             enemylist.push(Enemy);
         }
         if(game.frame > 60){//600フレーム過ぎたらクマの女の子を出す
             scene.addChild(girl);
         }
         if(bear.within(girl,20)){//女の子の当たり判定
             gameclear();
         }
         for(var i = 0, len = enemylist.length;i<len;++i){//敵当たり判定
             var Enemy = enemylist[i]
             if(bear.within(Enemy,18)){
                bear.frame = 3;
                gameover();
         }
         }
         for(var i = 0, len = Bomlist.length;i<len;++i){//爆弾当たり判定
             var Bom = Bomlist[i]
             if(bear.within(Bom,18) && (Bom.frame < 3 || Bom.frame == 24)){
                bear.frame = 3;
                gameover();
         }
         }
     })
   }
game.start();
};
