// import { registerWindowManagerService } from "./window";
import { registerDialogService } from "./dialog";
import { registerSystemService } from "./system";
import { registerDownloadService } from "./download";
import { registerFsService } from "./fs";
import { registerCryptoService } from "./crypto";
import { registerBufferWorkService } from "./buffer";

// ==================================================
// import { registerSqlService } from "./sql";
// import { registerNetWorkService } from "./net";
// import { registerCanWorkService } from "./can";
// import { registerCoapWorkService } from "./coap";
// import { registerGrpcWorkService } from "./grpc";
// import { registerSshWorkService } from "./ssh";
// import { registerHdcWorkService } from "./hdc";
// import { registerOrmWorkService } from "./orm";
// import { registerJfrogService } from "./jfrog";

const registerSDKMainListenerEvent = () => {
  // registerWindowManagerService();
  registerDialogService();
  registerSystemService();
  registerDownloadService();
  registerFsService();
  registerCryptoService();
  registerBufferWorkService();
  // registerSqlService();
  // registerJfrogService();
};

export default registerSDKMainListenerEvent;
