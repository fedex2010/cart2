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
landings=( $EMP $CP $GB)
APPLICATION_VERSION="SNAPSHOT-$CIRCLE_SHA1-$CIRCLE_BUILD_NUM"

echo $APPLICATION_VERSION
echo $APPLICATION_VERSION > APP_VERSION
echo $ENV > APP_ENV

cd /home/circleci/garbarino-com/$PROJECT_NAME/client
# cd client
echo "index copied"
cp indexTemplate.html public/index.html
printf "CI=false\nPUBLIC_URL=$CDN/$PROJECT_NAME/$ENV/$APPLICATION_VERSION" > .env.production
yarn build
aws s3 sync ./build s3://garbarino-fe/$PROJECT_NAME/$ENV/$APPLICATION_VERSION --cache-control max-age=604800

cd ..
for var in "${landings[@]}"
do
  echo "${var}"  
  node normaJob.js "${var}" 
done