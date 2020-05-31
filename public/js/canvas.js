function cav(t) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width)
    function Circle() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.r = Math.random() * 10;
        //绘制圆形
        // console.log(this.x, this.y, this.r)
        this.paint = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            context.fillStyle = "white";
            context.globalAlpha = 0.5;
            context.fill();
        }
        //控制圆形移动
        this.step = function () {
            this.y--;
        }
    }
    var circles = [];

    function createCircles() {
        var circle = new Circle();
        circles[circles.length] = circle;
        // console.log(circle)
    }

    function paintCircles() {
        for (var i = 0; i < circles.length; i++) {
            circles[i].paint();
        }
    }

    function stepCircles() {
        for (var i = 0; i < circles.length; i++) {
            circles[i].step();
        }
    }
    var myimg = new Image();
    myimg.src = "/public/image/index_bg.jpg";
    var timer = "";
    clearInterval(t)
    console.log(t)
    t = setInterval(function () {
        context.drawImage(myimg, 0, 0,canvas.width,canvas.height);
        timer++;
        if (timer % 30 == 0) {
            createCircles();
        }
        paintCircles();
        stepCircles();
    }, 10);
}

function drawImage(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    let w=canvas.getBoundingClientRect().width
    if(w<320){
        w=320
    }
    let h=canvas.getBoundingClientRect().height
    var myimg = new Image();
    myimg.src = "../image/index_bg.jpg";
    context.drawImage(myimg, 0, 0,w,h);
}
cav('')