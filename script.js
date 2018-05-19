var initialSpeed = 0.1;
var initialScore = 0;
var targetCount = 3;
var targetCountColors = ['piggyIcon1.png','piggyIcon2.png','piggyIcon3.png'];
var targetNodes = 0;
localStorage.maxScore = 0;

$(document).ready(function(){
    $('#scoreCount').text(0);
    $('#maxScoreCount').text(0);
    
    init();
    
    $('.box').click(function(e) {
        console.log("target: ", e.target);
        initialScore = initialScore + 1;
        initialSpeed = initialSpeed + 0.05;
        $('#scoreCount').text(initialScore);
        $(e.target).stop();
        resetBoxPosition(e.target);
        moveTarget(e.target);
        e.stopPropagation();
    });
    
    $('body').click(function() {
        alert('Game over');
        if(initialScore > localStorage.maxScore) {
            localStorage.maxScore = initialScore;
            $('#maxScoreCount').text(initialScore);
        }
        initialScore = 0;
        initialSpeed = 0.1;
        $('#scoreCount').text(initialScore);
        for (i = 0; i < targetNodes.length; i++) {
            $(targetNodes[i]).stop();
            resetBoxPosition(targetNodes[i]);
            moveTarget(targetNodes[i]);
        }
    });
});

function init() {
    var i;
    for(i = 0; i < targetCount; i++) {
        $('body').prepend('<div class="box" style="background-image: url(images/' + targetCountColors[i] + '"></div>')
    }
    
    targetNodes = document.querySelectorAll('.box');
    
    for(i = 0; i < targetNodes.length; i++) {
        resetBoxPosition(targetNodes[i]);
        moveTarget(targetNodes[i]);
    }
}

function resetBoxPosition(node) {
    var pos = getTargetPosition(node);
    $(node).css({top: pos[0], left: pos[1]});
}

function getTargetPosition(node){
    // Get viewport dimensions (remove the dimension of the div)
    var xMax = $(window).width() - 100;
    var yMax = $(window).height() - 100;
    
    var yPos = Math.floor(Math.random() * yMax);
    var xPos = Math.floor(Math.random() * xMax);
    
    return [yPos, xPos];  
}

function moveTarget(node){
    var nextPos = getTargetPosition(node);
    var prevPos = $(node).offset();
    var speed = getSpeed([prevPos.top, prevPos.left], nextPos);
    
    $(node).animate({ top: nextPos[0], left: nextPos[1] }, speed, function(){
      moveTarget(node);        
    });
};

function getSpeed(prev, next) {
    var xPos = Math.abs(prev[1] - next[1]);
    var yPos = Math.abs(prev[0] - next[0]);
    
    var greatest = xPos > yPos ? xPos : yPos;

    var speed = Math.ceil(greatest/initialSpeed);

    return speed;
}