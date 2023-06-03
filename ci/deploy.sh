#!/bin/bash

set -xe

SSH_KEY=/tmp/ssh-key.pem

ssh -i $SSH_KEY $URI "rm -rf app"
scp -ri $SSH_KEY $PWD $URI:~/app

ssh -i $SSH_KEY $URI " \
    cd app; \
    docker-compose up --build -d; \
"
