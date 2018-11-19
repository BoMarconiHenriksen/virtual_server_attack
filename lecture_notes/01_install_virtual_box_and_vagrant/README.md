Tutorial  
https://www.taniarascia.com/how-to-install-apache-php-7-1-and-mysql-on-ubuntu-with-vagrant/  

### Download and install Virtual Box https://www.virtualbox.org/wiki/Downloads  
VirtualBox is a cross-platform virtualization application. It extends the capabilities of your existing computer so that it can run multiple operating systems (inside multiple virtual machines) at the same time. So, for example, you can run Windows and Linux on your Mac, run Windows Server 2008 on your Linux server, run Linux on your Windows PC, and so on, all alongside your existing applications. You can install and run as many virtual machines as you like -- the only practical limits are disk space and memory.  

### Download and install Vagrant https://www.vagrantup.com/downloads.html  
Vagrant is a tool for building and managing virtual machine environments in a single workflow. In our example Vagrant is useing Virtual Box as our provider.  

### Before getting started  
Open virtual box on your system.  

Open Git Bash or cmder.  
Make a new directory and cd into it.  

### Get this Vagrant box and add it to your system.  
vagrant box add ubuntu/trusty64  

##### If you another time want to install other os you find them here. Skip this step for now.
You can find other boxes here https://app.vagrantup.com/boxes/search - Press new on the box you have choosen to see how to add and initialise it. 

### Initialise the box.  
vagrant init ubuntu/xenial64  

vagrant up  

### Connect to your virtual machine.  
vagrant ssh  

### If you get this error: 
VT-x is disabled in the BIOS for both all CPU modes (VERR_VMX_MSR_ALL_VMX_DISABLED)  
https://www.laptopmag.com/articles/access-bios-windows-10  

### negative string size error
If you get this error: negative string size (or size too big) (ArgumentError)  

In the folder user delete the folder .vagrant.d  

If it still does not work then uninstall Vagrant and Virtual Box and install both again. Be sure that the .vagrant.d folder is deleted.  

### If you can't connect.  
vagrant ssh-config  
ssh user@hostName -p [<port_Number>] -i [<IdentityFile_Path>]  

Go to the Virtual Box application and check that you have a new virtual box.  

Getting started tuturial  
https://www.vagrantup.com/intro/getting-started/  

### Useful commands
Delete a virtual server.
vagrant destroy

Remove a box - If the box version from vagrant is not made with the same version of virtualbox you can get errors. Then remove the box and add it again if its updated.  
vagrant box remove <box name>  

Restart your virtual machine, skipping the initial import step.  
vagrant reload --provision  

Reload vagrant after changes in vagrant file.  
vagrant reload  
