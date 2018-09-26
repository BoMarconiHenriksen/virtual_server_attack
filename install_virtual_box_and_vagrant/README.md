### Download and install Virtual Box https://www.virtualbox.org/wiki/Downloads  
VirtualBox is a cross-platform virtualization application. It extends the capabilities of your existing computer so that it can run multiple operating systems (inside multiple virtual machines) at the same time. So, for example, you can run Windows and Linux on your Mac, run Windows Server 2008 on your Linux server, run Linux on your Windows PC, and so on, all alongside your existing applications. You can install and run as many virtual machines as you like -- the only practical limits are disk space and memory.  

### Download and install Vagrant https://www.vagrantup.com/downloads.html  
Vagrant is a tool for building and managing virtual machine environments in a single workflow. In our example Vagrant is useing Virtual Box as our provider.  

### Before getting started  
Add a box to your system. Find one here https://app.vagrantup.com/boxes/search - Press new on the box you have choosen to see how to add and initialise it.  

Open virtual box on your system.  

Open Git Bash or cmder.  
Make a new directory and cd into it.  

For now we will work with the box ubuntu/trusty64 which is an ubuntu 16.04 server.  
vagrant box add ubuntu/trusty64  

### Initialise the box.  
vagrant init ubuntu/trusty64  

vagrant up  

### Connect to your virtual machine.  
vagrant ssh  

### If you can't connect.  
vagrant ssh-config  
ssh user@hostName -p [<port_Number>] -i [<IdentityFile_Path>]  

Go to the Virtual Box application and check that you have a new virtual box.  

Getting started tuturial  
https://www.vagrantup.com/intro/getting-started/  
