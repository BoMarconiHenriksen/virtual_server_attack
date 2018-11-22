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
