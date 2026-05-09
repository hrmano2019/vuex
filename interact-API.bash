# Set your Vercel token
export VERCEL_TOKEN=your_vercel_api_token_here
export VERCEL_PROJECT_ID=prj_VOpAReVa5QFQMhUZ2P0TaKbokntQ

# Trigger a deployment
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "optiprod",
    "project": "'"$VERCEL_PROJECT_ID"'",
    "target": "production"
  }'
