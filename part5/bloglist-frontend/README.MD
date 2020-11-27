Will start using temporary README's to document progress and plan stuff.

-5.7 => let's implement a togglable blog. We can click a button to see more.
	Apparently there is difficulty using our already defined Toggle component
	, so I'll try adding state to the very basic Blog<> one. :)
        Done. basically another Toggle component.
 
-5.8 =>	updating likes part of blog. Need to update entire blog part.
        HTTP PUT in blogService.js, (and backend?), BACKEND FIXED 
	I'll also refactor LoginForm (states and eventHandlers), nope, this seems redundant, will break something
	like button works, but one needs to refresh the page for it to work... hmmm

-5.10 => deletion button + prompt to confirm is going to be a bit more challenging. 
	button should be easily implementable in Blog component, prompt maybe in the same component as function?
	
	Button functionality and styling was easy, but only showing it in the appropriate blogs might get harder.
	Also still doing the prompt. Couldn't pass users id to Blog component for some reason, but username is also unique so I compared that instead.
		
