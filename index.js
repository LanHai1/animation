let box = document.querySelector(".box");
let box1 = document.querySelector(".box1");

/**
 * 根据id获取元素
 * @param {string} id 
 */
let $ = id => document.getElementById(id);

$("btn1").onclick = function() {
    animation_s(box, {
        width: 300,
        height: 600
    }, () => {
        animation_s(box, {
            left: 100,
            opacity: 0.3
        }, () => {
            animation_s(box1, {
                left: 500,
                height: 10
            })
        })
    })
}
$("btn2").onclick = () => {
    animation_s(box1, {
        left: 500,
        height: 10
    })
}

/**
 * 缓动动画
 * @param {element} el 
 * @param {attributeJson{key:value}} attrs 
 * @param {fn} callback 
 */
function animation_s(el, attrs, callback) {
    // 每次调用前先清除已有的定时器
    clearInterval(el.timeId);
    el.timeId = setInterval(() => {
        // 全部到达目标点
        let flag = true;
        for (const key in attrs) {
            if (key == "opacity") { // 透明度处理
                // 元素当前状态
                let current = +(window.getComputedStyle(el)[key]) * 100;
                // 元素目标状态
                let target = attrs[key] * 100;
                // 每次执行步数
                // 目标大于当前 向上取整 => 目标小于当前 向下取整
                let temp = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);
                current += temp;
                current = current / 100;
                // 设置元素样式
                el.style[key] = `${current}`;
                // 判断是否全部到达目标点
                if (target / 100 != current) {
                    flag = false;
                }
            } else {
                // 元素当前状态
                let current = parseInt(window.getComputedStyle(el)[key]);
                // 元素目标状态
                let target = attrs[key];
                // 每次执行步数
                // 目标大于当前 向上取整 => 目标小于当前 向下取整
                let temp = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);
                current += temp;
                // 设置元素样式
                el.style[key] = `${current}px`;
                // 判断是否全部到达目标点
                if (target != current) {
                    flag = false;
                }
            }
        }
        if (flag) {
            clearInterval(el.timeId);
            // 回调函数
            if (callback instanceof Function) {
                callback();
            }
        }
    }, 20)
}