/*粒子动画*/
function fire(cobj){
    // this.canvas=canvas;
    this.cobj=cobj;
    this.x=person.x+person.width/2;
    this.y=person.y+person.height/2;

    // this.x=200;
    // this.y=200;
    // this.r=1+2*Math.random();
    // this.speedy=6*Math.random()-3;
    // this.speedx=6*Math.random()-3;
    this.zhongli=0.3;
    this.speedr=0.1;

    this.x1=20*Math.random()-10;
    this.y1=20*Math.random()-10;
    this.x2=20*Math.random()-10;
    this.y2=20*Math.random()-10;
    this.speedy=-2-Math.random()-2;
    this.speedx=16*Math.random()-8;
    this.life=4;
    this.r=1+2*Math.random();
    this.color="red";



}
fire.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.translate(this.x,this.y);
        // cobj.translate(this.x,this.y);
        cobj.scale(this.r,this.r);
        cobj.moveTo(0,0);
        cobj.lineTo(this.x1,this.y1);
        cobj.lineTo(this.x2,this.y2);

        // this.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();


    },
    update:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.speedy+=this.zhongli;
        this.life-=0.2;
        this.r-=this.speedr;
    }
};

function stone(canvas,cobj,person){
    // var color=color||"#fff";
    var stoneArr=[];
    for(var i=0;i<30;i++){
        var obj=new fire(canvas,cobj,person);
        // obj.x=x;
        // obj.y=y;
        // obj.color=color;
        stoneArr.push(obj);
    }
    // console.log(stoneArr.length);
    var t=setInterval(function () {
        for(var i=0;i<stoneArr.length;i++){
            stoneArr[i].draw();
            stoneArr[i].update();
            if(stoneArr[i].r<0){
                stoneArr.splice(i,1);
            }
        }
        if(stoneArr.length==0){
            clearInterval(t);
        }
    },50);
}


function person(canvas,cobj,runImg,jumpImg){

    this.canvas=canvas;
    this.cobj=cobj;
    this.runImg=runImg;
    this.jumpImg=jumpImg;
    this.x=0;
    this.y=325;
    this.width=70;
    this.height=70;
    this.status="runImg";
    this.state=0;
    this.num=0;
    this.speedx=6;
    this.life=3;

}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,70,70,0,0,this.width,this.height);
        this.cobj.restore();

    },
    update:function(){
        // if(this.y>this.endy){
        //     this.y=this.endy;
        // }else if(this.y<this.endy){
        //     this.speedy+=this.zhongli;
        //     this.y+=this.speedy;
        //
        // }
        this.x+=this.speedx;
    }
};


/*子弹*/
function zidan(canvas,cobj){
    this.x=0;
    this.y=0;
    this.width=50;
    this.height=10;
    this.color="red";
    this.speedx=5;
    this.jia=1;
    this.cobj=cobj;
    this.canvas=canvas;
    // this.zhi=zhi;
}
zidan.prototype={
    draw:function () {
        // var cobj=this.cobj;
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        // this.cobj.drawImage(this.zhi[this.state],0,0,400,400,0,0,this.width,this.height)
        this.cobj.fillRect(0,0,this.width,this.height);
        this.cobj.restore();

    }
}

/*创建障碍物*/
function hinder(canvas,cobj,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.state=0;
    this.x=this.canvas.width-20;
    this.y=325;
    this.width=70;
    this.height=70;
    this.speedx=6;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state],0,0,70,70,0,0,this.width,this.height);
        this.cobj.restore();
    }
};



