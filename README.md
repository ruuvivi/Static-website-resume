# Responsive Resume CV
## Secure, static website

An interactive, responsive resume website built using **HTML**, **CSS**, and **JavaScript**. The website is mobile-friendly, includes smooth scrolling, two themes, and enables visitors to download a PDF resume. The project is securely deployed on AWS as a static website using **S3**, **CloudFront**, **Route 53** and **Certificate Manager**.

## Features

This resume builds upon the excellent work in [responsive-resume-cv-smith](https://github.com/bedimcode/responsive-resume-cv-smith), extending its functionality to support additional features.

### 1. Start page
- A start page from where user can navigate to the resume page. Structured for possible scaling, enabling the addition of more pages over time.
  
### 2. Interactive Resume
- Responsive, compatibility with all mobile devices and browser.
- Front page that includes a **"reveal button"** to animate the transition to the CV page.

### 3. Downloadable PDF Resume
- A "Download" button that allows users to download a PDF resume from a file.

### 4. Theme Switcher
- Includes **two themes** (color and B&W) for user preference.

### 5. Hide Sensitive Information
- Prevents spam bots from scraping phone numbers or addresses using a hidden content approach on HTML and CSS.


## Project Setup
To run the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/ruuvivi/Static-website-resume.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Static-website-resume
   ```
3. Open the `index.html` file in a browser to view the website.

## Deployment to AWS
This project has been deployed to **AWS** using the following services: **Route 53**, **S3**, **AWS Certificate Manager** and **Cloudfront**.

### Steps to Deploy the Website
1. **Create a domain name on Route53**
   - In the AWS Management Console navigate to **Route 53**.
   - Navigate to Domains -> registered domains -> register domains.
   - Choose a domain name and pricing.
   - Add to cart an available domain of your choosing.
   - Fill in contact details and choose settings that suit you (automatic renewal of domain etc.).
   - Complete the domain order.
   - Wait for the domain to be registered.

2. **Create a S3 Bucket**
   - In the AWS Management Console navigate to **S3**.
   - Navigate to Buckets -> create bucket.
   - Bucket name = domain name you registered.
   - Select a region that is cosest to you.
   - Uncheck "Block all public access"
   - Create the bucket.
   - Go inside your created bucket and navigate to Permissions -> Static website hosting -> Edit.
   - Choose "Enable" and for index document type "index.htlm". Save changes.
   - Navigate to Permissions -> Bucket policy -> Edit, and paste the Json configuration and change your bucket name to match:

     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::your-bucket-name/*"
         }
       ]
     }
     ```
 - We will deploy the content to your website in step "Steps to Synchronize S3 Bucket with GitHub"
   
2. **Redirect your domain to your S3 Bucket on **Route 53****
   - In the AWS Management Console navigate to **Route 53**.
   - Navigate to Hosted Zone -> your domain name -> Create record -> Simple routing -> Next -> Define simple record. Choose Value/route traffic to as  "Alias to S3 website endpoint". Region is the region of your S3 bucket. "Choose S3 endpoint" = yor S3 website is 
     provided in the menu.
   - Finalize by clicking "Create simple record"
   - Wait for the changes to come to effect.
   - Your website is now redirected to your purchased domain.

### Steps to Secure the website
4. **Request Certificate from ACM**
   - From the top right corner select US East Virginia as your region for this step.
   - In the AWS Management Console navigate to **AWS Certificate Manager**.
   - Click on "Request" -> Choose “Request a public certificate”
   - Settings are as follows: Domain name = your domain name, "Validation method" = DNS validation, "Key algorithm" = RSA 2048.
   - Finalize by ckicking "Request" and wait for the validation.
   - Click on your new certificate and click on “Create records in Route 53”. Tick the checkbox for your domain name, then finalize with “Create Record”.
   - Wait for the domain validation status to be "success".
  
6. **Add Cloudfront Distribution**
   - In the AWS Management Console navigate to **Cloudfront**.
   - Click on “Create a CloudFront distribution”
   - Settings are as follows: "Origin domain" = your static site URL from the menu and click on "Use website endpoint". In "Default cache behavior" -> "Viewer protocol policy" = Redirect HTTP to HTTPS. In "Cache key and origin requests" -> "
     Cache policy and origin request policy (recommended)". In "Custom SSL certificate - optional" select your site's domain from the menu.
   - Finalize with "Create distribution".
       

7. **Redirect DNS record to point to Cloudfront distribution**
   - In the AWS Management Console navigate to **Route 53**.
   - Navigate to Hosted Zone -> click on the name of your hosted zone -> click the checkbox on your A record for your domain -> On the right side of the page click "Edit record" -> edit “Route traffic to” = “Alias to CloudFront distribution” ands save.

### GitHub Integration with S3
Synchronize your S3 bucket with the GitHub repository containing the website, using **AWS IAM** (Identity and Access Management):

## Project Setup
To run the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Open the `index.html` file in a browser to view the website.

## GitHub Integration with S3
The S3 bucket is synchronized with a GitHub repository through a **AWS IAM** user:

### Steps to Synchronize S3 Bucket with GitHub
1. **Create an IAM User**
   - Go to IAM in AWS console and navigate to "Users"
   - Assign appropriate permissions (e.g., S3 read/write access). Also in permissions select "Attach policies directly".
   - Generate an Access Key ID and Secret Access Key for the user, save the CSV file to access these later in step 3.

2. **Directories**
   - In the root of your project, make a new folder called "public". Inside this, make a folder called ".github". Inside this folder make a folder called "workflows". Inside this make a file called "main.yml"

   - In "main.yml" paste this Github Action code:
 ```yml
name: Synchronize S3 bucket to GitHub repository

on:
  push:
    branches:
    - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v1

    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: eu-north-1

    - name: Deploy static site to S3 bucket
      run: aws s3 sync ./public/ s3://"your domain name" --delete
    name: Synchronize S3 bucket to GitHub repository
   ```
   
   - Change the branch if neccesary to match your GitHub project. Change the region and the name to match your S3 bucket.

3. **Sync Your GitHub Files to S3**
   - In your GitHub repository's settings navigate toi "Secrets  and variables" -> "Actions".
   - Make two keys:
   AWS_ACCESS_KEY_ID, value is the value in the CSV file from step 1.
   AWS_SECRET_ACCESS_KEY,  value is the value in the CSV file from step 1.

4. **Ready to deploy**
   - Now every GitHub push will syncronixe your S3 bucket with your GitHub repository and the weebsite files will be deployed in your Amazon S3 bucket.

## Technologies Used
- **HTML**
- **CSS**
- **JavaScript**
- **AWS (S3, CloudFront, Route 53, Certificate Manager)**
- **GitHub**

## Live Demo
[This project is live here](https://resumeruuskanen.click/)
