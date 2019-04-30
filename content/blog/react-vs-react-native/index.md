---
title: From React Web to React Native
date: "2019-04-20"
description: "Comparision of these two realms"
---

- [Moving between React <-> React Native projects back and forth](http://localhost:8000/react-vs-react-native/#moving-between-react---react-native-back-and-forth) 
- [Differences in code](http://localhost:8000/react-vs-react-native/#differences-in-code)
- [They are only renderers](http://localhost:8000/react-vs-react-native/#differences-in-code)
- [Other differences](http://localhost:8000/react-vs-react-native/#other-differences)
- [So maybe React Native Web?](http://localhost:8000/react-vs-react-native/#so-maybe-react-native-web)

### Moving between React <-> React Native back and forth 

Some React web devs are a bit scared of starting using React Native and they ask questions whether it's hard and what are the differences between these two. 

**React Native -> React**

I can tell from my experience that moving from React Native to React
was pretty seamless, especially if you know web API. Some stuff like hot reloading are inspired by web solutions, and they are not perfectly implemented on mobile. 

**React -> React Native**

So when I got back from React project to React Native project again it struck me
how much more hassle there are to get it all working without tools like Expo. Not to mention a process of deploying and publishing apps, which either demands a specilized tool like Bitrise or App Center, or a good amount of time and energy invested in building CI/CD from scratch.

### Differences in code

The one difference that everybody notices at once is that **in lieu of divs you
have [Views](https://facebook.github.io/react-native/docs/view)**.

```jsx{2}
function React() (
  <div className={classes.container}>
    Web devs comfort zone
  </div>
)
```

```jsx{2}
function ReactNative() (
  <View style={styles.container}>
     Web devs feel apprehensive
  </View>
)
```
#### CSS?
The other one is that there are **no CSS as you know them from web**. There are style properties instead, 
which you can then compose and you use camelCase to write them.

```css{}
#ready {
  background-color: #123456;
  display: flex;
  justify-content: center;
}
  
  #ready .container {
    padding: 0 10px; 
   }
```
Then in js:

```jsx{}
function React() (
  <div id='ready'>
    <div className='container'/>
  </div>    
)
```

But in the React Native: 

```jsx{}
const styles = StyleSheet.create({
  ready: {
    backgroundColor: '#123456',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: 0 10px; 
  },
});

function React() (
  <View style={styles.ready}>
    <View style={styles.container}/>
  </View>    
)
```
If writing properties in camel case is too exotic for you, let's **try with [styled-components](https://www.styled-components.com/)**, which allows you to write them in your favourite way:

```jsx{}
import styled from 'styled-components';

const Ready = styled.div` // or styled(View) in case of React Native
  background-color: '#123456';
  display: flex,
  justify-content: center,
`;

const Container = styled.div` // or styled(View) in case of React Native
  padding: 0 10px,
`;

function ReactOrReactNative() (
  <Ready>
    <Container/>
  </Ready>    
)
```

#### SessionStorage? LocalStorage?
Well, both are part of Web Api, so they are not available in React Native :( 
but hey, you have access to something like AsyncStorage which in fact works similarly to LocalStorage but 
has a set of additional convenience methods, and all of them return Promise.

```jsx{}
  window.localStorage.settItem('id', id)
  ...
  const id = window.localStorage.getItem('id');
```
React Native:

```jsx{}
  import { AsyncStorage } from 'react-native';

  await AsyncStorage.setItem('id', id);
  ...
  const id = await AsyncStorage.getItem('id');
```

#### Routing?
So the most common libs for navigation through an app, allow you to set up routing as you would do it on web. 
Set of screens that you access via navigation to an established route. Yet there is at least one difference, 
check if you can find it: 

```jsx
import { Route, Switch } from 'react-router-dom';

function ReactOrReactNative() (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/movies" component={MovieList} />
    <Route exact path="/category/:id" component={MovieItem} />
    <Route component={NotFoundPage} />
  </Switch>
  )  
```

```jsx
import { Router, Scene } from "react-native-router-flux"

function ReactOrReactNative() (
  <Router>
    <Scene key="quest" component={Login} initial />
    <Scene key="user" component={Main}>
      <Scene
        key="movieList"
        component={MovieList}
        initial
      />
      <Scene
        key="movieItem"
        component={MovieItem}
      />
    </Scene>
  </Router>
  )  
```

Have you spotted it? No links in the routes, string based on the name of component instead. 
It's simply because urls are not how you navigate through native apps. You can, however, 
use deep links to couple a url to the particular views. This functionality is used rather to navigate to the screen from outside the app, 
not to redirect to other screen when you are already in the app though.

Also, although I used [`react-native-router-flux`](https://github.com/aksonov/react-native-router-flux) above I also recommend checking out [`react-navigation`](https://github.com/wix/react-native-navigation) which has some advantegous over the former.


#### Deployment

Deployment process for both mobile platforms consists of building the app from native modules, signing an application and releasing it to a store. But there are things that you will come across:
   - to release an app you must provide a set of additional information like description, screenshots etc.
   - your app must be align with the set of rules given by [Google](https://developer.android.com/distribute/best-practices/develop/understand-play-policies) and [Apple](https://developer.apple.com/app-store/review/guidelines/). You may notice that the latter one is heavily packed and it takes some time to scroll to the very bottom. Get use to it, that's part and parcel of working with Apple
   - you must create provisioning profile to deploy an iOS app
   - deployment might take a while especially in the case of iOS - they check your app manually
   - you may resort to paid tools like Bitrise or App Center to alleviate some of the pain
   
### They are only renderers

React is a tool to build UIs. Even though it might be use outside UIs, by design it's great for building user interfaces. Can React be used for game developement? Yes, it can, but then you don't get the most from it, neither from the performence nor from the speed of developement. React is a good choice when these two conditions are met: 
- few changes within data stucture over time
- whatever the data structure represents, there should be little irregularity

That's exactly how most of the user interfaces behave. 
So what's react's job and what is the difference when compare to React Native?

**It's React in both web and mobile.** Only the renderer makes the difference.
The renderer on web is React DOM and on iOS and Android it's React Native. [But React Native can also be used to render to DOM](https://bwidlarz.com/react-vs-react-native/#so-maybe-react-native-web)

If you're interested in digging deeper I highly recommend [the reading](https://overreacted.io/react-as-a-ui-runtime/).
### Other differences

- **Some components look different on each platform.** They simply do, for instance <Switch /> component is natively different on Android and iOS. They have native look, as some would say, but sometimes you don't need it to be like that. 
- **Some API are only available on one platform.** 
- Some native API are not available from React Native and you would have to bridge a feature from native to React Native. Although the community has been handling this issue for some time now and less and less APIs are unavailable
- Prerequisites 

Unless you use Expo, you'll need a Mac. If you want to run you app on iOS device you will probably need an iPhone or, again Mac to run on simulator. You may want to try to experiment with iPhone as a service solution but I haven't checked that one. 
Also, if you just want to play with React Native or develop only for Android - you don't need neither mac nor iphone.

- Community support

There are number of libs that you can easily reuse in your React Native project that you've already used in your React one. 
But the less coupled to view layer the lib the better. So for instance you can freely use date-fns or moment.js but you will waste your time if you try to use this Material UI lib https://material-ui.com/.
  - ✅ date-fns
  - ✅ Redux, Redux saga etc.
  - 🔴 Material UI 
You'll find some material design implementation for React Native, sure, but the API will be different.

### So maybe React Native Web?
Write your app in React Native and run it as mobile apps and as a web app. Check out [these examples](https://necolas.github.io/react-native-web/examples/), all of the components were written in React Native. And as you can see they work pretty well! The lib gets improvement and so it makes usage of the it a plausible choice for growing number of applications. 

### Sum up
The ecosystem is definitely moving towards the grand unification of the two worlds: web and mobile. Yet there are still some differences that are hard too neglect and this blog post have underlined some of them.  


