import { Color } from "three";
import * as THREE from "three";
THREE.ColorManagement.enabled = false;

export const paletteList = ["black"];

export const palette = {
  index: 0,
  accentPalette: "black",
  id: "black",
  BG: new Color("#100f10"),
  BGLight: new Color("#2a282a"),
  text: new Color("#b9bec2"),
  highlightHover: new Color("#cccccc"),
  inactive: new Color("#6d6d6d"),
  highlight: new Color("#ffffff"),
};

export const sinPalette = {
  c0: new Color(0x404040),
  c1: new Color(0xcef316),
  c2: new Color(0x815903),
  c3: new Color(0xae00ff),
};
