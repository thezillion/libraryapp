cd client
yarn build
cd ..
cp -r client/build server/
docker-compose up