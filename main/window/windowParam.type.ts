import { BrowserWindowConstructorOptions, WebPreferences } from "electron";

// export type WindowParam = Pick<
//   BrowserWindowConstructorOptions,
//   "width" | "height" | "alwaysOnTop" | "resizable" | "minWidth" | "minHeight" | "x" | "y"
// > & {
//   url: string;
//   loadType: LoadType;
// };
export interface WindowParam extends BrowserWindowConstructorOptions {
  url: string;
  loadType: LoadType;
}

export type LoadType = "file" | "url";

export class WindowOptions implements BrowserWindowConstructorOptions {
  show = false;
}

export class WebPreferencesOptions implements WebPreferences {}
