# thravvel-mobile-front
=======================

Mobile client application for thravvel



## About cloning this project
----------------------------
This paper instructions are designed for developers using Linux(Debian) family Operating systems, 
but as soon as a developer working under a Windows OS will join the team, this paper will be updated.


### Prerequisites

> JDK 1.7 or above, with the JAVA_HOME variable set in the system PATH

> Android SDK (API 25 or above) with the ANDROID_HOME variable set in the system path     
  Here you can find a good tutorial about how to do this on ubuntu (http://askubuntu.com/questions/318246/complete-installation-guide-for-android-sdk-adt-bundle-on-ubuntu), 
  personally, i found the answer of "Host-website-on-iPage" user more usefull.
  
> nodejs:    
  Can be install with: `apt-get install nodejs`
  Sometimes this installation stores the nodejs binary under /usr/bin/nodejs, this way, npm commands will fail saying they can't
  find 'node' in the PATH, a workaround will be to make a symbolic link named 'node' to /usr/bin/nodejs like so:
  `ln -s /usr/bin/nodejs /usr/bin/node`
  
> npm:    
  Can be install with: `apt-get install npm`
  
> ionic and cordova:    
  can be install with: `npm install -g ionic cordova`
  
  
### Cloning
  
 > As this project does not include heavy plugins/modules (in fact we've gitignored them) generated by ionic but needed, you have to 
  generate an ionic project first  with the name `thravvel-mobile-front` to get them locally, to do so, follow these steps:
  
 > cd into your working local directory: `cd thravvelProjects` for example,
  then create the project inside:  `ionic start thravvel-mobile-front blank --v2`    
  This will generate an ionic starter project and download the needed libraries,plugins and node modules.
  
 > Now we have to update that project with the remote repository one, but as git does not allow cloning within a non-empty directory,
  we clone first in a temp directory: `mkdir temp; cd temp; git clone https://github.com/imphilippesimo/thravvel-mobile-front.git`
  Now we copy(update) the project files with the remote ones:
  `cp -ru thravvel-mobile-front ../thravvel-mobile-front`
  
 > You can now remove the temp dir: `cd .. ; rm -r temp`
  Run `npm install` to get the needed dependencies,
  Now you are good to go :-)

