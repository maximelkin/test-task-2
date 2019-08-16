
For start tests (Have changed interval for recalculation)
```shell script
cp .env.test .env
docker-compose up -d rabbit redis postgres
# wait for a start
docker-compose up --build -d store api aggregator

cd test
npm test
```

If needed interval 1 minute (test/ will not work)
```shell script
cp .env.prod .env
docker-compose up -d rabbit redis postgres
# wait for a start
docker-compose up --build -d store api aggregator
```
