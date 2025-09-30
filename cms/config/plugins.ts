export default ({ env }) => {
  const isR2Enabled = Boolean(
    env('R2_ACCESS_KEY_ID') &&
      env('R2_SECRET_ACCESS_KEY') &&
      env('R2_BUCKET') &&
      env('R2_ENDPOINT')
  );
  return {
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
        provider: isR2Enabled ? 'aws-s3' : 'local',
        providerOptions: isR2Enabled
          ? {
              baseUrl: env('R2_PUBLIC_BASE_URL'),
              rootPath: env('R2_BUCKET_PREFIX', ''),
              s3Options: {
                credentials: {
                  accessKeyId: env('R2_ACCESS_KEY_ID'),
                  secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
                },
                endpoint: env('R2_ENDPOINT'),
                region: env('R2_REGION', 'auto'),
                params: {
                  ACL: env('R2_ACL', 'public-read'),
                  Bucket: env('R2_BUCKET'),
                },
              },
            }
          : {},
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};