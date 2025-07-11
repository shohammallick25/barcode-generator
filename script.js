let input = document.getElementById("input");
let btn = document.getElementById("btn-barcode-generator");
btn.addEventListener("click", () => {
  JsBarcode("#barcode", input.value, {
    format: "code128",
    displayValue: true,
    fontSize: 24,
    lineColor: "#000",
  });
});
window.onload = (event) => {
  input.value = "";
};

document.getElementById("download-barcode").addEventListener("click", () => {
  const svg = document.getElementById("barcode");
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);

  const img = new Image();
  const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width || 400;
    canvas.height = img.height || 150;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff"; // optional background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Trigger PNG download
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "barcode.png";
    link.href = pngUrl;
    link.click();

    URL.revokeObjectURL(url);
  };

  img.src = url;
});

