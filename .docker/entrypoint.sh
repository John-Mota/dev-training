#!/bin/sh
 
npm install
npm run build
npx typeorm migration:run 
npm run start:dev
chmod -R 777 /home/node