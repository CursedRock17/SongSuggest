const clientId = 'Replace With Your Client Id'; //Change if Public
const clientSecret = 'Replace With your Client Secret'; //Change if Public

export const getToken = async() => {

  //This function allows us to get a token that represents the user
  //We use post becuase we are going to be setting up a token
  const result = await fetch('https://accounts.spotify.com/api/token', {
             method: 'POST',
             headers: {
                 'Content-Type' : 'application/x-www-form-urlencoded',
                 'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
             },
             body: 'grant_type=client_credentials'
         });

         const data = await result.json();
         return data.access_token;
      }
