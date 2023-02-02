echo All users 
curl 'http://127.0.0.1:8001/'

echo add user vishal 
curl -X POST 'http://127.0.0.1:8001/user/add' -H "Content-Type: application/json" --data '{"username":"vishal", "name":"vishal"}'

echo All users 
curl 'http://127.0.0.1:8001/'

echo update user vishal no name
curl -X PUT 'http://127.0.0.1:8001/user/update' -H "Content-Type: application/json" --data '{"username":"vishal"}'

echo update user vishal with name
curl -X PUT 'http://127.0.0.1:8001/user/update' -H "Content-Type: application/json" --data '{"username":"vishal", "name":"vishal Kumar Gupta"}'

echo details of user vishal
curl 'http://127.0.0.1:8001/user/?username=vishal'

echo details of user praveen
curl 'http://127.0.0.1:8001/user/?username=praveen'

echo details of user deepak
curl 'http://127.0.0.1:8001/user/?username=deepak'
