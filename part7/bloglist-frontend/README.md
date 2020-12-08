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

