window.onload=function(){
    var canvas =document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    canvas.width=cw;
    canvas.height=ch;
    var runImg=document.querySelectorAll(".run");
    var jumpImg=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".hinder");


    var runA=document.getElementsByTagName("audio")[0];
    var hitA=document.getElementsByTagName("audio")[1];
    var jumpA=document.getElementsByTagName("audio")[2];
    // var zhi=document.querySelectorAll(".zhi");
    // var zidana=document.querySelector("zidana");

    var jifen=document.getElementsByClassName("jifen")[0];
    var life=document.getElementsByClassName("life")[0];
    // var guanka=document.getElementsByClassName("guanka")[0];

    var gameObj=new game(canvas,cobj,runImg,jumpImg,hinderImg,life,jifen,runA,hitA,jumpA);



    //现象卡
    // var start=document.querySelector(".start");
    // var mask=document.querySelector(".mask");
    // var startBtn=document.querySelector(".btn");
    // startBtn.onclick=function(){
    //     gameObj.play(start,mask);
    //
    // }
    var start=$(".start");
    var mask=$(".mask");
    var startBtn=$(".btn");
    startBtn.one("click",function(){
        gameObj.play1(start,mask);
    })

}