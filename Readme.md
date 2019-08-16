
For start tests (Have changed interval for recalculation)
```shell script
cp .env.test .env
docker-compose up -d rabbit redis postgres store api aggregator test
docker-compose logs -f test
```

If needed interval 1 minute (test/ will not work)
```shell script
cp .env.prod .env
docker-compose up -d rabbit redis postgres store api aggregator test
```
