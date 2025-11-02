#!/bin/bash
# Force install nodemailer specifically
echo "Installing dependencies..."
npm install
echo "Force installing nodemailer..."
npm install nodemailer@latest --save
echo "Dependencies installed successfully!"

