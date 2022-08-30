import { theme } from "src/styles";

export const drawCircle = (id: string, width: number) => {
  const el = document.getElementById(id); // get canvas
  el.innerHTML = "";
  const options = {
    percent: parseInt(el.getAttribute("data-percent")) || 0,
    size: el.clientWidth || 220,
    lineWidth:
      parseInt(el.getAttribute("data-line")) || (el.clientWidth / 100) * 10.5,
    rotate: parseInt(el.getAttribute("data-rotate")) || 0,
  };
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const paddingInsideCanvas = 22;

  canvas.width = canvas.height =
    parseInt(options.size.toString()) + paddingInsideCanvas;

  el.appendChild(canvas);

  ctx.translate(options.size / 2, options.size / 2); // change center
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;
  const draw = function (color: string | CanvasGradient | CanvasPattern, lineWidth: number, percent: number) {
    ctx.beginPath();

    ctx.lineCap = "round"; // butt, round or square

    ctx.arc(
      0 - paddingInsideCanvas / 2,
      paddingInsideCanvas / 2,
      radius,
      0,
      Math.PI * 2 * percent,
      false
    );
    ctx.lineWidth = lineWidth;

    ctx.strokeStyle = color;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.shadowColor = theme.colors.red[100];
    ctx.stroke();
  };

  draw(theme.colors.red[100], options.lineWidth, options.percent / (10000 * 100));
};
