# Identiface app

## What is this?

This is a face identification demo app that utilize AWS services in order to learn them and make an attempt of going serverless.

## What can it do?

The app allow the user to create collections of people and then test images against any chosen collection to see if the person is in the collection or not.

## Setup

`Setting up AWS`

1. Copy all AWS resources (amplify & lambda) and clone them on your own AWS account.
2. Create a bucket and update it in Amplify
3. Create user pool in order to use Amplify authorization, give the users the correct permissions.
4. Be sure to enable CORS in AWS for API gateway and your S3 bucket.
5. Run tests from API gateway on GET request and see the result. make sure all policies and CORS is setup!

`Setting up client`

1. Clone this repository for the client
2. Update the urls in each of the needed components to your own API Gateway URL.
3. Update bucket name in UploadImage component.

## Usage

`Collection management`:

- Enter _"collections"_ in the nav bar, you are now in the collection management page.
- Press create collection to create a new collection and enter its name.
- If you want to check collection for its data (people count, when was it created, and more) choose "show data" and choose the collection from the list.
- If you want to delete a collection, go to "Delete collection" tab and choose your collection and confirm.

`User management`:

1. Enter _"Users"_ tab.
2. To upload an image of a new user choose the upload tab, pick the file you want and type in the user name and last name and hit upload. this will store the image in an s3 bucket.
3. User images can be removed from S3 via "Delete user from S3" tab. Please read the warning the page prompt.
4. To add a user to collection choose "Add user to collection", pick the user and the collection you want to add the user too and hit confirm.
5. Inorder to delete a user from a collection, go to "List users" tab and choose the user you wish to remove. This will show you extra information about the user, his face ID, the collection he is in, and show an option to delete him.

Finally, to the demo:

`Comparing photos`:

1. Enter _"Compare photos"_ tab.
2. You can upload test photos to a folder within the defined S3 bucket above.
3. Click the button to compare an existing photo, choose the photo you wish to compare and pick which collection to compare it against. pick "Find collection" if you want to run the photo against all collections and display the result of the person.

## List of AWS services used:

- Amplify (Auth and storage)
- API Gateway (to access lambda)
- Lambda (to use the following services)
- Amazon Rekognition
- S3
- DynamoDB
- Cognito (login and logout from the app)
- IAM roles

### Applications

This app is a demo which can be applied onto many projects/systems, some ideas:

- Face recognition system that allows entrance to allowed personnel. \*
- Face ID login for a website \*
- Organizing photos according to the person that is in them

\*_see limitations below_

## Fair warning

This is a demo!

it is not the most secure nor is it the most optimized app available for face identification.

Much of the app architecture can be done in a better way, I chose to access DynamoDB via Lambda instead of directly from Amplify whilst I access the S3 bucket for uploads directly from Amplify.

I tried both in order to learn both ways, Im unsure which is the better way to do it.

### Limitations

This project utilize AWS Rekognition for face identification, this means that the photos supplied to the system/tested in the system are all 2 dimensional and are without depth (third dimension).

Therefore the system is not suitable for places where high degree of security is needed.
