// 讓TypeScript 理解 .vue 檔案是 Vue 元件模組
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
