### MEETING 3/2
	- Established idea for a 'cragslist companion' app.
	- Established workflow of app.
	- Established who is working on what:
		- Travis: Front-End
		- Chip: Back-End
		- Brandon: Wherever needed

### MEETING 3/3
	- Travis: sign-in page and possibly register page if time. √
	- Chip, Brandon: models completed, server.js with static so we can use nodemon, 
	  user controller, body-parser, bcrypt ... etc. Get/Post user endpoints. √

	- Models note: user schema: email(unique) and password.

### MEETING 3/4
	- Discussed data modeling.
	- Individual workflows:
		- Travis: finish registration design, connecting registration to api POST, 
		  redirect to user dashboard on successful login.
		- Chip: api GET/POST requests for models.
			- for api GET, use req.body.user and then use _.id to pull user info.
			- for listings, use the user ref (req.body.user) to get the item listing.
			- GET listing, meetup, and review based on user (req.body.user).
			- GETting listed item: before sending res.json, 
			  make in User model: data.engaged, data.selling, data.viewed, and data.buying .
			- in User model, could have arrays for listedItems, watchedItems.
			- make items searchable by "short Id". Items are viewable if not logged in, but not interactable.
			- parameter in URL 'shortId' will populate basic listing and seller info
			- Get shortId to populate listing and seller info.
			- add 'active (boolean)' property on listing model.
		- Brandon: ng-upload (uploading photos). node uploading the file to the server (FS or FS-grid).

### AFTER-MEETING 3/4
	- User model needs:
		vehicleData: {
			make:
			model:
			color:
			year:
			completed: { type: Boolean }
		} √
	- buying and bought processes:
		- buying: click 'buy', api call to server with listingId, check if buyer is
		  on listing already, listingId gets pushed onto buyers inProgress array.
		- bought: status on listing model - active: false

	- when page is loaded for individual item, make api call to show page views for seller.
	- add "watch" functionality to each listing for the user to see what items they are watching.

### MEETING 3/5
	- Tasks: 
		- Chip:
			- GET with user ID in should return user 
			- Error handling for login
			- Continue with yesterday

		- Travis:
			- Fine tune registration and login pages
			- User dashboard set up.


### MEETING 3/6

	- Chip: 
		- Listing GET calls for bought and sold items
		- Finish listing status change calls: buying/ bought

	- Travis:

		- Continue with building views for registration and dashboard. 

### MEETING 3/16
	- mongoose/mongo shortId
	- buying process
			
