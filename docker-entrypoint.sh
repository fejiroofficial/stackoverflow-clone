#!/bin/sh
node server/app.js

echo
sleep 3

exec "$@"