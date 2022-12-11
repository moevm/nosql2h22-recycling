#!/bin/sh

if [ "$GENERATE" = "true" ]
then
    ./generator/bin/run generate -p=27017 -u=30 -o=15 -h=db -d=Recycling
fi

npm run dev:server
