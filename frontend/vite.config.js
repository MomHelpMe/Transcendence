import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
            "/api": {
                // TEST: 평가 시 80번 포트로 변경 (nginx를 거쳐 api를 호출하도록)
                target: "http://localhost:8000",
                changeOrigin: true,
            },
        },
    },
});
