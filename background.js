/*
BSD 3-Clause License

Copyright (c) 2025, Shane Brewer
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function() {
    const testCanvas = document.createElement('canvas');
    if (!(testCanvas.getContext && testCanvas.getContext('2d'))) {
        console.log("Canvas not supported. Disabling interactive background.");
        return;
    }

    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = {
        x: null,
        y: null,
        radius: 100
    };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const dots = [];
    const numDots = 100;
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: 2,
            dx: (Math.random() - 0.5) * 1,
            dy: (Math.random() - 0.5) * 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        dots.forEach(dot => {
            dot.x += dot.dx;
            dot.y += dot.dy;
            if (dot.x < 0 || dot.x > width) dot.dx = -dot.dx;
            if (dot.y < 0 || dot.y > height) dot.dy = -dot.dy;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();

            if (mouse.x && mouse.y) {
                const dist = Math.hypot(mouse.x - dot.x, mouse.y - dot.y);
                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(dot.x, dot.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(255,255,255,' + (1 - dist / mouse.radius) + ')';
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
})();
