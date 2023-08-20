# Express-book-management api project 📚

The first project for the gaza sky geeks express training. The requirements were creating apis that can put,post,delete, and get for a book management scenario.

# AWS Project 🐎 🥇
Another project was to build on the previous one and deploy this app to the aws console behind an autoscaling group and with an applicaion load balancer.

I used the script named [setup-instance.sh](https://github.com/Isracoder/express-book-management/blob/main/setup-instance.sh) in this repo to automate the process of installing nodejs , cloning the repo , and setting up the app to be managed by systemd. To make systemd manage it i created the [app.service](https://github.com/Isracoder/express-book-management/blob/main/app.service) file which runs the index.js file. Then I enabled the service file in the setup script. 

This is a screenshot of some of the testing in my terminal.   

![Screenshot from 2023-08-19 19-23-08](https://github.com/Isracoder/express-book-management/assets/90979049/cb1b4935-1e4b-4e31-979b-b07992c0e4a5)   


After I made sure that the script was working by testing it on individual instances it was time to create the load balancer.

![Screenshot from 2023-08-20 12-00-21](https://github.com/Isracoder/express-book-management/assets/90979049/c30ea704-d609-4e22-88eb-f995f530bdee)


I attached it to a target group in which i registered one of the working instances that i created with the final working version of the setup script
![Screenshot from 2023-08-19 19-52-59](https://github.com/Isracoder/express-book-management/assets/90979049/159b27cf-35dc-45bf-8f99-36b898e7c68c)   

Then I created the auto scaling group and linked it to the application load balancer and target group previously created. I also selected all availability zones to distribute the instances.

After creating the autoscaling group more instances were created and added to the target group for a total of 3. At first the two instances created by the asg were unhealthy however I resolved that issue by making sure the script was correct and changing the health settings . 

![Screenshot from 2023-08-20 18-15-19](https://github.com/Isracoder/express-book-management/assets/90979049/feed5ccb-a78d-447f-851b-b7064bcf2bbf)

Finally the api was up and running on port 80 and could be accessed by the asg instances.Here is the initial full list that shows when loading the page.

![Full list](https://github.com/Isracoder/express-book-management/assets/90979049/e048b129-17b2-44e7-8d85-2866f4a02f11)


And here is the result of searching for the book with the id of 2  

![1984 has the id of 2](https://github.com/Isracoder/express-book-management/assets/90979049/2679fc16-7eda-452e-8db5-4f5a0f272c72)




