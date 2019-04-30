#! /bin/bash
#Usage: deploy.sh environment
PROJECT_NAME='cart-ui'
ENV=$1
CI=false
EMP='empresarias'
CP='compumundo'
GB='garbarino'
landings=( $EMP $CP $GB)
#subir esta var al entorno
CDN='//dj4i04i24axgu.cloudfront.net'
APPLICATION_VERSION="SNAPSHOT-$CIRCLE_SHA1-$CIRCLE_BUILD_NUM"

echo "Application version: $APPLICATION_VERSION"
echo $APPLICATION_VERSION > APP_VERSION

echo "environment: $ENV"
echo "export APP_ENV=$ENV" >> $BASH_ENV

echo "APP_ENV: $APP_ENV"
echo $ENV > APP_ENV

echo "******TEST*******"

cd /home/circleci/garbarino-com/$PROJECT_NAME/client

echo "Copying indexTemplate"
cp indexTemplate.html public/index.html

echo "Saving .env.production"
printf "CI=false\nPUBLIC_URL=$CDN/$PROJECT_NAME/$ENV/$APPLICATION_VERSION" > .env.production

echo "Building react cart"
yarn build

echo "sync with S3 bucket"
aws s3 sync ./build s3://garbarino-fe/$PROJECT_NAME/$ENV/$APPLICATION_VERSION --cache-control max-age=604800

echo "Starting norma sync..."
cd ..
for var in "${landings[@]}"
do
  echo "${var}"  
  node normaJob.js "${var}" 
done