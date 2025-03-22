export const windowConfig = {
  minWidth: 200,
  minHeight: 150
};

//  通用窗体配置
const commonOptions: Electron.BrowserWindowConstructorOptions = {
  frame: false,
  width: 750,
  height: 600,
  autoHideMenuBar: true,
  webPreferences: {
    webSecurity: false,
    nodeIntegration: true
  }
};

// 开启node窗体配置
const workerOptions: Electron.BrowserWindowConstructorOptions = {
  frame: false,
  width: 750,
  height: 600,
  autoHideMenuBar: true,
  webPreferences: {
    sandbox: false,
    webSecurity: false,
    nodeIntegrationInWorker: true
    // nodeIntegration: true,
    // contextIsolation: false,
    // nodeIntegrationInSubFrames: true
  }
};

const browserWindowOptions = {
  //  基础窗口配置
  main: {
    minWidth: 750,
    minHeight: 600,
    ...commonOptions
  },
  plugin: {
    ...commonOptions
  },
  pluginWorker: {
    ...workerOptions
  },
  update: {
    ...commonOptions,
    width: 320,
    height: 410
  },
  search: {
    ...commonOptions,
    width: 800,
    height: 60
  }
};

const scrollbarCSS = `
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);
}

::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-track:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.06);
}`;

const newWInOptions = () => JSON.parse(JSON.stringify(commonOptions));

export { browserWindowOptions, newWInOptions, scrollbarCSS };
