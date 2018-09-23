# virtual_server_attack

Download and install Virtual Box https://www.virtualbox.org/wiki/Downloads  
VirtualBox is a cross-platform virtualization application. It extends the capabilities of your existing computer so that it can run multiple operating systems (inside multiple virtual machines) at the same time. So, for example, you can run Windows and Linux on your Mac, run Windows Server 2008 on your Linux server, run Linux on your Windows PC, and so on, all alongside your existing applications. You can install and run as many virtual machines as you like -- the only practical limits are disk space and memory.  

Download and install Vagrant https://www.vagrantup.com/downloads.html  
Vagrant is a tool for building and managing virtual machine environments in a single workflow. In our example Vagrant is useing Virtual Box as our provider.  

Before getting started  
Add a box to your system. Find one here https://app.vagrantup.com/boxes/search - Press new on the box you have choosen to see how to add and initialise it.  

For now we will work with this box.  
vagrant box add ubuntu/trusty64  

Initialise the box  
vagrant init ubuntu/trusty64  

vagrant up  

Getting started tuturial  
https://www.vagrantup.com/intro/getting-started/  
