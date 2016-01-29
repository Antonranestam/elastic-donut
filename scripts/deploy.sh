echo 'Generate .pem key...'
openssl aes-256-cbc -K $encrypted_cef7aeeb76ec_key -iv $encrypted_cef7aeeb76ec_iv -in donut.pem.enc -out donut.pem -d
echo 'Deploying...'
rsync -rave 'ssh -i donut.pem -o StrictHostKeyChecking=no' -av --exclude-from './scripts/excluded-files.txt' ./ donut@icepick.xn--q9jyb4c:/home/donut/nodes/elastic-donut
echo 'Building...'
ssh -i donut.pem -o StrictHostKeyChecking=no donut@icepick.xn--q9jyb4c 'cd /home/donut/nodes/elastic-donut && npm install && npm run build && pm2 restart donut'
