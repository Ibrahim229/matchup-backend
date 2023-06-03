#!/bin/bash

set -xe

SSH_KEY=/tmp/ssh-key.pem
URI=ec2-user@ec2-18-197-40-148.eu-central-1.compute.amazonaws.com

ssh -i $SSH_KEY $URI "rm -rf app"
scp -ri $SSH_KEY $PWD $URI:~/app

ssh -i $SSH_KEY $URI " \
    cd app; \
    docker-compose up --build -d; \
"
