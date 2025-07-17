#!/bin/bash

cp .env-development-template .env-development
sed -i "s/Password/$(openssl rand -base64 12)/g" .env-development

cp .env-production-template .env-production
sed -i "s/Password/$(openssl rand -base64 12)/g" .env-production

cd ./certificates
bash ./generate.sh
cd ..
