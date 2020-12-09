--> 7.8: no worries.


--> 7.9: get's a bit tricky:
	implement internal state management into redux, first notifications.
	currently Notifications receive props of style and message from useState.
	Then when we setNotif, the Notification renders, and we set a timeout.
	Now instead we should: 
	1. Create a store and provider to implement redux.
	2. Move notification state to Notification component with { useSelector }
	3. instead of setNotif & timeout, we can do both via notificationReducer.
	4. install redux-thunk to allow for asynchrynous action-creators, fixes the timeout.
	
	This worked surprisingly well. Way to go baby steps!
	PS. found a fun bug, Notification is rendered both in App and BlogForm, 
	but one can easily centralise the rendering into only App.js, (dispatching
	can be done from anywhere!)

--> 7.10 Now we need to do the same to blog posts.. And soon even to login things.
	I guess it's a similar implementation. I will not touch the individual Blog component right now.
	1. Create a store that combines several reducers.
	2. Move blogs state from App to App but with dispatch and initializeBlogs() 
	   instead of mapping. 
	3. Handle sorting in blogReducer?
	4. What about a custom Hook for fetching all blogs?

--> 7.11I mean liking blogs and deleting them still works.. Because I keep a weird
	state of each Blog mapped from all blogs in Blog component...
	not sure if healthy, but I'll first add deletion to redux, because it
	doesnt show up immediately in rerender right now.

--> 7.12Implementing signed in user state to redux. Will keep user state in App
	or? I think I can move handleLogin & handleLogout to LoginForm component
	which would perhaps be more appropriate. Awesome redux!

--> 7.13Getting all users from backend api/users is turning out to be challenging.
	Instead, even though i don't really want to, i could store that in redux
	state... Is that overkill though?
	Worked this out through a custom hook, useResource.

--> 7.15I now think I see a clear advantage to redux. When I click on blogs, 
	everything is pre-loaded, and runs smoothly. Users on the other hand,
	which are fetched every-time from backend via a custom hook, take a 
	whole lot longer. So I'll implement users to a redux state aswell.
	Sweet.


