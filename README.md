Github-Forum
============

A simple forum with pages managed by Jekyll and threads powered by Disqus.  Check out our [sample site](http://klcodanr.github.io/Jekyll-Disqus-Forum/).

## Setup

Follow these five steps to set up your own copy of Jekyll Discuss Forums:

1. *Create a New Repository*

   Go to your https://github.com and create a new repository named forum

2. *Install Jekyll-Disqus-Forum*

    Enter these commands into your terminal in a directory you want your forum to be:

        git clone https://github.com/klcodanr/Jekyll-Disqus-Forum.git forum
        cd forum
        git remote set-url origin git@github.com:USERNAME/forum.git
        git push origin master

3. *Setup Disqus*

   [Create an application](http://help.disqus.com/customer/portal/articles/787016-how-to-create-an-api-application) and [a forum](http://help.disqus.com/customer/portal/articles/931017-registering-a-new-forum) in Disqus.  Make sure you copy down your application public key and forum short name.

4. *Update config.yml*

    Update your config.yml with all of the appropriate properties.

5. *Profit*

    Navigate your new forum at http://USERNAME.github.io/forum
