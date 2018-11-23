# Shell scrips for Vagrant

### Inline Scripts
This demo will show you how to use inline scrips when setting up a vm box.  

##### Copy/paste this code to your vagrantfile

```
Vagrant.configure("2") do |config|  
  config.vm.define "web2", primary: true do |web|  
    web.vm.box = "ubuntu/xenial64"  
    web.vm.hostname = 'web'  
    
    web.vm.network :private_network, ip: "192.168.56.102"  
    web.vm.network :forwarded_port, guest: 22, host: 11122, id: "ssh"  

    web.vm.provider :virtualbox do |v|  
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]  
      v.customize ["modifyvm", :id, "--memory", 512]  
      v.customize ["modifyvm", :id, "--name", "web2"]  
    end  
    
    # Inline scripts  
    config.vm.provision "shell", inline: <<-SHELL  
      echo setting up nginx...  
      sudo apt-get -y install nginx  
      sudo service nginx start  
    SHELL  
  end  
end  
```
##### Run the inline scripts with a new box
vagrant up

##### Run the inline scrips in a box that is running
vagrant provision


# Provision and shell scripts
For this demo we will update write 2 scripts. One will update the ubuntu OS and the other will install and configure NginX. So that we can visit a very simple webpage.  

The shell provisioner is the most basic provisioner, and allows you to upload and execute a shell script as the root user in the VM.  

#### Map the local domain to the IP
We will start by adding the private IP and the server name to the host machine's hosts file. 

##### MacOs
For macOs users you can find the host file here.  
```
sudo /etc/hosts  
```
##### Windows
Windows users can find the host file here.  
```
Windows/System32/Drivers/etc/  
```
You have to edit in admin mode. Add this line to the file.  
```
192.168.56.105	vagrant-test.local.com	# For security project.  
```
Save the file.  
Attention! For some reason the OS sometimes comment out the line so if the connection does not work check this file.  

To prevent the hosts entries from being commented out by Bitdefender 2016 do the following:

In the main Bitdefender interface click on the human icon (from the upper right corner) and choose General Settings > Advanced tab > "Scan hosts file" button.

##### Add an ubuntu box to your system
Create a new folder and add an ubuntubox.  
```
vagrant init ubuntu/xenial64  
```
##### Open the vagrantfilen
Delete all the content in the vagrant file.  

Add the below code to the file vagrant file.  
```
Vagrant.configure("2") do |config|
  config.vm.define "webScripts", primary: true do |web|
    web.vm.box = "ubuntu/xenial64"
    web.vm.hostname = 'web'
    
    web.vm.network :private_network, ip: "192.168.56.105"
    web.vm.network :forwarded_port, guest: 22, host: 12122, id: "ssh"

    web.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      v.customize ["modifyvm", :id, "--memory", 512]
      v.customize ["modifyvm", :id, "--name", "web2"]
    end

    # Use the shell script you find in .provision folder and run it.
    config.vm.provision "shell", path: ".provision/updateUbuntu.sh"

    # Install and configure nginx.
    config.vm.provision "shell", path: ".provision/installNginx.sh"

  end
end
```
##### Create new folders
In the root directory(Where your vagrant file is) create a new folder called .provision and in the .provision folder create a new folder and give it nginx as name.  

##### Update Ubuntu script
In the .provision folder create a file called: updateUbuntu.sh and add the code below.  
```
#!/usr/bin/env bash

echo "Updating ubuntu..."

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get autoremove -y
sudo apt-get autoclean
```
##### Install NginX script
In the .provision folder create a file called: installNginx.sh and add the code below.  
```
# Where to look for the bash program.
#!/usr/bin/env bash

# Install and start nginx.
if [ ! -e /etc/nginx ]
then
    sudo apt-get -y install nginx
    sudo service nginx start
else
    echo "nginx is installed."
fi

# set up nginx server
# -e return true if file exist.
if [ ! -e /etc/nginx/sites-available/site.conf ] 
then
    echo "Copy site."
    # Copy the content of nginx.conf to site.conf.
    sudo cp /vagrant/.provision/nginx/nginx.conf /etc/nginx/sites-available/site.conf
    # Only owner can write, others can read.
    sudo chmod 644 /etc/nginx/sites-available/site.conf
    # Create a symlink from sites-available/site.conf to sites-enabled/site.conf
    sudo ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/site.conf
    sudo service nginx restart

else
    echo "site.conf is already set up."
    sudo service nginx restart
fi 

# clean /var/www. Removes nginx default files.
sudo rm -Rf /var/www

# symlink /var/www => /vagrant. Creates a symlink from /var/www to vagrant which is the default shared folder.
ln -s /vagrant /var/www

# Create an index.html file with basic content.
cat <<EOF >/var/www/index.html
<!DOCTYPE html>
<html>
    <head>
        <title>Security</title>
    </head>
    <body>
        <h1>Demo Vagrant and nginx!</h1>
    </body>
</html>
EOF
```
##### Create the basic config file for nginx server
In the nginx folder create a file called nginx.conf and add the code below.  
```
# Basic config file for nginx server.
server {
    listen 80;

    # Name of our server.
    server_name vagrant-test.local.com;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    root   /var/www;

    location / {
    }
}
```
##### Start the server
vagrant up  
vagrant ssh  

Open your browser and visit your local homepage vagrant-test.local.com  

### Excercises
#### Hints for both excersices
##### Run the vagrantfil without setting the vm box up again
vagrant provision

##### Set up the vm box again and run the provision
vagrant reload --provision

#### Make a vagrant file that install apache and MySql
1. It should be possible to see a basic homepage.  
2. MySql should have 1 tabel with 3 users.  

#### Python and scripting
Make an automated Python script that create an Ubuntu droplet and installs nginx, nodejs and a node backend from a shell script.  
https://github.com/koalalorenzo/python-digitalocean  

https://devhints.io/bash
