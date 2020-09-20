export const ALL_STEP = 5;

// MESSAGE ( c=null , l=null )

// Progress Messages
export const FINDING_IMG = () => { return { en: 'Finding images from given url...', step:0} };
export const IMGS_FOUND = (c) => { return { en: c + ' images found. Start to get metadatas...', step:1} };
export const PP_BACK = () => { return { en: 'Preparing background image...', step:2 } };
export const GETTING_IMG = (c, l) => { return { en: 'Getting image from url...(' + c + '/' + l + ')', step:2+c } }
export const START_MERGE = (c) => { return { en: 'Done! Starting merge...', step:3+c } };
export const DISPLAYING = (c) => { return { en: 'Displaying image...', step:4+c } };
export const ALL_DONE = (c) => { return { en: 'All done!', step:5+c } };

// Error Messages
export const SOMETHING_WRONG = () => { return { en: 'Something wrong!', step:-1 } };
export const WRONG_URL = () => { return { en: 'Please enter a correct url.', step:-1 } };
export const IMG_NOT_FOUND = ()=> { return { en: 'Image not found from given url...', step:-1 } };

// 2 means the previous stpes
export function getEndPoint(a) {
	return a + 5;
}
