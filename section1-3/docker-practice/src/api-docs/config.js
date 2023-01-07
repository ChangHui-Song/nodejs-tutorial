export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'docker 과제 docs',
      version: '1.0.0',
    },
  },
  apis: ['./src/api-docs/*.swagger.yaml'],
};
