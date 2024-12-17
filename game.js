// 获取页面元素
const basketball = document.getElementById("basketball");
const hoop = document.getElementById("hoop");
const scoreDisplay = document.getElementById("score");

let score = 0; // 分数

// 生成随机位置函数
function getRandomPosition(maxWidth, maxHeight, elementWidth, elementHeight) {
    const randomX = Math.floor(Math.random() * (maxWidth - elementWidth));
    const randomY = Math.floor(Math.random() * (maxHeight - elementHeight));
    return { x: randomX, y: randomY };
}

// 移动篮筐
function moveHoop() {
    const gameArea = document.getElementById("game-area");
    const position = getRandomPosition(
        gameArea.clientWidth,
        gameArea.clientHeight / 2,
        hoop.clientWidth,
        hoop.clientHeight
    );
    hoop.style.left = position.x + "px";
    hoop.style.top = position.y + "px";
}

// 投篮点击事件
basketball.addEventListener("click", () => {
    const gameArea = document.getElementById("game-area");
    const hoopRect = hoop.getBoundingClientRect();
    const ballRect = basketball.getBoundingClientRect();

    // 动画：篮球飞向篮筐
    basketball.style.left = hoop.offsetLeft + "px";
    basketball.style.top = hoop.offsetTop + "px";

    // 判断是否投中
    setTimeout(() => {
        const isScored = 
            ballRect.top < hoopRect.bottom &&
            ballRect.bottom > hoopRect.top &&
            ballRect.left < hoopRect.right &&
            ballRect.right > hoopRect.left;

        if (isScored) {
            score++;
            scoreDisplay.textContent = score;
            alert("投中啦！当前得分：" + score);
        } else {
            alert("没投中，再试一次！");
        }

        // 重置篮球位置并移动篮筐
        resetBasketball();
        moveHoop();
    }, 500);
});

// 重置篮球位置
function resetBasketball() {
    basketball.style.left = "50%";
    basketball.style.bottom = "20px";
    basketball.style.top = "";
}

// 初始化游戏
function initGame() {
    basketball.style.left = "50%";
    moveHoop();
}

initGame();
