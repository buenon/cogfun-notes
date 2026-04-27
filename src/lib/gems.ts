import gem30 from "@assets/icon_gems_pack_0030.png";
import gem80 from "@assets/icon_gems_pack_0080.png";
import gem170 from "@assets/icon_gems_pack_0170.png";
import gem360 from "@assets/icon_gems_pack_0360.png";
import gem950 from "@assets/icon_gems_pack_0950.png";
import gem2000 from "@assets/icon_gems_pack_2000.png";

/**
 * Returns the appropriate gem image based on the success count.
 * Logic based on filename thresholds:
 * 1-3 successes: gem30
 * 4-8 successes: gem80
 * 9-17 successes: gem170
 * 18-36 successes: gem360
 * 37-95 successes: gem950
 * 96+ successes: gem2000
 */
export const getGemImage = (count: number): string | null => {
  if (count <= 0) return null;
  if (count <= 3) return gem30;
  if (count <= 7) return gem80;
  if (count <= 10) return gem170;
  if (count <= 20) return gem360;
  if (count <= 30) return gem950;
  return gem2000;
};
