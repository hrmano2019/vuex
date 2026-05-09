#!/bin/bash
set -e

# 1. Set your CircleCI token as an environment variable
export CIRCLE_TOKEN=your_circleci_api_token_here

# 2. Define your project slug
# Format: vcs-type/organization-name/repo-name
# For GitHub it looks like: gh/username/repo
PROJECT_SLUG="gh/hrmano2019s-projects/OptiProd"

# 3. Call CircleCI API to list pipelines
curl -X GET "https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline" \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --header "Circle-Token: $CIRCLE_TOKEN"
