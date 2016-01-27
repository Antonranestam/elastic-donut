echo 'Deploying...'
rsync -rave 'ssh -i ${DEPLOY_KEY}' -av --exclude-from './scripts/excluded-files.txt' ./ donut@icepick.xn--q9jyb4c:/home/donut/nodes/elastic-donut
echo 'Building...'
ssh -i $DEPLOY_KEY donut@icepick.xn--q9jyb4c 'cd /home/donut/nodes/elastic-donut && npm install && npm run build'
