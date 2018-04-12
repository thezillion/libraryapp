cd client
npm install
npm run build
cd ..
cp -r client/build server/
docker-compose up
