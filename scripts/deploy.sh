echo 'Deploying...'
rsync -rave 'ssh -i ./donut.pem' -av --exclude-from './scripts/excluded-files.txt' ./ donut@icepick.xn--q9jyb4c:/home/donut/nodes/elastic-donut
echo 'Building...'
ssh -i ./donut.pem donut@icepick.xn--q9jyb4c 'cd /home/donut/nodes/elastic-donut && npm install && npm run build && pm2 restart donut'
