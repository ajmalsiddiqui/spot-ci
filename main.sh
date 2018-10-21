#!/bin/bash

TERM_PROMPT='[spot-ci]'

echo "$TERM_PROMPT Remote GitHub repository updated!"
echo "$TERM_PROMPT updating GCP deployment..."
echo "$TERM_PROMPT pulling changes..."

git pull origin master

if [ $? -eq 0 ] ; then
	echo "$TERM_PROMPT Successfully pulled changes!"
else
	echo "$TERM_PROMPT Something went wrong! There is likely an error log above"
	echo "$TERM_PROMPT exiting..."
	exit 1
fi

echo "$TERM_PROMPT Updating npm packages using npm install..."

npm install

if [ $? -eq 0 ] ; then
	echo "$TERM_PROMPT Successfully installed packages!"
else
	echo "$TERM_PROMPT Something went wrong! There is likely an error log above"
	echo "$TERM_PROMPT exiting..."
	exit 1
fi

echo "$TERM_PROMPT Deploying project"

gcloud app deploy -q --project spot-ci-1