# SongSuggest
This is a basic app that implements Spotify's API where the user can easily find songs tailored to what they've already listened to.

In order to run the app I used vite, therefore we can run the app with the command `npm run dev` Vite makes compiling and starting very
easy and quick. From there just open up localhost.

Inside the app, we have a basic file structure with basic TypeScript based React and CSS, nothing more, I chose to stay away from outside
libraries like Axios for API fetching, Tailwind for CSS, and Redux for State Management because it's supposed to be a very simple app.

Spotify's API forces us to get special tokens when we want to access components and OAUTH2.0 based Tokens when changing personal data, to
solve this, when the User Authenticates, I added in the scopes and created the token which we can just store in LocalStorage, so if we need
a new one it'll create a new one, otherwise it'll grab it with the command, `const token = localStorage.getItem("token")`. Then whenever the
user wants to call for the API the app uses a basic structure that looks like this :

```
 const getPlaylistId = async(token, user) => {
    const result = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
      method: 'GET',
      headers: {
      'Authorization' : 'Bearer ' + token,
      'Content-Type' : 'application/json'
     }
    })

    const data = await result.json();

    return data.items;
  }

```

To break it down, we create an asynchronous function because we're making a call to an API. Within the fetch, we specify the user, because
the certain call the app's making directs to that type of url. Most of the calls this app makes are GET requests, then in order for the API to work,
it needs to contain some headers, Content-Type just tells it to return a JSON like promise and Authorization relates to the const token from before.
It utilizes this token to actually allow the user to get the certain request. From there it just returns the data in the form of JSON 
because it's similar to an object's structure where there are multiple subsections.
