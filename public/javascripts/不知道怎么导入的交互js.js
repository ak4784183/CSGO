
var list=document.getElementById('list');
var showImg=list.getElementsByTagName('img');

for (const index = 0; index < showImg.length; index++) {

    showImg[index].onclick=function(){
        alert("1");
    }

    showImg[index].onclick=function(){
        var newDiv=document.createElement('div');
        newDiv.setAttribute({"height":"300px","witdh":"200px"});
        var img=document.createElement('img');
        img.src=this.pic.src;
        newDiv.appendChild(img);
        document.body.appendChild(newDiv);
    }
    
}