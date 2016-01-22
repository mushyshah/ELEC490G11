# ELEC490G11
ELEC490G11 Final Year Project - Web-Based Visualization Tool


Run following command on destination server to forward port 80 to 3000 
"sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000"