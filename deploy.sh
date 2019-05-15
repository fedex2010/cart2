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

# echo "environment: $ENV"
# echo "export APP_ENV=APP_ENV" >> $BASH_ENV

echo "Copying indexTemplate"
yarn cp-norma-template

cd /home/circleci/garbarino-com/$PROJECT_NAME/client
# test
# cd client/ 

echo "Saving .env.production"
printf "REACT_APP_APP_ENV=$ENV\nPUBLIC_URL=$CDN/$PROJECT_NAME/$ENV/$APPLICATION_VERSION" > .env.production
# test 
# printf "REACT_APP_APP_ENV=$ENV\nPUBLIC_URL=$CDN/$PROJECT_NAME/TEST/$APPLICATION_VERSION" > .env.production

echo "Building react cart"
yarn build

echo "sync with S3 bucket"
aws s3 sync ./build s3://garbarino-fe/$PROJECT_NAME/$ENV/$APPLICATION_VERSION --cache-control max-age=604800
# test
# aws s3 sync ./build s3://garbarino-fe/$PROJECT_NAME/TEST/$APPLICATION_VERSION --cache-control max-age=604800

echo "Starting norma sync..."
cd ..
cd server/
for var in "${landings[@]}"
do
  echo "${var}"  
  node normaJob.js "${var}" true
done