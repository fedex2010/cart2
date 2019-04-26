#! /bin/bash
#Usage: deploy.sh environment
PROJECT_NAME='cart-ui'
ENV=$1
CI=false
#subir esta var al entorno
CDN='//dj4i04i24axgu.cloudfront.net'
EMP='empresarias'
CP='compumundo'
GB='garbarino'

# echo $ENV > APP_ENV

echo $APPLICATION_VERSION > APP_VERSION

APPLICATION_VERSION="SNAPSHOT-$CIRCLE_SHA1-$CIRCLE_BUILD_NUM"
echo $APPLICATION_VERSION

cd /home/circleci/garbarino-com/$PROJECT_NAME

PUBLIC_URL=$CDN/$PROJECT_NAME/$GB/$ENV/$APPLICATION_VERSION yarn build-garbarino
aws s3 sync ./client/build s3://$GB-fe/$PROJECT_NAME/$GB/$ENV/$APPLICATION_VERSION --cache-control max-age=604800

PUBLIC_URL=$CDN/$PROJECT_NAME/$CP/$ENV/$APPLICATION_VERSION yarn build-compumundo
aws s3 sync ./client/build s3://$CP-fe/$PROJECT_NAME/$CP/$ENV/$APPLICATION_VERSION --cache-control max-age=604800

PUBLIC_URL=$CDN/$PROJECT_NAME/$EMP/$ENV/$APPLICATION_VERSION yarn build-empresarias
aws s3 sync ./client/build s3://$EMP-fe/$PROJECT_NAME/$EMP/$ENV/$APPLICATION_VERSION --cache-control max-age=604800
