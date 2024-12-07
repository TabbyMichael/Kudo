// vite.config.ts
import { defineConfig } from "file:///C:/Users/Administrator/Documents/GitHub/Todoist/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Administrator/Documents/GitHub/Todoist/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "c:\\Users\\Administrator\\Documents\\GitHub\\Todoist";
var vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: [
      "@firebase/app",
      "@firebase/auth",
      "@firebase/firestore",
      "@firebase/storage"
    ],
    esbuildOptions: {
      target: "esnext"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcVG9kb2lzdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiYzpcXFxcVXNlcnNcXFxcQWRtaW5pc3RyYXRvclxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXFRvZG9pc3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2M6L1VzZXJzL0FkbWluaXN0cmF0b3IvRG9jdW1lbnRzL0dpdEh1Yi9Ub2RvaXN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnXSxcbiAgICBpbmNsdWRlOiBbXG4gICAgICAnQGZpcmViYXNlL2FwcCcsXG4gICAgICAnQGZpcmViYXNlL2F1dGgnLFxuICAgICAgJ0BmaXJlYmFzZS9maXJlc3RvcmUnLFxuICAgICAgJ0BmaXJlYmFzZS9zdG9yYWdlJ1xuICAgIF0sXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIHRhcmdldDogJ2VzbmV4dCdcbiAgICB9XG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZVxuICAgIH1cbiAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVSxTQUFTLG9CQUFvQjtBQUN4VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLElBQ3hCLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGlCQUFpQjtBQUFBLE1BQ2YseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
