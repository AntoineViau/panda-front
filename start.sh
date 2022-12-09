#!/bin/bash
npx tailwindcss -i ./src/wawatt.css -o ./src/output.css --watch &
npx http-server ./src