// 游戏的主类
function game(canvas,cobj,runImg,jumpImg,hinderImg,life,jifen,runA,hitA,jumpA){
    this.canvas=canvas;
    this.width=canvas.width;
    this.height=canvas.height;
    this.cobj=cobj;
    this.life=life;
    this.jifen=jifen;
    // this.zidana=zidana;
    this.runA=runA;
    this.hitA=hitA;
    this.jumpA=jumpA;
    this.hinderImg=hinderImg;
    this.hinderArr=[];
    this.runImg=runImg;
    this.jumpImg=jumpImg;
    this.person=new person(canvas,cobj,runImg,jumpImg);
    this.backx=0;
    this.backSpeed=6;
    this.isfire=false;
    this.zidan=new zidan(canvas,cobj);
    this.score=0;
    this.flag=true;
    this.num=0;
    this.isRun=false;
    this.rand=(4+Math.ceil(6*Math.random()))*1000;

    this.current=0;
    this.step=1;
    this.stepteep=2;

    this.ts={};
    this.num=0;
    this.num1=0;
    this.top=0;
    this.num2=0;

    this.flag=true;
    this.init=0;
    this.speeda=5;
    this.r=100;
    this.y1=this.person.y;
}
game.prototype={
    play1:function(start,mask){
        //大幕拉起
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        this.run();
        this.key();
        this.mouse();
        //音乐开始
        // jifen.onclick



    },
    run:function(){
        this.name=prompt("请输入姓名","ppb");
        var that=this;
        // that.runA.play();

        // var num=0;
        // var rand=(2+Math.ceil(6*Math.random()))*1000;

        that.ts.t1=setInterval(function(){
           that.move();


        },50)

    },
    move:function(){
        var that=this;
        that.runA.play();
        // that.num++;
        // that.num1+=6;
        // that.num2+=50;
        that.num+=50;
        that.cobj.clearRect(0,0,that.width,that.height);

        /*用力计算显示的图片*/
        that.person.num++;
        if(that.person.status=="runImg"){
            that.person.state=that.person.num%4;
        }else{
            that.person.state=0;
            that.runA.pause();
            that.jumpA.play();
        }

        /*让人物的X发生变化*/
        that.person.x+=that.person.speedx;
        if(that.person.x>=that.width/3){
            that.person.x=that.width/3;
        }
        that.person.draw();


        /*障碍物*/
        if(that.num%that.rand==0){
            rand=(2+Math.ceil(6*Math.random()))*1000;
            that.num2=0;
            var obj=new hinder(that.canvas,that.cobj,that.hinderImg);
            obj.state=Math.floor(Math.random()*that.hinderArr.length);
            that.hinderArr.push(obj);
        }

        for(var i=0;i<that.hinderArr.length;i++){
            that.hinderArr[i].x-=that.hinderArr[i].speedx;
            that.hinderArr[i].draw();

            if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                if(!that.hinderArr[i].flag){
                    that.hitA.play();
                    stone(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                    that.person.life--;
                    console.log(that.person.life);
                    if(that.person.life<0){
                        // alert("game over");
                        // location.reload();

                        // that.life.style.width=100+"%";
                        that.life.style.width=140+"px";

                        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                        var temp={name:that.name,score:that.score};
                        messages.sort(function(a,b){
                            return a.score<b.score;
                        })
                        if(messages.length>0){
                            if(temp.score>messages[messages.length-1].score){
                                if(messages.lenght==5){
                                    messages[messages.length-1]=temp;

                                }else if(messages.length<5){
                                    messages.push(temp);
                                }
                            }
                        }else{
                            messages.push(temp);
                        }
                        localStorage.messages=JSON.stringify(messages);
                        that.over();
                    }
                    that.hinderArr[i].flag=true;
                }
            }
            if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                    that.score++;
                    // document.title=that.score;
                    var jifen=document.querySelector(".jifen");
                    that.jifen.innerHTML=that.score;
                    that.hinderArr[i].flag1=true;
                }
            }
            // if(that.isfire){
            //子弹碰到障碍物
            if(hitPix(that.canvas,that.cobj,that.zidan,that.hinderArr[i])){
                // alert(1);
                if(!that.hinderArr[i].flag){
                    that.hinderArr.splice(i,1);
                    that.score++;

                    // 加速
                    that.current++;
                    if(that.current%that.step==0){
                        that.backSpeed+=1;
                        that.current=0;
                        that.step+=that.stepteep;

                    }
                    that.jifen.innerHTML=that.score;
                }
            }
            // }

        }

        /*操作子弹*/
        if(that.isfire){
            if(that.zidan.x>that.width){
                that.isfire=false;
            }
            that.zidan.speedx+=that.zidan.jia;
            that.zidan.x+=that.zidan.speedx;
            that.zidan.draw();
        }

        /*操作背景*/
        that.backx-=that.backSpeed;

        that.canvas.style.backgroundPositionX=that.backx+"px";
    },
    key:function(){
        var that=this;
        // var flag=true;
        document.onkeydown=function(e){
            if(e.keyCode==32){
                if(!that.isrun){
                    for(var i in that.ts){
                        clearInterval(that.ts[i]);
                        that.runA.pause();
                    }
                    that.isrun=true;
                }else if(that.isrun){
                    that.ts.t1=setInterval(function(){
                        that.move();
                    },50);
                    if(!that.flag){
                        clearInterval(that.ts.t2);
                        that.ts.t2=setInterval(function(){
                            that.move2();
                        },50);
                    }
                    that.isrun=false;
                }
            }else if(e.keyCode==38){
                if(!that.flag){
                    return;
                }
                that.flag=false;
                that.jumpA.play();
                that.runA.pause();
                // alert(2)
                that.person.status="jumpImg";
                // 角度
                // var inita=0;
                // var speeda=5;
                // var r=100;
                // var y=that.person.y;

                that.ts.t2=setInterval(function(){
                    that.move2();
                },50);

            }



        }
    },
    move2:function () {
        var that=this;
        that.init+=that.speeda;
        var top=Math.sin(that.init*Math.PI/180)*that.r;
        if(that.init>180){
            clearInterval(that.ts.t2);
            that.runA.play();
            that.person.status="runImg";
            that.person.y=that.y1;
            that.flag=true;
            that.init=0;
        }else{
            that.person.y=that.y1-top;
        }


    },
    // var t=setInterval(function(){
    //     inita+=speeda;
    //     if(inita>=180){
    //         // stone(that.cobj,that.person.x+that.person.width/2,that/person.y+that.person.height);
    //         that.person.y=y;
    //         clearInterval(t);
    //         that.person.status="runImg";
    //         flag=true;
    //         that.runA.play();
    //     }else{
    //         var top=Math.sin(inita*Math.PI/180)*r;
    //         that.person.y=that.y1-top;
    //     }
    //
    // },50)
    mouse:function(){
        var that=this;
        document.querySelector(".mask").onclick=function(){
            // if(that.isfire){
            //     return false;
            // }
            // that.zidana.play();
            that.zidan.x=that.person.x+that.person.width/2;
            that.zidan.y=that.person.y+that.person.height/2;
            that.zidan.speedx=5;
            that.isfire=true;
        }
    },
    over:function(){
        // var that=this;
        // for(var i in that.ts){
        //     claerInterval(that.ts[i]);
        // }

        var over=document.querySelector(".over");
        over.style.animation="start 2s ease forwards";
        this.runA.pause();

        // 记录分数
        var scoreEle=document.querySelector(".scoreEle");
        scoreEle.innerHTML=this.score;
        var lis=document.querySelector(".over ul");
        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
        var str="";
        for(var i=0;i<messages.length;i++){
            str+="<li>"+messages[i].name+":"+messages[i].score;

        }
        lis.innerHTML=str;
        this.again();
    },
    again:function(){
        var that=this;
        var btn1=document.querySelector(".again");
        btn1.onclick=function(){
            alert(2)
            var over=document.querySelector(".over");
            over.style.animation="start1 2s ease forwards";
            that.person.x=0;
            that.person.y=320;
            that.score=0;
            that.x=325;
            that.person.life=3;
            that.hinderArr=[];
            that.init=0;
            that.y1=that.person.y;
            that.jifen.innerHTML=that.score;
            // that.life.style.width=0;
            that.run();
            btn1.onclick=null;
        }
    }
}



