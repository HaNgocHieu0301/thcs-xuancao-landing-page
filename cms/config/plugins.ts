export default ({ env }) => ({
  seo: {
    enabled: true,
  },
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      playgroundAlways: false,
    },
  },
  upload: {
    config: {
      provider: env('CLOUDINARY_URL') ? 'cloudinary' : 'local',
      providerOptions: env('CLOUDINARY_URL')
        ? {
            cloud_name: env('CLOUDINARY_CLOUD_NAME'),
            api_key: env('CLOUDINARY_API_KEY'),
            api_secret: env('CLOUDINARY_API_SECRET'),
          }
        : {},
    },
  },
});
