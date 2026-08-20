(function(){
  // ---- Box dimensions (px) ----
  var W = 240, H = 500, D = 20, R = 38, LAYERS = 22;

  var box = document.getElementById('phoneBox');
  box.style.width = W + 'px';
  box.style.height = H + 'px';
  box.style.transformStyle = 'preserve-3d';

  var rotation = { x: -8, y: 18 };
  function applyRotation(){
    box.style.transform = 'rotateX(' + rotation.x + 'deg) rotateY(' + rotation.y + 'deg)';
  }

  // ---- Rim slices (rounded thickness, no seams) ----
  for (var i = 1; i < LAYERS - 1; i++){
    var t = i / (LAYERS - 1);
    var z = -D/2 + D*t;
    var edgeLight = Math.sin(t * Math.PI);
    var shade = 58 - edgeLight * 26;
    var slice = document.createElement('div');
    slice.style.position = 'absolute';
    slice.style.inset = '0';
    slice.style.borderRadius = R + 'px';
    slice.style.transform = 'translateZ(' + z + 'px)';
    slice.style.background = 'hsl(220 6% ' + shade + '%)';
    box.appendChild(slice);
  }

  // ---- Back face with triple camera ----
  var back = document.createElement('div');
  back.className = 'phone-face';
  back.style.borderRadius = R + 'px';
  back.style.transform = 'rotateY(180deg) translateZ(' + (D/2) + 'px)';
  back.style.background = 'linear-gradient(200deg, #3f424b, #101116 65%)';
  back.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.06)';

  var camModule = document.createElement('div');
  camModule.style.position = 'absolute';
  camModule.style.top = '22px';
  camModule.style.left = '18px';
  camModule.style.width = '78px';
  camModule.style.height = '78px';
  camModule.style.borderRadius = '20px';
  camModule.style.background = 'linear-gradient(160deg, #313339, #16171b 70%)';
  camModule.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.08)';
  var lensPositions = [{top:8,left:8},{top:8,left:42},{top:42,left:8}];
  lensPositions.forEach(function(pos){
    var lens = document.createElement('div');
    lens.style.position = 'absolute';
    lens.style.top = pos.top + 'px';
    lens.style.left = pos.left + 'px';
    lens.style.width = '28px';
    lens.style.height = '28px';
    lens.style.borderRadius = '50%';
    lens.style.background = 'radial-gradient(circle at 35% 30%, #5b5f6a, #0c0d10 75%)';
    lens.style.boxShadow = 'inset 0 0 0 2px rgba(0,0,0,0.6)';
    camModule.appendChild(lens);
  });
  var flash = document.createElement('div');
  flash.style.position = 'absolute';
  flash.style.top = '46px';
  flash.style.left = '46px';
  flash.style.width = '18px';
  flash.style.height = '18px';
  flash.style.borderRadius = '50%';
  flash.style.background = 'radial-gradient(circle, #e8e4d8, #8a8578 70%)';
  flash.style.boxShadow = 'inset 0 0 0 2px rgba(0,0,0,0.4)';
  camModule.appendChild(flash);
  back.appendChild(camModule);
  box.appendChild(back);

  // ---- Front face with animated mock screens ----
  var front = document.createElement('div');
  front.className = 'phone-face';
  front.style.borderRadius = R + 'px';
  front.style.transform = 'translateZ(' + (D/2) + 'px)';
  front.style.background = 'linear-gradient(155deg, #3f424b, #1c1e24 60%)';
  front.style.padding = '9px';
  front.style.boxSizing = 'border-box';
  front.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.7)';

  // ---- Screen content ----
  var videoSource = box.dataset.videoSrc || '';

  var screen = document.createElement('div');
  screen.className = 'screen-video';

  if (videoSource) {
    var video = document.createElement('video');
    video.id = 'phoneScreenContent';
    video.src = videoSource;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    screen.appendChild(video);
  } else {
    var placeholder = document.createElement('div');
    placeholder.id = 'phoneScreenContent';
    placeholder.className = 'empty-screen-hint';
    placeholder.textContent = 'adicione data-video-src ao telefone';
    screen.appendChild(placeholder);
  }

  var island = document.createElement('div');
  island.style.position = 'absolute';
  island.style.top = '12px';
  island.style.left = '50%';
  island.style.transform = 'translateX(-50%)';
  island.style.width = '76px';
  island.style.height = '22px';
  island.style.borderRadius = '14px';
  island.style.background = '#000';
  island.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.06)';
  island.style.zIndex = '5';
  screen.appendChild(island);

  front.appendChild(screen);
  box.appendChild(front);

  // ---- Side buttons ----
  function sideButton(top, height, side){
    var btn = document.createElement('div');
    var d = D + 5;
    btn.style.position = 'absolute';
    btn.style.top = top + 'px';
    btn.style.left = ((W - d) / 2) + 'px';
    btn.style.width = d + 'px';
    btn.style.height = height + 'px';
    btn.style.borderRadius = '3px';
    btn.style.background = 'linear-gradient(90deg, #4a4d56, #6b6f78 45%, #34363c)';
    btn.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.35)';
    btn.style.transform = 'rotateY(' + (side === 'right' ? 90 : -90) + 'deg) translateZ(' + (W/2) + 'px)';
    box.appendChild(btn);
  }
  sideButton(138, 58, 'right');   // power
  sideButton(108, 30, 'left');    // mute
  sideButton(154, 52, 'left');    // volume up
  sideButton(218, 52, 'left');    // volume down

  applyRotation();

  // ---- Drag to rotate (no auto-spin) ----
  var dragging = false, lastX = 0, lastY = 0;
  var stage = document.querySelector('.phone-stage');

  function down(x, y){ dragging = true; lastX = x; lastY = y; }
  function move(x, y){
    if (!dragging) return;
    var dx = x - lastX, dy = y - lastY;
    lastX = x; lastY = y;
    rotation.y += dx * 0.4;
    rotation.x = Math.max(-35, Math.min(35, rotation.x - dy * 0.4));
    applyRotation();
  }
  function up(){ dragging = false; }

  stage.addEventListener('mousedown', function(e){ down(e.clientX, e.clientY); });
  window.addEventListener('mousemove', function(e){ move(e.clientX, e.clientY); });
  window.addEventListener('mouseup', up);
  stage.addEventListener('touchstart', function(e){ var t = e.touches[0]; down(t.clientX, t.clientY); }, {passive:true});
  window.addEventListener('touchmove', function(e){ var t = e.touches[0]; move(t.clientX, t.clientY); }, {passive:true});
  window.addEventListener('touchend', up);
})();
