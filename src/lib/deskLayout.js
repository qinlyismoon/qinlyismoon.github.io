/** Desk geometry — right edge is the anchor; tabletop overhangs its supports. */
export const DESK_SURFACE_Y = 382;
export const DESK_BOTTOM = 548;

export const DESK_RIGHT = 844;
export const DESK_LEFT = 214;
export const DESK_CENTER = (DESK_LEFT + DESK_RIGHT) / 2;
export const DESK_THICK = 17;
export const DESK_FRONT_EDGE = 5;
export const DESK_OVERHANG_SIDE = 14;

export const CABINET_LEFT = DESK_LEFT + DESK_OVERHANG_SIDE;
export const CABINET_WIDTH = 132;
export const CABINET_RIGHT = CABINET_LEFT + CABINET_WIDTH;

export const LEG_RIGHT = DESK_RIGHT - DESK_OVERHANG_SIDE;
export const LEG_WIDTH = 78;
export const LEG_LEFT = LEG_RIGHT - LEG_WIDTH;

export const SHELF_LEFT_Y = 88;
export const SHELF_RIGHT_Y = 118;
export const SHELF_LEFT_X = 72;
export const SHELF_LEFT_W = 210;

export const LAMP_HEIGHT = 140;
export const LAMP_ORIGIN_X = DESK_LEFT + 10;
export const LAMP_BULB = { x: 97, y: 53 };
export const LAMP_LIGHT = { cx: 328, cy: 358 };

export const MUG_HEIGHT = 78;
export const CALENDAR_HEIGHT = 74;

export const MONITOR_TOTAL_H = 202;
export const MONITOR_TOTAL_W = 296;
export const BOOKS_MAX_H = 78;

export const PLANT_BASE_X = 102;
