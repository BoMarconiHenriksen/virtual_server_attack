# Configure multiple servers in one Vagrant file.

#### Create a Vagrant file
vagrant init ubuntu/xenial64  

#### Open the Vagrant file in vs code. 
You can create more virtual machines by wrapping each machine in a blok like this.  
```
config.vm.define "<vmName>" do |<vmName>|
  <enter setup code here>
end
```
Delete all the default code in the vagrant file and copy/paste this in.  
```
Vagrant.configure("2") do |config|  
  config.vm.define "web" do |web|  
    web.vm.box = "ubuntu/xenial64"  
    web.vm.hostname = 'web'  
    # Does not need to be specified if you use  HashiCorp's Vagrant Cloud otherwise enter the url for the box.  
    # web.vm.box_url = "ubuntu/xenial64"  

    web.vm.network :private_network, ip: "192.168.56.101"  

    web.vm.provider :virtualbox do |v|  
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]  
      v.customize ["modifyvm", :id, "--memory", 512]  
      v.customize ["modifyvm", :id, "--name", "web"]  
    end  
  end  

  config.vm.define "db" do |db|  
    db.vm.box = "ubuntu/xenial64"  
    db.vm.hostname = 'db'  
    Does not need to be specified if you use  HashiCorp's Vagrant Cloud otherwise enter the url for the box.  
    # db.vm.box_url = "ubuntu/xenial64"  

    db.vm.network :private_network, ip: "192.168.56.102"  

    db.vm.provider :virtualbox do |v|  
      v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]  
      v.customize ["modifyvm", :id, "--memory", 512]  
      v.customize ["modifyvm", :id, "--name", "db"]  
    end  
  end  
end  
```
#### Check that both servers are running
vagrant status 

#### Enter the web server
vagrant ssh web  

#### Enter the db server
vagrant ssh db  

#### Good stuff to know!
##### If you use one server more than the other it's possible to only use ssh to login.
In your Vagrant file replace this line:  
config.vm.define "web" do |web|  

With this:  
```
config.vm.define "web", primary: true do |web|  
```
And now it possible to login to your web server with: vagrant ssh.  

#### Prevent 1 machine from starting
In your Vagrant file replace this line:  
config.vm.define "db" do |db|  

With this:  
```
config.vm.define "db", autostart: false do |db|  
```
##### Check that only 1 server is running  
vagrant status  

##### If you want to run the db server you have to run
vagrant up db  

vagrant ssh db  

#### Port forwarding
##### Vagrant automatically picks the ports it's possible they won't match in the future
It's possible to set a port for each server.  

##### In the Vagrant file and then in the config part for the web server under this line:
web.vm.network :private_network, ip: "192.168.56.101"  

Add this line:  
```
web.vm.network :forwarded_port, guest: 22, host: 10122, id: "ssh"  
```
and int the config part for the db server under this line:  
db.vm.network :private_network, ip: "192.168.56.102"  

Add this line:  
```
db.vm.network :forwarded_port, guest: 22, host: 10222, id: "ssh"  
```
