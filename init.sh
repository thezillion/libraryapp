cd client
npm install
rm -rf build
npm run build
cd ..
cp -r client/build server/
docker-compose up
