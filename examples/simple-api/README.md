## Example API Project 

### Prepare
If you use is directory, you need to copy base project file.

```
$ cp ../../dist src
```

### Pre deployment for AWS

Open `serverless.yml` and replace the `YOUR_DEPLOYMENT_BUCKET_NAME` props as your S3 bucket name (example: `example-nestjs-s3-bucket`).

```
custom:
  stage:  ${opt:stage, self:provider.stage}
  deploymentBucket: YOUR_DEPLOYMENT_BUCKET_NAME
```

### Deploy to AWS

```
$ yarn run deploy / deploy-dev / deploy-prod
```

### Running in offline

```
$ sls offline

$ curl localhost:3000
```

### Swagger (Open API)

```
$ yarn start

-> Go to http://localhost:3000/api/

$  export PORT=3100; yarn start
-> Go to http://localhost:3100/api/
```

## Development

### Test

```
$ yarn run test
```

### Lint / format

```
$ yarn run lint

$ yarn run format
```