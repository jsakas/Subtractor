#!/usr/bin/env bash

curl --user ${CIRCLECI_TOKEN}: \
    --request POST \
    --form revision=$1\
    --form config=@circle.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/jsakas/Subtractor
