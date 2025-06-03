import { BackendDynamicPluginInstaller } from "@backstage/backend-dynamic-feature-service";
import {
  coreServices,
  createBackendModule,
} from "@backstage/backend-plugin-api";
import { scaffolderActionsExtensionPoint } from "@backstage/plugin-scaffolder-node/alpha";
import * as backendModuleActions from "./actions";

export const dynamicPluginInstaller: BackendDynamicPluginInstaller = {
  kind: "new",
  install: () =>
    createBackendModule({
      moduleId: "veecode-extensions",
      pluginId: "scaffolder",
      register(env) {
        env.registerInit({
          deps: {
            scaffolder: scaffolderActionsExtensionPoint,
            discovery: coreServices.discovery,
          },
          async init({ scaffolder, discovery }) {
            scaffolder.addActions(
              backendModuleActions.createFileAction(),
              backendModuleActions.parseJsonAction(),
              backendModuleActions.toBase64Action()
            );
          },
        });
      },
    }),
};
