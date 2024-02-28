// todo sz※ vite 构建工具的【配置文件】, vite是一个构建工具，可以通过在配置里面引用其他的【vant框架】
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入插件
import styleImport, {VantResolve} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
        resolves: [VantResolve()],
    }),]
})

