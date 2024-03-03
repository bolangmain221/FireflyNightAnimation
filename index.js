// 创建画布
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 萤火虫数组
const fireflies = [];

// 创建萤火虫类
class Firefly {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // 绘制萤火虫
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // 更新萤火虫位置
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // 使萤火虫在画布内循环移动
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }
  }
}

// 创建萤火虫实例并添加到数组中
function init() {
  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const color = 'rgba(255, 255, 255, 0.5)';
    const velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };

    fireflies.push(new Firefly(x, y, radius, color, velocity));
  }
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireflies.forEach(firefly => {
    firefly.update();
  });
}

// 初始化并开始动画
init();
animate();
