# Linux 

### OS
1. Desktop os -> windows , mac , ubuntu
2. Server os -> windows server, centos , red hat linux
3. Mobile 0s -> android, windows, iso
4. My used linux distros are ubuntu and centos(Red hat)
5. Linux file systems ext4,XFC and Btrfs
6. Linux 
    - Kernal, started at boot, memory and cpu management, file system access, Network management
    - Shell , programs to interact with kernal 
7. Centos stream is a copy of red had

### Connect remotely
```bash
ssh -l username ip.address.1.0
ifconfig  # get the ip address
cd / # Takes you to the root dir
```

### List 
```Bash
ls # list contents of dir
ls foldername # lists the content of folder without moving to the folder
ls -l # detailed list in alphabatical order
ls -ltr # detailed list with oldest on the top , reverse's the order, t sort by time
ls -a # list with hidden files
```

### Movement
```Bash
open foldername # Open the specified folder
pwd # Print working directory
cd foldername # Moves to the sepcified folder
```

### Combining commands
```Bash
; can be used for separating the commands
```

### File system
```Bash
/boot # folder for bootleader (grab.cfg)
/root # home dir for root
/dev  # system devices
/etc  # configuration
/usr/bin # Commands
/usr/sbin # system commands
/opt # optional applications
/proc # proccess
/lib # programming libraries
/tmp # dir for temp files
/home # user dir
/var # system logs
/run # Storing temp runtime files like PID
/mnt # mount external file system
/media # mounting cd rom
```

### File types
- Regular files (text files , files with extentions)
d Directory
l Links
c Special character device files(Hard drive, etc)
s socket files
p named pipe 
b block device

### Change password
passwd userid

### Imp commands
```Bash
mkdir dirname # Make directory
touch filename # creata a file
cp initialfilename finalfilename # copy file
mv initialfilename finalfilename # move file
cp -R initialdir finaldir # copy directories
rm filename # remove the file
rm -r # remove the folder content recursively
rm -rf # remove the directory
rmdir #removes empty directory
find . -name filename # find files 
find . -type file # find files with type
whoami # print current user
su - # change to root user
```

### Wild cards
```Bash
concept of Globbing
rm abc*  # remove all the files starting with abc
rm *xyz  # remove all the files ending with xyz
ls -l abc* # list all the files starting with abc
touch abcd[1-2].txt # create files with the sequence numbers
rm ?bc* # remove files with bc starting from second charecter
** # This searchs for all the files also in the sub folders
```

### user accounts
1. Superuser Sudo
2. Normal user
sudo # change user with sudo

### ubuntu and mac package management 
```Bash
sudo apt update # Refresh the list of all packages
sudo apt upgrade # Runs small upgrade of system
sudo apt full-upgrade # Runs entire upgrade of the system
sudo apt install
sudo apt remove
sudo apt autoremove # removes not used packages
brew install
brew update
brew upgrade
brew ls # list all the packages
```
