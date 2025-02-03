const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(exr)$/, // Manejar archivos .exr
          type: 'asset/resource',
          generator: {
            filename: 'assets/enviroment/[name].[hash][ext]', // Ruta en la carpeta de salida
          },
        },
        {
          test: /\.(hdr)$/, // Manejar archivos .hdr
          type: 'asset/resource',
          generator: {
            filename: 'assets/environments/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(glb)$/, // Manejar archivos .glb
          type: 'asset/resource',
          generator: {
            filename: 'assets/models/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(fbx)$/, // Manejar archivos .fbx
          type: 'asset/resource',
          generator: {
            filename: 'assets/models/[name].[hash:8][ext]',
          },
        },
      ],
    },
  },
});
