var config = {
	// Workers count
	workersCount: 4,
	// Gallery folder path
	galleryFolderPath:			"images",
	// Picture formats to filter in folder
	imagesFormats:				"*.jpg;*.bmp;*.gif;*.png",
	// Wall settings
	wall: {
		// Wallpaper image path
		images:[
			"includes\\images\\wallpaper1.jpg",
			"includes\\images\\wallpaper2.jpg"
		],
		// Wall width
		width:					1920,
		// Wall heigh
		height:					1080
	},
	// shadow image
	shadowImage: 'includes\\images\\shadow.png',
	// frames settings
	frame: {
		// Canvas image
		canvas: "includes\\images\\canvas.png",
		// Background image paths
		backgrounds:[
			"includes\\images\\frame_backgroud1.jpg",
			"includes\\images\\frame_backgroud2.jpg"
		]
	},
	frames:[
		{
			// Frame image path
			image: "includes\\images\\frame1.png",
			// Padding for positioning picture in frame
			paddings:{
				left:		55,
				top:		55,
				right:		55,
				bottom:		55		
			}
		},
		{
			// Frame image path
			image: "includes\\images\\frame2.png",
			// Padding for positioning picture in frame
			paddings:{
				left:		54,
				top:		40,
				right:		56,
				bottom:		64		
			}
		},
		{
			// Frame image path
			image: "includes\\images\\frame3.png",
			// Padding for positioning picture in frame
			paddings:{
				left:		76,
				top:		73,
				right:		77,
				bottom:		70		
			}
		},
		{
			// Frame image path
			image: "includes\\images\\frame4.png",
			// Padding for positioning picture in frame
			paddings:{
				left:		98,
				top:		91,
				right:		92,
				bottom:		92		
			}
		}		
	]
}