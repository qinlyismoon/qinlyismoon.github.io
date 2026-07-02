/** Desk geometry — right edge is the anchor; tabletop overhangs its supports. */
export const DESK_SURFACE_Y = 382;
export const DESK_BOTTOM = 548;

export const DESK_RIGHT = 872;
export const DESK_LEFT = 154;
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

export const SHELF_LEFT_Y = 120;
export const SHELF_RIGHT_Y = 118;
export const SHELF_LEFT_X = 218;
export const SHELF_LEFT_GAP = 12;

export const PLANT_WIDTH = 86;
export const PLANT_HEIGHT = 172;
export const PLANT_SHELF_CONTACT_Y = 46;
export const PLANT_SHELF_X = SHELF_LEFT_X + 6;

export const CLOCK_WIDTH = 76;
export const CLOCK_SHELF_GAP = 28;
export const CLOCK_SHELF_X = PLANT_SHELF_X + PLANT_WIDTH + CLOCK_SHELF_GAP;

/** Moderate shelf — ends shortly after the clock, not overly long. */
export const SHELF_LEFT_W = CLOCK_SHELF_X + CLOCK_WIDTH - SHELF_LEFT_X + SHELF_LEFT_GAP;

export const LAMP_HEIGHT = 140;
export const LAMP_ORIGIN_X = DESK_LEFT + 10;
export const LAMP_BULB = { x: 97, y: 53 };
export const LAMP_LIGHT = { cx: 328, cy: 358 };

export const MUG_HEIGHT = 78;

/** Wire grid — portrait wall-mounted metal organizer. */
export const WIRE_GRID_W = 196;
export const WIRE_GRID_X = 666;
export const WIRE_GRID_TOP = 44;
export const WIRE_GRID_BOTTOM = 234;

const SPEAKER_W = 56;
const SPEAKER_H = 84;
const CAMERA_W = 68;
/** Chassis bottom Y inside CameraShape — keep in sync with illustration. */
export const CAMERA_REST_BOTTOM = 52;

/** Diagonal composition — sticky note upper-left; speaker upper-right; camera lower-left. */
export const STICKY_NOTE_X = WIRE_GRID_X + 26;
export const STICKY_NOTE_Y = WIRE_GRID_TOP + 34;

export const GRID_SHELF_H = 8;

export const SPEAKER_PANEL_W = 84;
export const SPEAKER_PANEL_X = WIRE_GRID_X + 100;
export const SPEAKER_PANEL_Y = WIRE_GRID_TOP + 112;

export const SPEAKER_HANG_X = SPEAKER_PANEL_X + (SPEAKER_PANEL_W - SPEAKER_W) / 2;
export const SPEAKER_HANG_Y = SPEAKER_PANEL_Y - SPEAKER_H;

export const CAMERA_PANEL_W = 92;
export const CAMERA_PANEL_X = WIRE_GRID_X + 14;
export const CAMERA_PANEL_Y = WIRE_GRID_TOP + 168;

export const CAMERA_HANG_X = CAMERA_PANEL_X + (CAMERA_PANEL_W - CAMERA_W) / 2;
export const CAMERA_HANG_Y = CAMERA_PANEL_Y - CAMERA_REST_BOTTOM;

export const MONITOR_TOTAL_H = 202;
export const MONITOR_TOTAL_W = 296;
export const MONITOR_LEFT_OFFSET = 52;
export const MONITOR_LEFT_X = DESK_CENTER - MONITOR_LEFT_OFFSET - MONITOR_TOTAL_W / 2;

export const BOOKS_MAX_H = 78;
export const BOOKS_ROW_WIDTH = 83;
export const BOOKS_DESK_GAP = 36;

/** Desk placement — right of the monitor, before the drink. */
export const BOOKS_DESK_X = MONITOR_LEFT_X + MONITOR_TOTAL_W + BOOKS_DESK_GAP;

export const MUG_WIDTH = 68;
export const MUG_DESK_GAP = 32;
export const MUG_DESK_X = BOOKS_DESK_X + BOOKS_ROW_WIDTH + MUG_DESK_GAP;
