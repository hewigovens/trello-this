#!/bin/sh

ZIP_EXCLUDE="*.DS_Store *.swo *.swp src/*~ src/js/*~ src/css/*~"

tool/crxtool.sh src tool/trello-this.pem build/trello-this.crx
zip -r src.zip src -x $ZIP_EXCLUDE && mv src.zip build/forChromeStore.zip
