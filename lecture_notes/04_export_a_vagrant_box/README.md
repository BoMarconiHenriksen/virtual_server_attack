# Export a box
One way to share a box is to export it with all your installations.  

##### Clean up the box before exporting
sudo apt-get clean  

##### For Ubuntu zero out the drive
sudo dd if=/dev/zero of=/EMPTY bs=1M  
sudo rm -f /EMPTY  

##### Delete the Bash history and exit the Vm box
cat /dev/null > ~/.bash_history && history -c && exit  

##### Repackage the VM into a New Vagrant Box  
Exit the vm box and in the command line write:  

vagrant package --output mynew.box  

##### Add the box into your Vagrant install (the box is added to the folder .vagrant.d/boxes)
vagrant box add mynewbox mynew.box  

##### Delete and remove the Vagrant file we built this box from.
vagrant destroy  

Delete the vagrant file or the folder.  

##### Initialize Your New Vagrant Box
vagrant init mynewbox  

vagrant up  

vagrant ssh  

Kudos to Nicholas Cerminara and his excellent tutorial.  
https://scotch.io/tutorials/how-to-create-a-vagrant-base-box-from-an-existing-one  
