function calcular() {
  let forca = Number(document.getElementById("for").value);
  let vigor = Number(document.getElementById("vig").value);
  let intel = Number(document.getElementById("int").value);
  let aura = Number(document.getElementById("aur").value);

  let hp = vigor * 10 + 20;
  let ki = forca * 10 + 60;
  let cos = (intel + aura) * 10;

  document.getElementById("hp").innerText = hp;
  document.getElementById("ki").innerText = ki;
  document.getElementById("cos").innerText = cos;
}

