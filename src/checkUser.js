import { Auth } from 'aws-amplify';

const checkUser = async (updateUser) => {
  try {
    const userData = await Auth.currentSession();

    console.log("checkUser", userData);
    // nested object destructuring
    const { idToken: { payload }} = userData;

    // initialize a boolean whether or not the user is in the admin group
    // payload.cognito:groups "same as" payload["cognito:groups"]
    const isAuthorized = payload['cognito:groups'] && payload['cognito:groups'].includes('Admin');

    // isAuthorized is shorthand for isAuthorized: isAuthorized
    updateUser({
      username: payload['cognito:username'],
      isAuthorized
    });
  }

  catch (err) {
    console.error(err);
    updateUser({});
  }
}

export default checkUser;
