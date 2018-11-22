# Shell scrips for Vagrant

### Inline Scripts
##### Copy/paste this code to your vagrantfile
´´´
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
´´´
##### Run the inline scripts with a new box
vagrant up

##### Run the inline scrips in a box that is running
vagrant provision
