### Basics
1. Network -> computer to computer connection
2. protocal -> Its like a language of communication
3. ports -> ports are like doors on which the communication is happening
4. server -> computer providing files and information
5. clinet -> computer gathering files and information from server
6. mac address -> This is the address on the network card
        Mac address are unique for a device , it burnt on the device, usually its unique.
        There were instances when the mac address were same for two devices , but mac address can also be changedj
7. Ip address -> DHCP allocates ip address to your device network
        ifconfig --> IPv4 
8. ping ip.addresss.0.1.2 --> used for communication between computers

### Service
1. http
2. https
3. email
4. ftp

### Terminologies
Repeater --> takes the signal and repeats its (Dumb device)
hub --> takes to signal and repeats it to multiple outputs (Dumb device)
bridge --> a device between hub and switches
switches -> 
    1. take the signal and repeats it to multiple outputs but with filter and inteligence depending upon the mac address table (inteligence device)
    2. are used for forwarding traffic in local area network (LAN)
rounter --> are used for forward traffic from lan to wan(wide area network)
firewall --> filters the traffic 
    1. Allows or deny who can enter your network
    2. IDS -> Intrusion detections system (This only detects the attack)
    3. IPS -> Intrusion protection system (This detacts and stops the attack)
Lan controller --> defines access points

### Different types of layers model
1. OSI model (7 layer)
2. TCP/IP model

### Layers 
layer1 (Physical layer) --> hub, repeaters. (bits , if light -> 1 , no light -> 0) 
layer2 --> (Frame) --> switches , bridge. (signals moving from one frame to onather)
layer3 --> (routers) --> (packets, packets of information transporting Network)
layer4 protocol --> Tcp / Udp (segments)
layer 5 ,6, 7 --> applications (layer7) --> HTTP/ HTTPS/ Telnet /FTP /TFTP  

### Ports
Http - 80
Https - 443
FTP -21
ssh -23
Email(SMTP,pop3) - 25

### Binary
IP address 192.168.1.72  --> 32 bit  IPv4
192 -->> 0000 1010
168 -->> 1000 1010
1   -->> 0100 1010
72  -->> 0010 1010
subnet mask 225.225.225.0 --> 32 bits
router --> 10.0.0.1 --> 32 bits

### IPv4
IP address's resides in the layer three in the router to identify the devices in the network
Private ip (Similar Ip can be used in a different network)
public IP (This is unique in the world)
Dns is used to convert DNS name to ipaddress

### Classes in Ip address  (Network address and host address)
Class A
Class B
Class C 192.168.1.1
Class A
Class E 

### Special address 
Direct broadacast address (Brodcast on different networks)
local broadcast address (Broadcast on locak network) DHCP server then defines the ip address for the devices on the network
