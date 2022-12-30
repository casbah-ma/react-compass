export default function getCardinal(angle, isInstruction = false) {
  if (typeof angle === "string") angle = parseInt(angle);
  if (angle < 0 || angle > 360 || typeof angle === "undefined") return null;

  switch (Math.round(angle / 22.5)) {
    case 1:
      return isInstruction ? "keep_ahead" : "NNE";
    case 2:
      return isInstruction ? "keep_ahead" : "NE";
    case 3:
      return isInstruction ? "right" : "ENE";
    case 4:
      return isInstruction ? "right" : "E";
    case 5:
      return isInstruction ? "right" : "ESE";
    case 6:
      return isInstruction ? "u_turn" : "SE";
    case 7:
      return isInstruction ? "u_turn" : "SSE";
    case 8:
      return isInstruction ? "u_turn" : "S";
    case 9:
      return isInstruction ? "u_turn" : "SSW";
    case 10:
      return isInstruction ? "u_turn" : "SW";
    case 11:
      return isInstruction ? "left" : "WSW";
    case 12:
      return isInstruction ? "left" : "W";
    case 13:
      return isInstruction ? "left" : "WNW";
    case 14:
      return isInstruction ? "left" : "NW";
    case 15:
      return isInstruction ? "keep_ahead" : "NNW";
    default:
      return isInstruction ? "keep_ahead" : "N";
  }
}
