yarn build
cp ./dist/* ../api/ViewService/src/main/resources/static/ -r
sudo mkdir -p ../api/ViewService/target/classes/static/
sudo cp ./dist/* ../api/ViewService/target/classes/static/ -r
